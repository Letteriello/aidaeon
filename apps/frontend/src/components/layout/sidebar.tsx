"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@repo/ui";
import { Button } from "@repo/ui";
import {
  Bot,
  MessageSquare,
  Settings,
  BarChart3,
  Users,
  Zap,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
    description: "Visão geral da plataforma",
  },
  {
    name: "Assistentes",
    href: "/assistants",
    icon: Bot,
    description: "Gerencie seus assistentes de IA",
  },
  {
    name: "Conversas",
    href: "/conversations",
    icon: MessageSquare,
    description: "Histórico de conversas",
  },
  {
    name: "Usuários",
    href: "/users",
    icon: Users,
    description: "Gerenciar usuários",
  },
  {
    name: "Automações",
    href: "/automations",
    icon: Zap,
    description: "Fluxos automatizados",
  },
  {
    name: "Configurações",
    href: "/settings",
    icon: Settings,
    description: "Configurações da conta",
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!isCollapsed && (
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">AidaEon</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Quick Action */}
      <div className="p-4">
        <Button className="w-full" size={isCollapsed ? "sm" : "default"}>
          <Plus className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Novo Assistente</span>}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && (
                <div className="ml-3 flex-1">
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.description}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <Link
          href="/help"
          className={cn(
            "flex items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          )}
          title={isCollapsed ? "Ajuda" : undefined}
        >
          <HelpCircle className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && <span className="ml-3">Ajuda & Suporte</span>}
        </Link>
      </div>
    </div>
  );
}