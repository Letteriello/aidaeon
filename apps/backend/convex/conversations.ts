import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { ConvexError } from "convex/values";

// Query para buscar conversa por ID
export const getConversationById = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const conversation = await ctx.db.get(args.conversationId);
    return conversation;
  },
});

// Query para listar conversas com filtros
export const getConversations = query({
  args: {
    assistantId: v.optional(v.id("assistants")),
    userId: v.optional(v.id("users")),
    platform: v.optional(v.union(v.literal("whatsapp"), v.literal("telegram"), v.literal("webchat"), v.literal("api"))),
    status: v.optional(v.union(v.literal("active"), v.literal("completed"), v.literal("abandoned"), v.literal("transferred"))),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("urgent"))),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("conversations");
    
    if (args.assistantId) {
      query = query.withIndex("by_assistant", (q) => q.eq("assistantId", args.assistantId!));
    } 

    if (args.userId) {
      query = query.withIndex("by_user", q => q.eq("userId", args.userId!));
    }

    if (args.platform) {
      query = query.withIndex("by_platform", q => q.eq("platform", args.platform!));
    }

    if (args.status) {
      query = query.withIndex("by_status", q => q.eq("status", args.status!));
    }
    
    const conversations = await query
      .order("desc")
      .take(args.limit || 50);
    
    return conversations;
  },
});

// Query para buscar conversas por usuário externo (WhatsApp, Telegram, etc.)
export const getConversationByExternalUser = query({
  args: {
    externalUserId: v.string(),
    platform: v.union(v.literal("whatsapp"), v.literal("telegram"), v.literal("webchat"), v.literal("api")),
    assistantId: v.optional(v.id("assistants")),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("conversations")
      .withIndex("by_external_user", (q) => q.eq("externalUserId", args.externalUserId))
      .filter((q) => q.eq(q.field("platform"), args.platform));
    
    if (args.assistantId) {
      query = query.filter((q) => q.eq(q.field("assistantId"), args.assistantId));
    }
    
    // Buscar conversa ativa primeiro
    const activeConversation = await query
      .filter((q) => q.eq(q.field("status"), "active"))
      .first();
    
    if (activeConversation) {
      return activeConversation;
    }
    
    // Se não há conversa ativa, retornar a mais recente
    const recentConversation = await query
      .order("desc")
      .first();
    
    return recentConversation;
  },
});

// Mutation para criar conversa
export const createConversation = mutation({
  args: {
    assistantId: v.id("assistants"),
    userId: v.optional(v.id("users")),
    externalUserId: v.optional(v.string()),
    platform: v.union(v.literal("whatsapp"), v.literal("telegram"), v.literal("webchat"), v.literal("api")),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("urgent"))),
    tags: v.optional(v.array(v.string())),
    metadata: v.optional(v.object({
      userInfo: v.optional(v.object({
        name: v.optional(v.string()),
        phone: v.optional(v.string()),
        email: v.optional(v.string()),
        location: v.optional(v.string()),
      })),
      context: v.optional(v.object({
        referrer: v.optional(v.string()),
        utm: v.optional(v.object({
          source: v.optional(v.string()),
          medium: v.optional(v.string()),
          campaign: v.optional(v.string()),
        })),
        sessionId: v.optional(v.string()),
      })),
    })),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    const conversationId = await ctx.db.insert("conversations", {
      assistantId: args.assistantId,
      userId: args.userId,
      externalUserId: args.externalUserId,
      platform: args.platform,
      status: "active",
      priority: args.priority || "medium",
      tags: args.tags || [],
      metadata: args.metadata || {},
      startedAt: now,
      lastActivity: now,
    });
    
    // Atualizar métricas do assistente
    const assistant = await ctx.db.get(args.assistantId);
    if (assistant) {
      await ctx.db.patch(args.assistantId, {
        metrics: {
          ...assistant.metrics,
          totalConversations: assistant.metrics.totalConversations + 1,
          lastActivity: now,
        },
        updatedAt: now,
      });
    }
    
    return conversationId;
  },
});

