'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@repo/ui';
import { Button } from '@repo/ui';
import {
  BarChart3,
  Bot,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  MessageSquare,
  Plus,
  Settings,
  Users,
  Zap,
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
    description: 'Visão geral da plataforma',
  },
  {
    name: 'Assistentes',
    href: '/assistants',
    icon: Bot,
    description: 'Gerencie seus assistentes de IA',
  },
  {
    name: 'Conversas',
    href: '/conversations',
    icon: MessageSquare,
    description: 'Histórico de conversas',
  },
  {
    name: 'Usuários',
    href: '/users',
    icon: Users,
    description: 'Gerenciar usuários',
  },
  {
    name: 'Automações',
    href: '/automations',
    icon: Zap,
    description: 'Fluxos automatizados',
  },
  {
    name: 'Configurações',
    href: '/settings',
    icon: Settings,
    description: 'Configurações da conta',
  },
];

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function Sidebar({
  className,
  collapsed,
  onCollapsedChange,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = collapsed ?? internalCollapsed;
  const setIsCollapsed = onCollapsedChange ?? setInternalCollapsed;
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'bg-background flex h-full flex-col border-r transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!isCollapsed && (
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="text-primary h-6 w-6" />
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
        <Button className="w-full" size={isCollapsed ? 'sm' : 'default'}>
          <Plus className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Novo Assistente</span>}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && (
                <div className="ml-3 flex-1">
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-muted-foreground text-xs">
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
            'text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors'
          )}
          title={isCollapsed ? 'Ajuda' : undefined}
        >
          <HelpCircle className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && <span className="ml-3">Ajuda & Suporte</span>}
        </Link>
      </div>
    </div>
  );
}
