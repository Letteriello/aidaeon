import { MainLayout } from "@/components/layout/main-layout";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui";
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Database,
  Key,
  Globe,
  Mail,
  Smartphone,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useState } from "react";

const settingsSections = [
  {
    id: "profile",
    title: "Perfil",
    icon: User,
    description: "Gerencie suas informações pessoais",
  },
  {
    id: "security",
    title: "Segurança",
    icon: Shield,
    description: "Configurações de segurança e autenticação",
  },
  {
    id: "notifications",
    title: "Notificações",
    icon: Bell,
    description: "Preferências de notificações",
  },
  {
    id: "appearance",
    title: "Aparência",
    icon: Palette,
    description: "Tema e personalização da interface",
  },
  {
    id: "integrations",
    title: "Integrações",
    icon: Database,
    description: "APIs e serviços externos",
  },
  {
    id: "api",
    title: "API",
    icon: Key,
    description: "Chaves de API e webhooks",
  },
];

const apiKeys = [
  {
    id: 1,
    name: "Produção",
    key: "ak_prod_1234567890abcdef",
    created: "2024-01-01",
    lastUsed: "2024-01-15 15:30",
    permissions: ["read", "write"],
  },
  {
    id: 2,
    name: "Desenvolvimento",
    key: "ak_dev_abcdef1234567890",
    created: "2024-01-10",
    lastUsed: "2024-01-15 14:20",
    permissions: ["read"],
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [showApiKey, setShowApiKey] = useState<{ [key: number]: boolean }>({});
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });
  const [theme, setTheme] = useState("system");

  const toggleApiKeyVisibility = (keyId: number) => {
    setShowApiKey(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const maskApiKey = (key: string) => {
    return key.substring(0, 8) + "*".repeat(16) + key.substring(key.length - 4);
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>
            Atualize suas informações de perfil
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Nome</label>
              <input
                type="text"
                defaultValue="Gabriel Silva"
                className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Sobrenome</label>
              <input
                type="text"
                defaultValue="Silva"
                className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              defaultValue="gabriel@aidaeon.com"
              className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Telefone</label>
            <input
              type="tel"
              defaultValue="+55 11 99999-0001"
              className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Bio</label>
            <textarea
              rows={3}
              defaultValue="Desenvolvedor e especialista em automação e IA"
              className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
            />
          </div>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Alterações
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>
            Mantenha sua conta segura com uma senha forte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Senha Atual</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Nova Senha</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Confirmar Nova Senha</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
            />
          </div>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Alterar Senha
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Autenticação de Dois Fatores</CardTitle>
          <CardDescription>
            Adicione uma camada extra de segurança à sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">2FA via SMS</div>
              <div className="text-sm text-muted-foreground">Receba códigos via SMS</div>
            </div>
            <Button variant="outline">Configurar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preferências de Notificação</CardTitle>
          <CardDescription>
            Escolha como e quando receber notificações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Notificações por Email</div>
                  <div className="text-sm text-muted-foreground">Receba atualizações importantes por email</div>
                </div>
              </div>
              <Button
                variant={notifications.email ? "default" : "outline"}
                size="sm"
                onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
              >
                {notifications.email ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Notificações Push</div>
                  <div className="text-sm text-muted-foreground">Receba notificações no navegador</div>
                </div>
              </div>
              <Button
                variant={notifications.push ? "default" : "outline"}
                size="sm"
                onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
              >
                {notifications.push ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Notificações SMS</div>
                  <div className="text-sm text-muted-foreground">Receba alertas críticos via SMS</div>
                </div>
              </div>
              <Button
                variant={notifications.sms ? "default" : "outline"}
                size="sm"
                onClick={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
              >
                {notifications.sms ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Marketing</div>
                  <div className="text-sm text-muted-foreground">Receba novidades e promoções</div>
                </div>
              </div>
              <Button
                variant={notifications.marketing ? "default" : "outline"}
                size="sm"
                onClick={() => setNotifications(prev => ({ ...prev, marketing: !prev.marketing }))}
              >
                {notifications.marketing ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tema</CardTitle>
          <CardDescription>
            Personalize a aparência da interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              className="h-20 flex-col space-y-2"
              onClick={() => setTheme("light")}
            >
              <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded" />
              <span>Claro</span>
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              className="h-20 flex-col space-y-2"
              onClick={() => setTheme("dark")}
            >
              <div className="w-6 h-6 bg-gray-800 border-2 border-gray-600 rounded" />
              <span>Escuro</span>
            </Button>
            <Button
              variant={theme === "system" ? "default" : "outline"}
              className="h-20 flex-col space-y-2"
              onClick={() => setTheme("system")}
            >
              <div className="w-6 h-6 bg-gradient-to-r from-white to-gray-800 border-2 border-gray-400 rounded" />
              <span>Sistema</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIntegrationsSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integrações Disponíveis</CardTitle>
          <CardDescription>
            Conecte serviços externos à sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">WA</span>
              </div>
              <div>
                <div className="font-medium">WhatsApp Business</div>
                <div className="text-sm text-muted-foreground">Conectado</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Configurar
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">N8</span>
              </div>
              <div>
                <div className="font-medium">N8n</div>
                <div className="text-sm text-muted-foreground">Não conectado</div>
              </div>
            </div>
            <Button size="sm">
              Conectar
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold">CV</span>
              </div>
              <div>
                <div className="font-medium">Convex</div>
                <div className="text-sm text-muted-foreground">Conectado</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Configurar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderApiSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Chaves de API</CardTitle>
              <CardDescription>
                Gerencie suas chaves de acesso à API
              </CardDescription>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Chave
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">{apiKey.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Criada em {apiKey.created} • Último uso: {apiKey.lastUsed}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <code className="flex-1 px-3 py-2 bg-muted rounded text-sm font-mono">
                    {showApiKey[apiKey.id] ? apiKey.key : maskApiKey(apiKey.key)}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleApiKeyVisibility(apiKey.id)}
                  >
                    {showApiKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  {apiKey.permissions.map((permission) => (
                    <span
                      key={permission}
                      className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>
            Configure endpoints para receber eventos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <div className="text-center">
              <Info className="h-8 w-8 mx-auto mb-2" />
              <div>Nenhum webhook configurado</div>
              <Button className="mt-4 gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Webhook
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "security":
        return renderSecuritySection();
      case "notifications":
        return renderNotificationsSection();
      case "appearance":
        return renderAppearanceSection();
      case "integrations":
        return renderIntegrationsSection();
      case "api":
        return renderApiSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas preferências e configurações da conta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {settingsSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted transition-colors ${
                          activeSection === section.id ? "bg-muted border-r-2 border-primary" : ""
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <div>
                          <div className="font-medium">{section.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {section.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}