// Mutation para atualizar conversa
export const updateConversation = mutation({
  args: {
    conversationId: v.id("conversations"),
    status: v.optional(v.union(v.literal("active"), v.literal("completed"), v.literal("abandoned"), v.literal("transferred"))),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("urgent"))),
    tags: v.optional(v.array(v.string())),
    metadata: v.optional(v.object({
      userInfo: v.optional(v.object({
        name: v.optional(v.string()),
        phone: v.optional(v.string()),
        email: v.optional(v.string()),
        location: v.optional(v.string()),
      })),
      context: v.optional(v.object({
        referrer: v.optional(v.string()),
        utm: v.optional(v.object({
          source: v.optional(v.string()),
          medium: v.optional(v.string()),
          campaign: v.optional(v.string()),
        })),
        sessionId: v.optional(v.string()),
      })),
      resolution: v.optional(v.object({
        resolved: v.boolean(),
        satisfaction: v.optional(v.number()),
        feedback: v.optional(v.string()),
        resolvedAt: v.optional(v.number()),
        resolvedBy: v.optional(v.union(v.literal("ai"), v.literal("human"))),
      })),
    })),
  },
  handler: async (ctx, args) => {
    const { conversationId, ...updates } = args;
    
    const conversation = await ctx.db.get(conversationId);
    if (!conversation) {
      throw new ConvexError("Conversa não encontrada");
    }
    
    const now = Date.now();
    const updateData: any = {
      ...updates,
      lastActivity: now,
    };
    
    // Se está finalizando a conversa
    if (updates.status && updates.status !== "active" && conversation.status === "active") {
      updateData.endedAt = now;
    }
    
    await ctx.db.patch(conversationId, updateData);
    
    return conversationId;
  },
});

// Mutation para atualizar última atividade
export const updateLastActivity = mutation({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw new ConvexError("Conversa não encontrada");
    }
    
    await ctx.db.patch(args.conversationId, {
      lastActivity: Date.now(),
    });
    
    return args.conversationId;
  },
});

// Query para estatísticas de conversas
export const getConversationStats = query({
  args: {
    assistantId: v.optional(v.id("assistants")),
    timeRange: v.optional(v.union(v.literal("today"), v.literal("week"), v.literal("month"), v.literal("all"))),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("conversations");
    
    if (args.assistantId) {
      query = query.withIndex("by_assistant", (q) => q.eq("assistantId", args.assistantId));
    }
    
    const conversations = await query.collect();
    
    // Filtrar por período se especificado
    let filteredConversations = conversations;
    if (args.timeRange && args.timeRange !== "all") {
      const now = Date.now();
      let timeLimit = 0;
      
      switch (args.timeRange) {
        case "today":
          timeLimit = now - 24 * 60 * 60 * 1000;
          break;
        case "week":
          timeLimit = now - 7 * 24 * 60 * 60 * 1000;
          break;
        case "month":
          timeLimit = now - 30 * 24 * 60 * 60 * 1000;
          break;
      }
      
      filteredConversations = conversations.filter(c => c.startedAt >= timeLimit);
    }
    
    const stats = {
      total: filteredConversations.length,
      active: filteredConversations.filter(c => c.status === "active").length,
      completed: filteredConversations.filter(c => c.status === "completed").length,
      abandoned: filteredConversations.filter(c => c.status === "abandoned").length,
      transferred: filteredConversations.filter(c => c.status === "transferred").length,
      byPlatform: {
        whatsapp: filteredConversations.filter(c => c.platform === "whatsapp").length,
        telegram: filteredConversations.filter(c => c.platform === "telegram").length,
        webchat: filteredConversations.filter(c => c.platform === "webchat").length,
        api: filteredConversations.filter(c => c.platform === "api").length,
      },
      byPriority: {
        low: filteredConversations.filter(c => c.priority === "low").length,
        medium: filteredConversations.filter(c => c.priority === "medium").length,
        high: filteredConversations.filter(c => c.priority === "high").length,
        urgent: filteredConversations.filter(c => c.priority === "urgent").length,
      },
      resolved: filteredConversations.filter(c => 
        c.metadata?.resolution?.resolved === true
      ).length,
      averageDuration: filteredConversations
        .filter(c => c.endedAt)
        .reduce((sum, c) => sum + (c.endedAt! - c.startedAt), 0) / 
        Math.max(1, filteredConversations.filter(c => c.endedAt).length),
    };
    
    return stats;
  },
});

// Query para conversas recentes
export const getRecentConversations = query({
  args: {
    limit: v.optional(v.number()),
    assistantId: v.optional(v.id("assistants")),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("conversations");
    
    if (args.assistantId) {
      query = query.withIndex("by_assistant", (q) => q.eq("assistantId", args.assistantId));
    }
    
    const conversations = await query
      .order("desc")
      .take(args.limit || 20);
    
    return conversations;
  },
});