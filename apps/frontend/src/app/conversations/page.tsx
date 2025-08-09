import { MainLayout } from "@/components/layout/main-layout";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui";
import {
  MessageSquare,
  Search,
  Filter,
  Download,
  Eye,
  Clock,
  User,
  Bot,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";

const conversations = [
  {
    id: "conv_001",
    user: {
      name: "Maria Silva",
      phone: "+55 11 99999-1234",
      avatar: "MS",
    },
    assistant: "Assistente de Vendas",
    status: "completed",
    startTime: "2024-01-15 14:30",
    endTime: "2024-01-15 14:45",
    duration: "15 min",
    messages: 23,
    outcome: "lead_qualified",
    lastMessage: "Perfeito! Vou aguardar o contato da equipe comercial.",
  },
  {
    id: "conv_002",
    user: {
      name: "João Santos",
      phone: "+55 11 98888-5678",
      avatar: "JS",
    },
    assistant: "Suporte Técnico",
    status: "active",
    startTime: "2024-01-15 15:20",
    endTime: null,
    duration: "10 min",
    messages: 8,
    outcome: "in_progress",
    lastMessage: "Estou verificando seu problema...",
  },
  {
    id: "conv_003",
    user: {
      name: "Ana Costa",
      phone: "+55 11 97777-9012",
      avatar: "AC",
    },
    assistant: "Atendimento Geral",
    status: "completed",
    startTime: "2024-01-15 13:15",
    endTime: "2024-01-15 13:25",
    duration: "10 min",
    messages: 15,
    outcome: "resolved",
    lastMessage: "Obrigada! Problema resolvido.",
  },
  {
    id: "conv_004",
    user: {
      name: "Pedro Oliveira",
      phone: "+55 11 96666-3456",
      avatar: "PO",
    },
    assistant: "Agendamento",
    status: "completed",
    startTime: "2024-01-15 12:00",
    endTime: "2024-01-15 12:08",
    duration: "8 min",
    messages: 12,
    outcome: "scheduled",
    lastMessage: "Agendamento confirmado para amanhã às 14h.",
  },
  {
    id: "conv_005",
    user: {
      name: "Carla Mendes",
      phone: "+55 11 95555-7890",
      avatar: "CM",
    },
    assistant: "Feedback",
    status: "failed",
    startTime: "2024-01-15 11:30",
    endTime: "2024-01-15 11:35",
    duration: "5 min",
    messages: 6,
    outcome: "abandoned",
    lastMessage: "Não entendi sua pergunta.",
  },
  {
    id: "conv_006",
    user: {
      name: "Roberto Lima",
      phone: "+55 11 94444-2468",
      avatar: "RL",
    },
    assistant: "Cobrança",
    status: "completed",
    startTime: "2024-01-15 10:45",
    endTime: "2024-01-15 11:00",
    duration: "15 min",
    messages: 28,
    outcome: "payment_scheduled",
    lastMessage: "Combinado! Pagarei na próxima sexta-feira.",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "text-green-600";
    case "active":
      return "text-blue-600";
    case "failed":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return CheckCircle;
    case "active":
      return Clock;
    case "failed":
      return XCircle;
    default:
      return AlertCircle;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "completed":
      return "Concluída";
    case "active":
      return "Ativa";
    case "failed":
      return "Falhou";
    default:
      return "Desconhecida";
  }
};

const getOutcomeColor = (outcome: string) => {
  switch (outcome) {
    case "lead_qualified":
    case "resolved":
    case "scheduled":
    case "payment_scheduled":
      return "bg-green-100 text-green-800";
    case "in_progress":
      return "bg-blue-100 text-blue-800";
    case "abandoned":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getOutcomeText = (outcome: string) => {
  switch (outcome) {
    case "lead_qualified":
      return "Lead Qualificado";
    case "resolved":
      return "Resolvido";
    case "scheduled":
      return "Agendado";
    case "payment_scheduled":
      return "Pagamento Agendado";
    case "in_progress":
      return "Em Andamento";
    case "abandoned":
      return "Abandonado";
    default:
      return "Desconhecido";
  }
};

export default function ConversationsPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Conversas</h1>
            <p className="text-muted-foreground">
              Monitore e analise todas as conversas dos seus assistentes
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hoje</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversations.length}</div>
              <p className="text-xs text-muted-foreground">
                +12% vs ontem
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {conversations.filter(c => c.status === 'completed').length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((conversations.filter(c => c.status === 'completed').length / conversations.length) * 100)}% do total
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ativas</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {conversations.filter(c => c.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Em andamento
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">11 min</div>
              <p className="text-xs text-muted-foreground">
                -2 min vs ontem
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por usuário, telefone ou assistente..."
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Conversations List */}
        <Card>
          <CardHeader>
            <CardTitle>Conversas Recentes</CardTitle>
            <CardDescription>
              Lista de todas as conversas ordenadas por data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversations.map((conversation) => {
                const StatusIcon = getStatusIcon(conversation.status);
                
                return (
                  <div
                    key={conversation.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {/* User Avatar */}
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                        {conversation.user.avatar}
                      </div>
                      
                      {/* Conversation Info */}
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{conversation.user.name}</span>
                          <span className="text-sm text-muted-foreground">{conversation.user.phone}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Bot className="h-3 w-3" />
                            <span>{conversation.assistant}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{conversation.messages} mensagens</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{conversation.duration}</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground max-w-md truncate">
                          "{conversation.lastMessage}"
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {/* Status */}
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`h-4 w-4 ${getStatusColor(conversation.status)}`} />
                        <span className={`text-sm font-medium ${getStatusColor(conversation.status)}`}>
                          {getStatusText(conversation.status)}
                        </span>
                      </div>
                      
                      {/* Outcome */}
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getOutcomeColor(conversation.outcome)}`}>
                        {getOutcomeText(conversation.outcome)}
                      </div>
                      
                      {/* Time */}
                      <div className="text-sm text-muted-foreground min-w-[100px] text-right">
                        {conversation.startTime.split(' ')[1]}
                      </div>
                      
                      {/* Actions */}
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}