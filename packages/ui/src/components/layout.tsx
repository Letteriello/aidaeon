"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

// Container Components
const containerVariants = cva(
  "mx-auto w-full",
  {
    variants: {
      size: {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
        full: "max-w-full",
        fluid: "max-w-none",
      },
      padding: {
        none: "px-0",
        sm: "px-4",
        md: "px-6",
        lg: "px-8",
      },
    },
    defaultVariants: {
      size: "xl",
      padding: "md",
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    
    return (
      <Comp
        ref={ref}
        className={cn(containerVariants({ size, padding }), className)}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

// Grid System
const gridVariants = cva(
  "grid",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        12: "grid-cols-12",
      },
      gap: {
        none: "gap-0",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
      },
      responsive: {
        true: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        false: "",
      },
    },
    defaultVariants: {
      cols: 1,
      gap: "md",
      responsive: false,
    },
  }
);

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  asChild?: boolean;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, responsive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    
    return (
      <Comp
        ref={ref}
        className={cn(
          gridVariants({ cols: responsive ? undefined : cols, gap, responsive }),
          className
        )}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";

const gridItemVariants = cva(
  "",
  {
    variants: {
      span: {
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3",
        4: "col-span-4",
        5: "col-span-5",
        6: "col-span-6",
        7: "col-span-7",
        8: "col-span-8",
        9: "col-span-9",
        10: "col-span-10",
        11: "col-span-11",
        12: "col-span-12",
        full: "col-span-full",
      },
    },
    defaultVariants: {
      span: 1,
    },
  }
);

export interface GridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemVariants> {
  asChild?: boolean;
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, span, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    
    return (
      <Comp
        ref={ref}
        className={cn(gridItemVariants({ span }), className)}
        {...props}
      />
    );
  }
);
GridItem.displayName = "GridItem";

// Flex Components
const flexVariants = cva(
  "flex",
  {
    variants: {
      direction: {
        row: "flex-row",
        "row-reverse": "flex-row-reverse",
        col: "flex-col",
        "col-reverse": "flex-col-reverse",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
      wrap: {
        nowrap: "flex-nowrap",
        wrap: "flex-wrap",
        "wrap-reverse": "flex-wrap-reverse",
      },
      gap: {
        none: "gap-0",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
      },
    },
    defaultVariants: {
      direction: "row",
      align: "start",
      justify: "start",
      wrap: "nowrap",
      gap: "none",
    },
  }
);

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  asChild?: boolean;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction, align, justify, wrap, gap, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    
    return (
      <Comp
        ref={ref}
        className={cn(flexVariants({ direction, align, justify, wrap, gap }), className)}
        {...props}
      />
    );
  }
);
Flex.displayName = "Flex";

// Stack Component (Vertical Flex)
export interface StackProps
  extends Omit<FlexProps, "direction">,
    VariantProps<typeof flexVariants> {
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing = "md", ...props }, ref) => {
    return (
      <Flex
        ref={ref}
        direction="col"
        gap={spacing}
        className={className}
        {...props}
      />
    );
  }
);
Stack.displayName = "Stack";

// Center Component
export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  inline?: boolean;
}

const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  ({ className, asChild = false, inline = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    
    return (
      <Comp
        ref={ref}
        className={cn(
          inline ? "inline-flex" : "flex",
          "items-center justify-center",
          className
        )}
        {...props}
      />
    );
  }
);
Center.displayName = "Center";

// Spacer Component
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  axis?: "x" | "y" | "both";
}

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size = "md", axis = "y", ...props }, ref) => {
    const sizeClasses = {
      sm: "2",
      md: "4",
      lg: "6",
      xl: "8",
      "2xl": "12",
    };

    const axisClasses = {
      x: `w-${sizeClasses[size]}`,
      y: `h-${sizeClasses[size]}`,
      both: `w-${sizeClasses[size]} h-${sizeClasses[size]}`,
    };

    return (
      <div
        ref={ref}
        className={cn(axisClasses[axis], className)}
        {...props}
      />
    );
  }
);
Spacer.displayName = "Spacer";

