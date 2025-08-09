import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { ConvexError } from "convex/values";

// Query para buscar assistente por ID
export const getAssistantById = query({
  args: { assistantId: v.id("assistants") },
  handler: async (ctx, args) => {
    const assistant = await ctx.db.get(args.assistantId);
    return assistant;
  },
});

// Query para listar assistentes com filtros
export const getAssistants = query({
  args: {
    status: v.optional(v.union(v.literal("active"), v.literal("inactive"), v.literal("training"))),
    type: v.optional(v.union(v.literal("customer_service"), v.literal("sales"), v.literal("support"), v.literal("general"))),
    createdBy: v.optional(v.id("users")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("assistants") as any;

    if (args.status) {
      query = query.withIndex("by_status", (q) => q.eq("status", args.status!));
    }

    if (args.type) {
      query = query.withIndex("by_type", q => q.eq("type", args.type!));
    }

    if (args.createdBy) {
      query = query.withIndex("by_created_by", q => q.eq("createdBy", args.createdBy!));
    }
    
    const assistants = await query
      .order("desc")
      .take(args.limit || 50);
    
    return assistants;
  },
});

// Mutation para criar assistente
export const createAssistant = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    avatar: v.optional(v.string()),
    type: v.union(v.literal("customer_service"), v.literal("sales"), v.literal("support"), v.literal("general")),
    configuration: v.object({
      model: v.string(),
      temperature: v.number(),
      maxTokens: v.number(),
      systemPrompt: v.string(),
      knowledgeBase: v.optional(v.array(v.string())),
      capabilities: v.array(v.string()),
    }),
    integrations: v.optional(v.object({
      whatsapp: v.optional(v.object({
        enabled: v.boolean(),
        phoneNumber: v.optional(v.string()),
        apiKey: v.optional(v.string()),
      })),
      telegram: v.optional(v.object({
        enabled: v.boolean(),
        botToken: v.optional(v.string()),
      })),
      webchat: v.optional(v.object({
        enabled: v.boolean(),
        widgetId: v.optional(v.string()),
      })),
    })),
    createdBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    const assistantId = await ctx.db.insert("assistants", {
      name: args.name,
      description: args.description,
      ...(args.avatar ? { avatar: args.avatar } : {}),
      status: "inactive", // Começa inativo até ser configurado
      type: args.type,
      configuration: args.configuration,
      integrations: args.integrations || {
        whatsapp: { enabled: false },
        telegram: { enabled: false },
        webchat: { enabled: false },
      },
      metrics: {
        totalConversations: 0,
        activeUsers: 0,
        successRate: 0,
        averageResponseTime: 0,
      },
      createdBy: args.createdBy,
      createdAt: now,
      updatedAt: now,
    });
    
    return assistantId;
  },
});

// Mutation para atualizar assistente
export const updateAssistant = mutation({
  args: {
    assistantId: v.id("assistants"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    avatar: v.optional(v.string()),
    status: v.optional(v.union(v.literal("active"), v.literal("inactive"), v.literal("training"))),
    type: v.optional(v.union(v.literal("customer_service"), v.literal("sales"), v.literal("support"), v.literal("general"))),
    configuration: v.optional(v.object({
      model: v.string(),
      temperature: v.number(),
      maxTokens: v.number(),
      systemPrompt: v.string(),
      knowledgeBase: v.optional(v.array(v.string())),
      capabilities: v.array(v.string()),
    })),
    integrations: v.optional(v.object({
      whatsapp: v.optional(v.object({
        enabled: v.boolean(),
        phoneNumber: v.optional(v.string()),
        apiKey: v.optional(v.string()),
      })),
      telegram: v.optional(v.object({
        enabled: v.boolean(),
        botToken: v.optional(v.string()),
      })),
      webchat: v.optional(v.object({
        enabled: v.boolean(),
        widgetId: v.optional(v.string()),
      })),
    })),
  },
  handler: async (ctx, args) => {
    const { assistantId, ...updates } = args;
    
    const assistant = await ctx.db.get(assistantId);
    if (!assistant) {
      throw new ConvexError("Assistente não encontrado");
    }
    
    const now = Date.now();
    
    await ctx.db.patch(assistantId, {
      ...updates,
      updatedAt: now,
    });
    
    return assistantId;
  },
});

// Mutation para atualizar métricas do assistente
export const updateAssistantMetrics = mutation({
  args: {
    assistantId: v.id("assistants"),
    metrics: v.object({
      totalConversations: v.optional(v.number()),
      activeUsers: v.optional(v.number()),
      successRate: v.optional(v.number()),
      averageResponseTime: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const assistant = await ctx.db.get(args.assistantId);
    if (!assistant) {
      throw new ConvexError("Assistente não encontrado");
    }
    
    const now = Date.now();
    
    await ctx.db.patch(args.assistantId, {
      metrics: {
        ...assistant.metrics,
        ...args.metrics,
        lastActivity: now,
      },
      updatedAt: now,
    });
    
    return args.assistantId;
  },
});

// Mutation para deletar assistente
export const deleteAssistant = mutation({
  args: { assistantId: v.id("assistants") },
  handler: async (ctx, args) => {
    const assistant = await ctx.db.get(args.assistantId);
    if (!assistant) {
      throw new ConvexError("Assistente não encontrado");
    }
    
    // Verificar se há conversas ativas
    const activeConversations = await ctx.db
      .query("conversations")
      .withIndex("by_assistant", (q) => q.eq("assistantId", args.assistantId))
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();
    
    if (activeConversations.length > 0) {
      throw new ConvexError("Não é possível deletar assistente com conversas ativas");
    }
    
    await ctx.db.delete(args.assistantId);
    return args.assistantId;
  },
});

// Query para estatísticas de assistentes
export const getAssistantStats = query({
  handler: async (ctx) => {
    const allAssistants = await ctx.db.query("assistants").collect();
    
    const stats = {
      total: allAssistants.length,
      active: allAssistants.filter(a => a.status === "active").length,
      inactive: allAssistants.filter(a => a.status === "inactive").length,
      training: allAssistants.filter(a => a.status === "training").length,
      byType: {
        customer_service: allAssistants.filter(a => a.type === "customer_service").length,
        sales: allAssistants.filter(a => a.type === "sales").length,
        support: allAssistants.filter(a => a.type === "support").length,
        general: allAssistants.filter(a => a.type === "general").length,
      },
      totalConversations: allAssistants.reduce((sum, a) => sum + a.metrics.totalConversations, 0),
      averageSuccessRate: allAssistants.length > 0 
        ? allAssistants.reduce((sum, a) => sum + a.metrics.successRate, 0) / allAssistants.length 
        : 0,
    };
    
    return stats;
  },
});

// Query para assistentes mais ativos
export const getTopAssistants = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const assistants = await ctx.db.query("assistants")
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();
    
    // Ordenar por número de conversas
    const sortedAssistants = assistants
      .sort((a, b) => b.metrics.totalConversations - a.metrics.totalConversations)
      .slice(0, args.limit || 10);
    
    return sortedAssistants;
  },
});