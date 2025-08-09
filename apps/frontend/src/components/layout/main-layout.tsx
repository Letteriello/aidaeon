"use client";

import { useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { cn } from "@repo/ui";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onCollapsedChange={setSidebarCollapsed} 
        />
        <main 
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            sidebarCollapsed ? "ml-16" : "ml-64"
          )}
        >
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}