"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { X } from "lucide-react";

const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-muted",
        pills: "bg-transparent gap-2",
        underline: "bg-transparent border-b border-border",
        bordered: "border border-border bg-background",
      },
      size: {
        sm: "h-8 p-0.5",
        default: "h-10 p-1",
        lg: "h-12 p-1.5",
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col h-auto w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      orientation: "horizontal",
    },
  }
);

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        pills:
          "rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
        underline:
          "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent",
        bordered:
          "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        default: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const tabsContentVariants = cva(
  "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
        card: "rounded-lg border bg-card p-6",
        padded: "p-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TabsProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
      "orientation" | "value"
    >,
    VariantProps<typeof tabsListVariants> {
  value?: string;
}

const Tabs = TabsPrimitive.Root;

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, size, orientation, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, size, orientation }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, size, icon, badge, closable, onClose, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, size }), "group", className)}
    {...props}
  >
    <div className="flex items-center gap-2">
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
      {badge && <span className="flex items-center">{badge}</span>}
      {closable && (
        <button
          type="button"
          className="ml-1 flex h-4 w-4 items-center justify-center rounded-sm opacity-60 hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-ring"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          aria-label="Close tab"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
    VariantProps<typeof tabsContentVariants> {}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentVariants({ variant }), className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Componente de Tabs avançado
export interface AdvancedTabsProps {
  tabs: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    disabled?: boolean;
    closable?: boolean;
  }>;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onTabClose?: (tabId: string) => void;
  variant?: VariantProps<typeof tabsListVariants>['variant'];
  size?: VariantProps<typeof tabsListVariants>['size'];
  orientation?: Exclude<VariantProps<typeof tabsListVariants>['orientation'], null>;
  contentVariant?: VariantProps<typeof tabsContentVariants>['variant'];
  className?: string;
  listClassName?: string;
  contentClassName?: string;
}

const AdvancedTabs = ({
  tabs,
  defaultValue,
  value,
  onValueChange,
  onTabClose,
  variant = "default",
  size = "default",
  orientation = "horizontal",
  contentVariant = "default",
  className,
  listClassName,
  contentClassName,
}: AdvancedTabsProps) => {
    const handleTabClose = (tabId: string) => {
      onTabClose?.(tabId);
      // Se a tab ativa foi fechada, muda para a primeira disponível
      if (value === tabId || defaultValue === tabId) {
        const remainingTabs = tabs.filter(tab => tab.id !== tabId);
        if (remainingTabs.length > 0) {
          onValueChange?.(remainingTabs[0]!.id);
        }
      }
    };

  return (
    <Tabs
      {...(value ? { value } : { defaultValue })}
      onValueChange={onValueChange ?? (() => {})}
      orientation={orientation ?? undefined}
      className={className}
    >
        <TabsList
          variant={variant}
          size={size}
          orientation={orientation ?? undefined}
          className={listClassName}
        >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            variant={variant}
            size={size}
            icon={tab.icon}
            badge={tab.badge}
            closable={tab.closable ?? false}
            onClose={() => handleTabClose(tab.id)}
            disabled={tab.disabled}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.id}
          value={tab.id}
          variant={contentVariant}
          className={contentClassName}
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

// Tabs com lazy loading
export interface LazyTabsProps extends AdvancedTabsProps {
  lazy?: boolean;
}

const LazyTabs = ({ lazy = true, tabs, ...props }: LazyTabsProps) => {
  const [loadedTabs, setLoadedTabs] = React.useState<Set<string>>(new Set());
  const currentValue = props.value || props.defaultValue;

  React.useEffect(() => {
    if (currentValue && !loadedTabs.has(currentValue)) {
      setLoadedTabs(prev => new Set([...prev, currentValue]));
    }
  }, [currentValue, loadedTabs]);

  const handleValueChange = (value: string) => {
    if (lazy && !loadedTabs.has(value)) {
      setLoadedTabs(prev => new Set([...prev, value]));
    }
    props.onValueChange?.(value);
  };

  const processedTabs = lazy
    ? tabs.map(tab => ({
        ...tab,
        content: loadedTabs.has(tab.id) ? tab.content : <div>Loading...</div>,
      }))
    : tabs;

  return (
    <AdvancedTabs
      {...props}
      tabs={processedTabs}
      onValueChange={handleValueChange}
    />
  );
};

// Hook para gerenciar tabs
export function useTabs(initialTabs: AdvancedTabsProps['tabs']) {
  const [tabs, setTabs] = React.useState(initialTabs);
  const [activeTab, setActiveTab] = React.useState(initialTabs[0]?.id);

  const addTab = React.useCallback((tab: AdvancedTabsProps['tabs'][0]) => {
    setTabs(prev => [...prev, tab]);
  }, []);

  const removeTab = React.useCallback((tabId: string) => {
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.id !== tabId);
      // Se a tab ativa foi removida, muda para a primeira disponível
        if (activeTab === tabId && newTabs.length > 0) {
          setActiveTab(newTabs[0]!.id);
        }
      return newTabs;
    });
  }, [activeTab]);

  const updateTab = React.useCallback((tabId: string, updates: Partial<AdvancedTabsProps['tabs'][0]>) => {
    setTabs(prev => prev.map(tab => 
      tab.id === tabId ? { ...tab, ...updates } : tab
    ));
  }, []);

  const moveTab = React.useCallback((fromIndex: number, toIndex: number) => {
    setTabs(prev => {
      const newTabs = [...prev];
        const [movedTab] = newTabs.splice(fromIndex, 1);
        if (movedTab) {
          newTabs.splice(toIndex, 0, movedTab);
        }
      return newTabs;
    });
  }, []);

  return {
    tabs,
    activeTab,
    setActiveTab,
    addTab,
    removeTab,
    updateTab,
    moveTab,
  };
}

// Tabs com drag and drop (placeholder para implementação futura)
export interface DraggableTabsProps extends AdvancedTabsProps {
  onTabReorder?: (fromIndex: number, toIndex: number) => void;
}

const DraggableTabs = ({ onTabReorder, ...props }: DraggableTabsProps) => {
  // Implementação básica - pode ser expandida com react-dnd ou similar
  return <AdvancedTabs {...props} />;
};

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  AdvancedTabs,
  LazyTabs,
  DraggableTabs,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
};
