import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { ConvexError } from "convex/values";

// Query para buscar mensagem por ID
export const getMessageById = query({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.messageId);
    return message;
  },
});

// Query para listar mensagens de uma conversa
export const getMessagesByConversation = query({
  args: {
    conversationId: v.id("conversations"),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
    order: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .order(args.order === "desc" ? "desc" : "asc")
      .take(args.limit || 100);
    
    return messages;
  },
});

// Query para buscar mensagens por tipo
export const getMessagesByType = query({
  args: {
    conversationId: v.id("conversations"),
    type: v.union(v.literal("text"), v.literal("image"), v.literal("audio"), v.literal("video"), v.literal("document"), v.literal("location"), v.literal("contact"), v.literal("system")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .filter((q) => q.eq(q.field("contentType"), args.type))
      .order("desc")
      .take(args.limit || 50);
    
    return messages;
  },
});

// Query para buscar mensagens por remetente
export const getMessagesBySender = query({
  args: {
    conversationId: v.id("conversations"),
    sender: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .filter((q) => q.eq(q.field("role"), args.sender))
      .order("desc")
      .take(args.limit || 50);
    
    return messages;
  },
});

// Mutation para criar mensagem
export const createMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    sender: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    type: v.union(v.literal("text"), v.literal("image"), v.literal("audio"), v.literal("video"), v.literal("document"), v.literal("location"), v.literal("contact"), v.literal("system")),
    content: v.string(),
    metadata: v.optional(v.object({
      // Metadados para diferentes tipos de mídia
      media: v.optional(v.object({
        url: v.optional(v.string()),
        filename: v.optional(v.string()),
        mimeType: v.optional(v.string()),
        size: v.optional(v.number()),
        duration: v.optional(v.number()), // Para áudio/vídeo
        dimensions: v.optional(v.object({
          width: v.number(),
          height: v.number(),
        })), // Para imagem/vídeo
      })),
      // Metadados para localização
      location: v.optional(v.object({
        latitude: v.number(),
        longitude: v.number(),
        address: v.optional(v.string()),
      })),
      // Metadados para contato
      contact: v.optional(v.object({
        name: v.string(),
        phone: v.optional(v.string()),
        email: v.optional(v.string()),
      })),
      // Metadados para IA
      ai: v.optional(v.object({
        model: v.optional(v.string()),
        tokens: v.optional(v.object({
          input: v.number(),
          output: v.number(),
        })),
        processingTime: v.optional(v.number()),
        confidence: v.optional(v.number()),
        intent: v.optional(v.string()),
        entities: v.optional(v.array(v.object({
          type: v.string(),
          value: v.string(),
          confidence: v.number(),
        }))),
      })),
      // Metadados de entrega
      delivery: v.optional(v.object({
        externalId: v.optional(v.string()),
        status: v.optional(v.union(v.literal("sent"), v.literal("delivered"), v.literal("read"), v.literal("failed"))),
        error: v.optional(v.string()),
      })),
    })),
    replyTo: v.optional(v.id("messages")),
  },
  handler: async (ctx, args) => {
    // Verificar se a conversa existe
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw new ConvexError("Conversa não encontrada");
    }
    
    const now = Date.now();
    
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      sender: args.sender,
      type: args.type,
      content: args.content,
      metadata: args.metadata || {},
      replyTo: args.replyTo,
      timestamp: now,
      status: "sent",
    });
    
    // Atualizar última atividade da conversa
    await ctx.db.patch(args.conversationId, {
      lastActivity: now,
    });
    
    // Atualizar métricas do assistente se a mensagem for do assistente
    if (args.sender === "assistant") {
      const assistant = await ctx.db.get(conversation.assistantId);
      if (assistant) {
        await ctx.db.patch(conversation.assistantId, {
          metrics: {
            ...assistant.metrics,
            totalMessages: assistant.metrics.totalMessages + 1,
            lastActivity: now,
          },
          updatedAt: now,
        });
      }
    }
    
    return messageId;
  },
});

// Mutation para atualizar status da mensagem
export const updateMessageStatus = mutation({
  args: {
    messageId: v.id("messages"),
    status: v.union(v.literal("sent"), v.literal("delivered"), v.literal("read"), v.literal("failed")),
    error: v.optional(v.string()),
    externalId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { messageId, status, error, externalId } = args;
    
    const message = await ctx.db.get(messageId);
    if (!message) {
      throw new ConvexError("Mensagem não encontrada");
    }
    
    const updateData: any = {
      status,
      metadata: {
        ...message.metadata,
        delivery: {
          ...message.metadata?.delivery,
          status,
          error,
          externalId,
        },
      },
    };
    
    if (status === "delivered") {
      updateData.deliveredAt = Date.now();
    } else if (status === "read") {
      updateData.readAt = Date.now();
    }
    
    await ctx.db.patch(messageId, updateData);
    
    return messageId;
  },
});

