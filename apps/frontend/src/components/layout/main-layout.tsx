'use client';

import { useState } from 'react';

import { cn } from '@repo/ui';

import { Header } from './header';
import { Sidebar } from './sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />
        <main
          className={cn(
            'flex-1 transition-all duration-300 ease-in-out',
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          )}
        >
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