// Section Component
const sectionVariants = cva(
  "w-full",
  {
    variants: {
      padding: {
        none: "py-0",
        sm: "py-8",
        md: "py-12",
        lg: "py-16",
        xl: "py-20",
        "2xl": "py-24",
      },
      background: {
        none: "",
        muted: "bg-muted/50",
        accent: "bg-accent/50",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
    },
    defaultVariants: {
      padding: "md",
      background: "none",
    },
  }
);

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  asChild?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, padding, background, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "section";
    
    return (
      <Comp
        ref={ref}
        className={cn(sectionVariants({ padding, background }), className)}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";

// Page Layout Components
export interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  sidebarWidth?: "sm" | "md" | "lg";
  sidebarPosition?: "left" | "right";
  sidebarCollapsible?: boolean;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({
    className,
    header,
    sidebar,
    footer,
    sidebarWidth = "md",
    sidebarPosition = "left",
    sidebarCollapsible = false,
    sidebarCollapsed = false,
    onSidebarToggle,
    children,
    ...props
  }, ref) => {
    const sidebarWidthClasses = {
      sm: "w-48",
      md: "w-64",
      lg: "w-80",
    };

    return (
      <div
        ref={ref}
        className={cn("flex h-screen flex-col", className)}
        {...props}
      >
        {/* Header */}
        {header && (
          <header className="flex-shrink-0 border-b bg-background">
            <div className="flex h-16 items-center justify-between px-6">
              {sidebarCollapsible && (
                <button
                  onClick={onSidebarToggle}
                  className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary lg:hidden"
                >
                  <Menu className="h-6 w-6" />
                </button>
              )}
              {header}
            </div>
          </header>
        )}

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          {sidebar && (
            <aside
              className={cn(
                "flex-shrink-0 border-r bg-background transition-all duration-300",
                sidebarWidthClasses[sidebarWidth],
                sidebarCollapsed && "w-0 overflow-hidden",
                sidebarPosition === "right" && "order-2"
              )}
            >
              <div className="flex h-full flex-col">
                {sidebarCollapsible && (
                  <div className="flex h-16 items-center justify-between border-b px-4">
                    <span className="font-semibold">Menu</span>
                    <button
                      onClick={onSidebarToggle}
                      className="rounded-md p-1 hover:bg-accent"
                    >
                      {sidebarPosition === "left" ? (
                        <ChevronLeft className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                )}
                <div className="flex-1 overflow-auto p-4">
                  {sidebar}
                </div>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>

        {/* Footer */}
        {footer && (
          <footer className="flex-shrink-0 border-t bg-background p-4">
            {footer}
          </footer>
        )}
      </div>
    );
  }
);
PageLayout.displayName = "PageLayout";

// Dashboard Layout
export interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
}

const DashboardLayout = React.forwardRef<HTMLDivElement, DashboardLayoutProps>(
  ({ className, header, sidebar, breadcrumb, actions, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex h-screen bg-background", className)}
        {...props}
      >
        {/* Sidebar */}
        {sidebar && (
          <aside className="w-64 border-r bg-muted/10">
            {sidebar}
          </aside>
        )}

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          {header && (
            <header className="border-b bg-background px-6 py-4">
              {header}
            </header>
          )}

          {/* Breadcrumb & Actions */}
          {(breadcrumb || actions) && (
            <div className="flex items-center justify-between border-b bg-background px-6 py-3">
              <div className="flex items-center space-x-4">
                {breadcrumb}
              </div>
              {actions && (
                <div className="flex items-center space-x-2">
                  {actions}
                </div>
              )}
            </div>
          )}

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    );
  }
);
DashboardLayout.displayName = "DashboardLayout";

// Hook para layout responsivo
export function useLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = React.useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = React.useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const openSidebar = React.useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  return {
    isSidebarOpen,
    isMobile,
    toggleSidebar,
    closeSidebar,
    openSidebar,
  };
}

export {
  Container,
  Grid,
  GridItem,
  Flex,
  Stack,
  Center,
  Spacer,
  Section,
  PageLayout,
  DashboardLayout,
  containerVariants,
  gridVariants,
  gridItemVariants,
  flexVariants,
  sectionVariants,
};
