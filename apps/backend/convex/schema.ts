import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Schema principal do banco de dados Convex
export default defineSchema({
  // Usuários do sistema
  users: defineTable({
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("user"), v.literal("agent")),
    status: v.union(v.literal("active"), v.literal("inactive"), v.literal("suspended")),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    preferences: v.optional(v.object({
      theme: v.union(v.literal("light"), v.literal("dark"), v.literal("system")),
      notifications: v.object({
        email: v.boolean(),
        push: v.boolean(),
        sms: v.boolean(),
      }),
      language: v.string(),
    })),
    metadata: v.optional(v.object({
      lastLogin: v.optional(v.number()),
      createdAt: v.number(),
      updatedAt: v.number(),
    })),
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"])
    .index("by_status", ["status"]),

  // Assistentes de IA
  assistants: defineTable({
    name: v.string(),
    description: v.string(),
    avatar: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("inactive"), v.literal("training")),
    type: v.union(v.literal("customer_service"), v.literal("sales"), v.literal("support"), v.literal("general")),
    configuration: v.object({
      model: v.string(), // "gpt-4", "gpt-3.5-turbo", etc.
      temperature: v.number(),
      maxTokens: v.number(),
      systemPrompt: v.string(),
      knowledgeBase: v.optional(v.array(v.string())), // IDs de documentos
      capabilities: v.array(v.string()), // ["text", "voice", "image", "file"]
    }),
    integrations: v.object({
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
    }),
    metrics: v.object({
      totalConversations: v.number(),
      activeUsers: v.number(),
      successRate: v.number(),
      averageResponseTime: v.number(), // em segundos
      lastActivity: v.optional(v.number()),
    }),
    createdBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_type", ["type"])
    .index("by_created_by", ["createdBy"])
    .index("by_created_at", ["createdAt"]),

  // Conversas
  conversations: defineTable({
    assistantId: v.id("assistants"),
    userId: v.optional(v.id("users")), // Pode ser null para usuários anônimos
    externalUserId: v.optional(v.string()), // ID do usuário no WhatsApp, Telegram, etc.
    platform: v.union(v.literal("whatsapp"), v.literal("telegram"), v.literal("webchat"), v.literal("api")),
    status: v.union(v.literal("active"), v.literal("completed"), v.literal("abandoned"), v.literal("transferred")),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("urgent")),
    tags: v.array(v.string()),
    metadata: v.object({
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
        satisfaction: v.optional(v.number()), // 1-5
        feedback: v.optional(v.string()),
        resolvedAt: v.optional(v.number()),
        resolvedBy: v.optional(v.union(v.literal("ai"), v.literal("human"))),
      })),
    }),
    startedAt: v.number(),
    lastActivity: v.number(),
    endedAt: v.optional(v.number()),
  })
    .index("by_assistant", ["assistantId"])
    .index("by_user", ["userId"])
    .index("by_external_user", ["externalUserId"])
    .index("by_platform", ["platform"])
    .index("by_status", ["status"])
    .index("by_started_at", ["startedAt"])
    .index("by_last_activity", ["lastActivity"]),

  // Mensagens das conversas
  messages: defineTable({
    conversationId: v.id("conversations"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    content: v.string(),
    contentType: v.union(v.literal("text"), v.literal("image"), v.literal("audio"), v.literal("file"), v.literal("location")),
    metadata: v.optional(v.object({
      fileUrl: v.optional(v.string()),
      fileName: v.optional(v.string()),
      fileSize: v.optional(v.number()),
      mimeType: v.optional(v.string()),
      coordinates: v.optional(v.object({
        latitude: v.number(),
        longitude: v.number(),
      })),
      processingTime: v.optional(v.number()), // tempo de processamento da IA em ms
      tokens: v.optional(v.object({
        input: v.number(),
        output: v.number(),
        total: v.number(),
      })),
    })),
    timestamp: v.number(),
    edited: v.optional(v.boolean()),
    editedAt: v.optional(v.number()),
  })
    .index("by_conversation", ["conversationId"])
    .index("by_timestamp", ["timestamp"])
    .index("by_role", ["role"]),

  // Automações e fluxos
  automations: defineTable({
    name: v.string(),
    description: v.string(),
    type: v.union(v.literal("workflow"), v.literal("trigger"), v.literal("scheduled"), v.literal("webhook")),
    status: v.union(v.literal("active"), v.literal("inactive"), v.literal("draft"), v.literal("error")),
    configuration: v.object({
      trigger: v.object({
        type: v.union(v.literal("message"), v.literal("keyword"), v.literal("time"), v.literal("event")),
        conditions: v.array(v.object({
          field: v.string(),
          operator: v.union(v.literal("equals"), v.literal("contains"), v.literal("starts_with"), v.literal("regex")),
          value: v.string(),
        })),
      }),
      actions: v.array(v.object({
        type: v.union(v.literal("send_message"), v.literal("transfer"), v.literal("tag"), v.literal("webhook"), v.literal("api_call")),
        parameters: v.object({}), // Flexível para diferentes tipos de ação
      })),
    }),
    metrics: v.object({
      totalExecutions: v.number(),
      successfulExecutions: v.number(),
      failedExecutions: v.number(),
      averageExecutionTime: v.number(),
      lastExecution: v.optional(v.number()),
    }),
    createdBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_type", ["type"])
    .index("by_created_by", ["createdBy"]),

  // Logs de execução das automações
  automation_logs: defineTable({
    automationId: v.id("automations"),
    conversationId: v.optional(v.id("conversations")),
    status: v.union(v.literal("success"), v.literal("error"), v.literal("pending")),
    executionTime: v.number(), // em ms
    input: v.optional(v.object({})),
    output: v.optional(v.object({})),
    error: v.optional(v.string()),
    timestamp: v.number(),
  })
    .index("by_automation", ["automationId"])
    .index("by_conversation", ["conversationId"])
    .index("by_status", ["status"])
    .index("by_timestamp", ["timestamp"]),

  // Base de conhecimento
  knowledge_base: defineTable({
    title: v.string(),
    content: v.string(),
    type: v.union(v.literal("faq"), v.literal("document"), v.literal("article"), v.literal("manual")),
    tags: v.array(v.string()),
    category: v.string(),
    status: v.union(v.literal("published"), v.literal("draft"), v.literal("archived")),
    metadata: v.optional(v.object({
      fileUrl: v.optional(v.string()),
      embeddings: v.optional(v.array(v.number())), // Para busca semântica
      lastIndexed: v.optional(v.number()),
      viewCount: v.number(),
      useCount: v.number(), // Quantas vezes foi usado em respostas
    })),
    createdBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_type", ["type"])
    .index("by_category", ["category"])
    .index("by_status", ["status"])
    .index("by_created_by", ["createdBy"])
    .searchIndex("search_content", {
      searchField: "content",
      filterFields: ["type", "category", "status"]
    }),

  // Configurações do sistema
  settings: defineTable({
    key: v.string(),
    value: v.union(v.string(), v.number(), v.boolean(), v.object({})),
    category: v.string(),
    description: v.optional(v.string()),
    updatedBy: v.id("users"),
    updatedAt: v.number(),
  })
    .index("by_key", ["key"])
    .index("by_category", ["category"]),

  // Integrações externas
  integrations: defineTable({
    name: v.string(),
    type: v.union(v.literal("whatsapp"), v.literal("telegram"), v.literal("openai"), v.literal("webhook"), v.literal("api")),
    status: v.union(v.literal("active"), v.literal("inactive"), v.literal("error")),
    configuration: v.object({
      apiKey: v.optional(v.string()),
      apiSecret: v.optional(v.string()),
      webhookUrl: v.optional(v.string()),
      settings: v.optional(v.object({})),
    }),
    lastSync: v.optional(v.number()),
    createdBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_type", ["type"])
    .index("by_status", ["status"])
    .index("by_created_by", ["createdBy"]),
});