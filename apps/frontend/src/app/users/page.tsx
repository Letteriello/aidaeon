import { MainLayout } from "@/components/layout/main-layout";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui";
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  MoreVertical,
  UserCheck,
  UserX,
  Crown,
  Shield,
  MessageSquare,
  Calendar,
  Phone,
  Mail,
} from "lucide-react";

const users = [
  {
    id: 1,
    name: "Gabriel Silva",
    email: "gabriel@aidaeon.com",
    phone: "+55 11 99999-0001",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15 15:30",
    conversations: 0,
    joinDate: "2024-01-01",
    avatar: "GS",
  },
  {
    id: 2,
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "+55 11 99999-1234",
    role: "user",
    status: "active",
    lastLogin: "2024-01-15 14:45",
    conversations: 23,
    joinDate: "2024-01-10",
    avatar: "MS",
  },
  {
    id: 3,
    name: "João Santos",
    email: "joao.santos@empresa.com",
    phone: "+55 11 98888-5678",
    role: "user",
    status: "active",
    lastLogin: "2024-01-15 15:20",
    conversations: 8,
    joinDate: "2024-01-12",
    avatar: "JS",
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana.costa@startup.com",
    phone: "+55 11 97777-9012",
    role: "moderator",
    status: "active",
    lastLogin: "2024-01-15 13:25",
    conversations: 15,
    joinDate: "2024-01-08",
    avatar: "AC",
  },
  {
    id: 5,
    name: "Pedro Oliveira",
    email: "pedro.oliveira@corp.com",
    phone: "+55 11 96666-3456",
    role: "user",
    status: "inactive",
    lastLogin: "2024-01-10 16:00",
    conversations: 12,
    joinDate: "2024-01-05",
    avatar: "PO",
  },
  {
    id: 6,
    name: "Carla Mendes",
    email: "carla.mendes@tech.com",
    phone: "+55 11 95555-7890",
    role: "user",
    status: "blocked",
    lastLogin: "2024-01-14 11:35",
    conversations: 6,
    joinDate: "2024-01-14",
    avatar: "CM",
  },
  {
    id: 7,
    name: "Roberto Lima",
    email: "roberto.lima@business.com",
    phone: "+55 11 94444-2468",
    role: "user",
    status: "active",
    lastLogin: "2024-01-15 11:00",
    conversations: 28,
    joinDate: "2024-01-03",
    avatar: "RL",
  },
  {
    id: 8,
    name: "Fernanda Costa",
    email: "fernanda@marketing.com",
    phone: "+55 11 93333-1357",
    role: "user",
    status: "active",
    lastLogin: "2024-01-15 09:15",
    conversations: 45,
    joinDate: "2023-12-28",
    avatar: "FC",
  },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-red-100 text-red-800";
    case "moderator":
      return "bg-blue-100 text-blue-800";
    case "user":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getRoleIcon = (role: string) => {
  switch (role) {
    case "admin":
      return Crown;
    case "moderator":
      return Shield;
    case "user":
      return UserCheck;
    default:
      return UserCheck;
  }
};

const getRoleText = (role: string) => {
  switch (role) {
    case "admin":
      return "Administrador";
    case "moderator":
      return "Moderador";
    case "user":
      return "Usuário";
    default:
      return "Usuário";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "text-green-600";
    case "inactive":
      return "text-yellow-600";
    case "blocked":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return UserCheck;
    case "inactive":
      return UserX;
    case "blocked":
      return UserX;
    default:
      return UserX;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Ativo";
    case "inactive":
      return "Inativo";
    case "blocked":
      return "Bloqueado";
    default:
      return "Desconhecido";
  }
};

export default function UsersPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
            <p className="text-muted-foreground">
              Gerencie usuários, permissões e acompanhe atividades
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Usuário
            </Button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                +3 este mês
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => u.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((users.filter(u => u.status === 'active').length / users.length) * 100)}% do total
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novos Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                +100% vs ontem
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
                {users.reduce((sum, u) => sum + u.conversations, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Por todos os usuários
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
                  placeholder="Buscar por nome, email ou telefone..."
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

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Usuários</CardTitle>
            <CardDescription>
              Todos os usuários registrados na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => {
                const StatusIcon = getStatusIcon(user.status);
                const RoleIcon = getRoleIcon(user.role);
                
                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {/* User Avatar */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                        {user.avatar}
                      </div>
                      
                      {/* User Info */}
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-lg">{user.name}</span>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getRoleColor(user.role)}`}>
                            <RoleIcon className="h-3 w-3" />
                            <span>{getRoleText(user.role)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{user.conversations} conversas</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>Desde {user.joinDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {/* Status */}
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`h-4 w-4 ${getStatusColor(user.status)}`} />
                        <span className={`text-sm font-medium ${getStatusColor(user.status)}`}>
                          {getStatusText(user.status)}
                        </span>
                      </div>
                      
                      {/* Last Login */}
                      <div className="text-sm text-muted-foreground min-w-[120px] text-right">
                        <div>Último acesso:</div>
                        <div className="font-medium">{user.lastLogin.split(' ')[1]}</div>
                        <div className="text-xs">{user.lastLogin.split(' ')[0]}</div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
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