// Mutation para marcar mensagens como lidas
export const markMessagesAsRead = mutation({
  args: {
    conversationId: v.id("conversations"),
    upToMessageId: v.optional(v.id("messages")),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .filter((q) => q.neq(q.field("status"), "read"));
    
    const messages = await query.collect();
    const now = Date.now();
    
    const updatePromises = messages
      .filter(msg => {
        if (!args.upToMessageId) return true;
        return msg.timestamp <= (messages.find(m => m._id === args.upToMessageId)?.timestamp || now);
      })
      .map(message => 
        ctx.db.patch(message._id, {
          status: "read",
          readAt: now,
          metadata: {
            ...message.metadata,
            delivery: {
              ...message.metadata?.delivery,
              status: "read",
            },
          },
        })
      );
    
    await Promise.all(updatePromises);
    
    return updatePromises.length;
  },
});

// Mutation para deletar mensagem
export const deleteMessage = mutation({
  args: {
    messageId: v.id("messages"),
    deleteForEveryone: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.messageId);
    if (!message) {
      throw new ConvexError("Mensagem não encontrada");
    }
    
    if (args.deleteForEveryone) {
      // Deletar completamente
      await ctx.db.delete(args.messageId);
    } else {
      // Marcar como deletada
      await ctx.db.patch(args.messageId, {
        content: "[Mensagem deletada]",
        metadata: {
          ...message.metadata,
          deleted: true,
          deletedAt: Date.now(),
        },
      });
    }
    
    return args.messageId;
  },
});

// Query para estatísticas de mensagens
export const getMessageStats = query({
  args: {
    conversationId: v.optional(v.id("conversations")),
    assistantId: v.optional(v.id("assistants")),
    timeRange: v.optional(v.union(v.literal("today"), v.literal("week"), v.literal("month"), v.literal("all"))),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("messages");
    
    if (args.conversationId) {
      query = query.withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId));
    }
    
    const messages = await query.collect();
    
    // Filtrar por assistente se especificado
    let filteredMessages = messages;
    if (args.assistantId) {
      const conversations = await ctx.db.query("conversations")
        .withIndex("by_assistant", (q) => q.eq("assistantId", args.assistantId))
        .collect();
      
      const conversationIds = new Set(conversations.map(c => c._id));
      filteredMessages = messages.filter(m => conversationIds.has(m.conversationId));
    }
    
    // Filtrar por período se especificado
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
      
      filteredMessages = filteredMessages.filter(m => m.timestamp >= timeLimit);
    }
    
    const stats = {
      total: filteredMessages.length,
      bySender: {
        user: filteredMessages.filter(m => m.sender === "user").length,
        assistant: filteredMessages.filter(m => m.sender === "assistant").length,
        system: filteredMessages.filter(m => m.sender === "system").length,
      },
      byType: {
        text: filteredMessages.filter(m => m.type === "text").length,
        image: filteredMessages.filter(m => m.type === "image").length,
        audio: filteredMessages.filter(m => m.type === "audio").length,
        video: filteredMessages.filter(m => m.type === "video").length,
        document: filteredMessages.filter(m => m.type === "document").length,
        location: filteredMessages.filter(m => m.type === "location").length,
        contact: filteredMessages.filter(m => m.type === "contact").length,
        system: filteredMessages.filter(m => m.type === "system").length,
      },
      byStatus: {
        sent: filteredMessages.filter(m => m.status === "sent").length,
        delivered: filteredMessages.filter(m => m.status === "delivered").length,
        read: filteredMessages.filter(m => m.status === "read").length,
        failed: filteredMessages.filter(m => m.status === "failed").length,
      },
      averageResponseTime: (() => {
        const userMessages = filteredMessages.filter(m => m.sender === "user").sort((a, b) => a.timestamp - b.timestamp);
        const assistantMessages = filteredMessages.filter(m => m.sender === "assistant").sort((a, b) => a.timestamp - b.timestamp);
        
        let totalResponseTime = 0;
        let responseCount = 0;
        
        userMessages.forEach(userMsg => {
          const nextAssistantMsg = assistantMessages.find(assistantMsg => 
            assistantMsg.timestamp > userMsg.timestamp && 
            assistantMsg.conversationId === userMsg.conversationId
          );
          
          if (nextAssistantMsg) {
            totalResponseTime += nextAssistantMsg.timestamp - userMsg.timestamp;
            responseCount++;
          }
        });
        
        return responseCount > 0 ? totalResponseTime / responseCount : 0;
      })(),
    };
    
    return stats;
  },
});

// Query para buscar mensagens com texto
export const searchMessages = query({
  args: {
    conversationId: v.optional(v.id("conversations")),
    searchTerm: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("messages");
    
    if (args.conversationId) {
      query = query.withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId));
    }
    
    const messages = await query.collect();
    
    // Filtrar mensagens que contêm o termo de busca
    const filteredMessages = messages
      .filter(message => 
        message.content.toLowerCase().includes(args.searchTerm.toLowerCase())
      )
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, args.limit || 50);
    
    return filteredMessages;
  },
});

// Query para obter contexto de conversa (últimas mensagens)
export const getConversationContext = query({
  args: {
    conversationId: v.id("conversations"),
    limit: v.optional(v.number()),
    includeSystem: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId));
    
    if (!args.includeSystem) {
      query = query.filter((q) => q.neq(q.field("sender"), "system"));
    }
    
    const messages = await query
      .order("desc")
      .take(args.limit || 20);
    
    // Retornar em ordem cronológica
    return messages.reverse();
  },
});