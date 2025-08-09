import { MainLayout } from "@/components/layout/main-layout";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui";
import {
  Bot,
  MessageSquare,
  Users,
  BarChart3,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";

const stats = [
  {
    title: "Assistentes Ativos",
    value: "12",
    change: "+2 este mês",
    icon: Bot,
    color: "text-blue-600",
  },
  {
    title: "Conversas Hoje",
    value: "1,247",
    change: "+18% vs ontem",
    icon: MessageSquare,
    color: "text-green-600",
  },
  {
    title: "Usuários Atendidos",
    value: "8,392",
    change: "+12% este mês",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Taxa de Resolução",
    value: "94.2%",
    change: "+2.1% este mês",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
];

const recentActivities = [
  {
    id: 1,
    type: "assistant_created",
    title: "Novo assistente criado",
    description: "Assistente de Vendas foi configurado",
    time: "2 min atrás",
    icon: Bot,
  },
  {
    id: 2,
    type: "conversation_completed",
    title: "Conversa finalizada",
    description: "Lead qualificado com sucesso",
    time: "5 min atrás",
    icon: MessageSquare,
  },
  {
    id: 3,
    type: "user_registered",
    title: "Novo usuário",
    description: "João Silva se registrou",
    time: "10 min atrás",
    icon: Users,
  },
  {
    id: 4,
    type: "automation_triggered",
    title: "Automação executada",
    description: "Fluxo de boas-vindas ativado",
    time: "15 min atrás",
    icon: TrendingUp,
  },
];

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Visão geral dos seus assistentes e métricas
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Assistente
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Performance Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Performance dos Assistentes</CardTitle>
              <CardDescription>
                Métricas de conversas e resoluções nos últimos 7 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Gráfico de Performance</p>
                  <p className="text-sm text-muted-foreground">Em breve</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>
                Últimas ações na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.description}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesse rapidamente as funcionalidades mais utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Bot className="h-6 w-6" />
                <span>Criar Assistente</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <MessageSquare className="h-6 w-6" />
                <span>Ver Conversas</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>Gerenciar Usuários</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BarChart3 className="h-6 w-6" />
                <span>Relatórios</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}