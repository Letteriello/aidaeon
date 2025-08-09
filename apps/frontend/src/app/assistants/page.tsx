import { MainLayout } from "@/components/layout/main-layout";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui";
import {
  Bot,
  Plus,
  Settings,
  Play,
  Pause,
  MoreVertical,
  MessageSquare,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const assistants = [
  {
    id: 1,
    name: "Assistente de Vendas",
    description: "Qualifica leads e agenda reuniões comerciais",
    status: "active",
    conversations: 1247,
    users: 892,
    successRate: 94.2,
    lastActive: "2 min atrás",
    avatar: "🤖",
  },
  {
    id: 2,
    name: "Suporte Técnico",
    description: "Resolve dúvidas técnicas e problemas comuns",
    status: "active",
    conversations: 856,
    users: 634,
    successRate: 89.7,
    lastActive: "5 min atrás",
    avatar: "🔧",
  },
  {
    id: 3,
    name: "Atendimento Geral",
    description: "Primeira linha de atendimento e triagem",
    status: "paused",
    conversations: 2103,
    users: 1456,
    successRate: 91.5,
    lastActive: "1 hora atrás",
    avatar: "💬",
  },
  {
    id: 4,
    name: "Agendamento",
    description: "Gerencia agendamentos e consultas",
    status: "active",
    conversations: 567,
    users: 423,
    successRate: 96.8,
    lastActive: "10 min atrás",
    avatar: "📅",
  },
  {
    id: 5,
    name: "Cobrança",
    description: "Automatiza processos de cobrança e negociação",
    status: "inactive",
    conversations: 234,
    users: 189,
    successRate: 87.3,
    lastActive: "2 dias atrás",
    avatar: "💰",
  },
  {
    id: 6,
    name: "Feedback",
    description: "Coleta feedback e avaliações dos clientes",
    status: "active",
    conversations: 445,
    users: 334,
    successRate: 92.1,
    lastActive: "15 min atrás",
    avatar: "⭐",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "text-green-600";
    case "paused":
      return "text-yellow-600";
    case "inactive":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return CheckCircle;
    case "paused":
      return Pause;
    case "inactive":
      return AlertCircle;
    default:
      return AlertCircle;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Ativo";
    case "paused":
      return "Pausado";
    case "inactive":
      return "Inativo";
    default:
      return "Desconhecido";
  }
};

export default function AssistantsPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assistentes</h1>
            <p className="text-muted-foreground">
              Gerencie seus assistentes de IA e monitore performance
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Assistente
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Assistentes</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assistants.length}</div>
              <p className="text-xs text-muted-foreground">
                {assistants.filter(a => a.status === 'active').length} ativos
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversas Totais</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {assistants.reduce((sum, a) => sum + a.conversations, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +12% este mês
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Atendidos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {assistants.reduce((sum, a) => sum + a.users, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +8% este mês
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa Média de Sucesso</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(assistants.reduce((sum, a) => sum + a.successRate, 0) / assistants.length).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                +2.1% este mês
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Assistants Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assistants.map((assistant) => {
            const StatusIcon = getStatusIcon(assistant.status);
            
            return (
              <Card key={assistant.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{assistant.avatar}</div>
                      <div>
                        <CardTitle className="text-lg">{assistant.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {assistant.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Status */}
                  <div className="flex items-center space-x-2">
                    <StatusIcon className={`h-4 w-4 ${getStatusColor(assistant.status)}`} />
                    <span className={`text-sm font-medium ${getStatusColor(assistant.status)}`}>
                      {getStatusText(assistant.status)}
                    </span>
                  </div>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Conversas</div>
                      <div className="font-semibold">{assistant.conversations.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Usuários</div>
                      <div className="font-semibold">{assistant.users.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Taxa de Sucesso</div>
                      <div className="font-semibold">{assistant.successRate}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Última Atividade</div>
                      <div className="font-semibold">{assistant.lastActive}</div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                    <Button 
                      size="sm" 
                      variant={assistant.status === 'active' ? 'secondary' : 'default'}
                      className="flex-1"
                    >
                      {assistant.status === 'active' ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pausar
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Ativar
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}