import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { ConvexError } from "convex/values";

// Query para buscar usuário por email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    
    return user;
  },
});

// Query para buscar usuário por ID
export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    return user;
  },
});

// Query para listar usuários com filtros
export const getUsers = query({
  args: {
    role: v.optional(v.union(v.literal("admin"), v.literal("user"), v.literal("agent"))),
    status: v.optional(v.union(v.literal("active"), v.literal("inactive"), v.literal("suspended"))),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("users");
    
    if (args.role) {
      query = query.withIndex("by_role", (q) => q.eq("role", args.role!));
    }
    
    if (args.status) {
      query = query.withIndex("by_status", q => q.eq("status", args.status!));
    }
    
    const users = await query
      .order("desc")
      .take(args.limit || 50);
    
    return users;
  },
});

// Mutation para criar usuário
export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("user"), v.literal("agent")),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Verificar se o usuário já existe
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    
    if (existingUser) {
      throw new ConvexError("Usuário com este email já existe");
    }
    
    const now = Date.now();
    
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      avatar: args.avatar,
      role: args.role,
      status: "active",
      phone: args.phone,
      company: args.company,
      preferences: {
        theme: "system",
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
        language: "pt-BR",
      },
      metadata: {
        createdAt: now,
        updatedAt: now,
      },
    });
    
    return userId;
  },
});

// Mutation para atualizar usuário
export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    name: v.optional(v.string()),
    avatar: v.optional(v.string()),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("user"), v.literal("agent"))),
    status: v.optional(v.union(v.literal("active"), v.literal("inactive"), v.literal("suspended"))),
    preferences: v.optional(v.object({
      theme: v.union(v.literal("light"), v.literal("dark"), v.literal("system")),
      notifications: v.object({
        email: v.boolean(),
        push: v.boolean(),
        sms: v.boolean(),
      }),
      language: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new ConvexError("Usuário não encontrado");
    }
    
    const now = Date.now();
    
    await ctx.db.patch(userId, {
      ...updates,
      metadata: {
        ...user.metadata,
        updatedAt: now,
      },
    });
    
    return userId;
  },
});

// Mutation para atualizar último login
export const updateLastLogin = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new ConvexError("Usuário não encontrado");
    }
    
    const now = Date.now();
    
    await ctx.db.patch(args.userId, {
      metadata: {
        ...user.metadata,
        lastLogin: now,
        updatedAt: now,
      },
    });
    
    return args.userId;
  },
});

// Mutation para deletar usuário (soft delete)
export const deleteUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new ConvexError("Usuário não encontrado");
    }
    
    // Soft delete - apenas muda o status
    await ctx.db.patch(args.userId, {
      status: "inactive",
      metadata: {
        ...user.metadata,
        updatedAt: Date.now(),
      },
    });
    
    return args.userId;
  },
});

// Query para estatísticas de usuários
export const getUserStats = query({
  handler: async (ctx) => {
    const allUsers = await ctx.db.query("users").collect();
    
    const stats = {
      total: allUsers.length,
      active: allUsers.filter(u => u.status === "active").length,
      inactive: allUsers.filter(u => u.status === "inactive").length,
      suspended: allUsers.filter(u => u.status === "suspended").length,
      byRole: {
        admin: allUsers.filter(u => u.role === "admin").length,
        user: allUsers.filter(u => u.role === "user").length,
        agent: allUsers.filter(u => u.role === "agent").length,
      },
      recentLogins: allUsers.filter(u => 
        u.metadata?.lastLogin && 
        u.metadata.lastLogin > Date.now() - 7 * 24 * 60 * 60 * 1000 // últimos 7 dias
      ).length,
    };
    
    return stats;
  },
});