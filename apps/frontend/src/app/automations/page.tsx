import { MainLayout } from "@/components/layout/main-layout";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui";
import {
  Zap,
  Plus,
  Search,
  Filter,
  Play,
  Pause,
  Settings,
  MoreVertical,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Bot,
  MessageSquare,
  Users,
  Calendar,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const automations = [
  {
    id: 1,
    name: "Boas-vindas WhatsApp",
    description: "Mensagem automática de boas-vindas para novos contatos",
    type: "whatsapp",
    status: "active",
    trigger: "Novo contato",
    executions: 1247,
    successRate: 98.5,
    lastRun: "2024-01-15 15:30",
    createdAt: "2024-01-01",
    tags: ["whatsapp", "boas-vindas"],
  },
  {
    id: 2,
    name: "Qualificação de Leads",
    description: "Fluxo para qualificar leads através de perguntas automatizadas",
    type: "lead-qualification",
    status: "active",
    trigger: "Interesse em produto",
    executions: 856,
    successRate: 87.3,
    lastRun: "2024-01-15 15:25",
    createdAt: "2024-01-05",
    tags: ["leads", "qualificação"],
  },
  {
    id: 3,
    name: "Agendamento de Reuniões",
    description: "Automatiza o processo de agendamento de reuniões comerciais",
    type: "scheduling",
    status: "active",
    trigger: "Lead qualificado",
    executions: 423,
    successRate: 92.1,
    lastRun: "2024-01-15 14:45",
    createdAt: "2024-01-08",
    tags: ["agendamento", "vendas"],
  },
  {
    id: 4,
    name: "Follow-up Pós-venda",
    description: "Acompanhamento automático após fechamento de vendas",
    type: "follow-up",
    status: "paused",
    trigger: "Venda concluída",
    executions: 234,
    successRate: 95.7,
    lastRun: "2024-01-14 16:20",
    createdAt: "2024-01-10",
    tags: ["pós-venda", "follow-up"],
  },
  {
    id: 5,
    name: "Suporte Técnico L1",
    description: "Primeiro nível de suporte técnico automatizado",
    type: "support",
    status: "active",
    trigger: "Solicitação de suporte",
    executions: 1089,
    successRate: 76.4,
    lastRun: "2024-01-15 15:35",
    createdAt: "2024-01-03",
    tags: ["suporte", "técnico"],
  },
  {
    id: 6,
    name: "Recuperação de Carrinho",
    description: "Recupera vendas de carrinhos abandonados",
    type: "e-commerce",
    status: "error",
    trigger: "Carrinho abandonado",
    executions: 567,
    successRate: 45.2,
    lastRun: "2024-01-15 12:10",
    createdAt: "2024-01-12",
    tags: ["e-commerce", "recuperação"],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "text-green-600";
    case "paused":
      return "text-yellow-600";
    case "error":
      return "text-red-600";
    case "draft":
      return "text-gray-600";
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
    case "error":
      return XCircle;
    case "draft":
      return Clock;
    default:
      return Clock;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Ativo";
    case "paused":
      return "Pausado";
    case "error":
      return "Erro";
    case "draft":
      return "Rascunho";
    default:
      return "Desconhecido";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "whatsapp":
      return MessageSquare;
    case "lead-qualification":
      return Users;
    case "scheduling":
      return Calendar;
    case "follow-up":
      return TrendingUp;
    case "support":
      return Bot;
    case "e-commerce":
      return ArrowRight;
    default:
      return Zap;
  }
};

const getSuccessRateColor = (rate: number) => {
  if (rate >= 90) return "text-green-600";
  if (rate >= 70) return "text-yellow-600";
  return "text-red-600";
};

export default function AutomationsPage() {
  const totalExecutions = automations.reduce((sum, auto) => sum + auto.executions, 0);
  const averageSuccessRate = automations.reduce((sum, auto) => sum + auto.successRate, 0) / automations.length;
  const activeAutomations = automations.filter(auto => auto.status === 'active').length;

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Automações</h1>
            <p className="text-muted-foreground">
              Gerencie fluxos automatizados e monitore performance
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="gap-2">
              <Activity className="h-4 w-4" />
              Logs
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Automação
            </Button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Automações</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{automations.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeAutomations} ativas
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Execuções Totais</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalExecutions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% este mês
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageSuccessRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Média geral
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Execuções Hoje</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">
                +8% vs ontem
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
                  placeholder="Buscar automações por nome ou tipo..."
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

        {/* Automations Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {automations.map((automation) => {
            const StatusIcon = getStatusIcon(automation.status);
            const TypeIcon = getTypeIcon(automation.type);
            
            return (
              <Card key={automation.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <TypeIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{automation.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <StatusIcon className={`h-4 w-4 ${getStatusColor(automation.status)}`} />
                          <span className={`text-sm font-medium ${getStatusColor(automation.status)}`}>
                            {getStatusText(automation.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm">
                    {automation.description}
                  </CardDescription>
                  
                  {/* Trigger */}
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-muted-foreground">Gatilho:</span>
                    <span className="font-medium">{automation.trigger}</span>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <div className="text-2xl font-bold">{automation.executions.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Execuções</div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${getSuccessRateColor(automation.successRate)}`}>
                        {automation.successRate}%
                      </div>
                      <div className="text-xs text-muted-foreground">Taxa de Sucesso</div>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {automation.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Last Run */}
                  <div className="text-xs text-muted-foreground border-t pt-3">
                    Última execução: {automation.lastRun}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    {automation.status === 'active' ? (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Pause className="h-4 w-4 mr-2" />
                        Pausar
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        Ativar
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Crie automações comuns rapidamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <MessageSquare className="h-6 w-6" />
                <span>WhatsApp Bot</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span>Qualificação de Leads</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Calendar className="h-6 w-6" />
                <span>Agendamento</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}