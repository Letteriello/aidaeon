"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

// Breadcrumb Components
const breadcrumbVariants = cva(
  "flex items-center space-x-1 text-sm text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  separator?: React.ReactNode;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, size, separator = "/", ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cn(breadcrumbVariants({ size }), className)}
        {...props}
      />
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn("flex items-center space-x-2", className)}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("flex items-center space-x-2", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
  }
>(({ asChild = false, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn(
        "transition-colors hover:text-foreground",
        className
      )}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ children, className, ...props }, ref) => (
  <li
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
));
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// Navigation Menu Components
const navigationMenuVariants = cva(
  "relative z-10 flex max-w-max flex-1 items-center justify-center",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

export interface NavigationMenuProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navigationMenuVariants> {}

const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(
  ({ className, orientation, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(navigationMenuVariants({ orientation }), className)}
        {...props}
      >
        {children}
      </nav>
    );
  }
);
NavigationMenu.displayName = "NavigationMenu";

const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = "NavigationMenuList";

const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("relative", className)} {...props} />
));
NavigationMenuItem.displayName = "NavigationMenuItem";

const navigationMenuTriggerVariants = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
  {
    variants: {
      variant: {
        default: "",
        ghost: "bg-transparent hover:bg-accent",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface NavigationMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navigationMenuTriggerVariants> {
  asChild?: boolean;
}

const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  ({ className, children, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        ref={ref}
        className={cn(navigationMenuTriggerVariants({ variant }), "group", className)}
        {...props}
      >
        {children}
        <ChevronDown
          className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </Comp>
    );
  }
);
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = "NavigationMenuContent";

const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
    active?: boolean;
  }
>(({ asChild = false, className, active, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        active && "bg-accent text-accent-foreground",
        className
      )}
      {...props}
    />
  );
});
NavigationMenuLink.displayName = "NavigationMenuLink";

// Mobile Navigation Components
export interface MobileNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onToggle: () => void;
  trigger?: React.ReactNode;
}

const MobileNavigation = React.forwardRef<HTMLDivElement, MobileNavigationProps>(
  ({ className, isOpen, onToggle, trigger, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("md:hidden", className)} {...props}>
        {/* Trigger */}
        <button
          onClick={onToggle}
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          {trigger || (isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />)}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute inset-x-0 top-full z-50 mt-2 origin-top-right transform bg-background shadow-lg ring-1 ring-black ring-opacity-5 transition">
            <div className="px-2 pb-3 pt-2 space-y-1">
              {children}
            </div>
          </div>
        )}
      </div>
    );
  }
);
MobileNavigation.displayName = "MobileNavigation";

const MobileNavigationItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
    active?: boolean;
  }
>(({ asChild = false, className, active, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn(
        "block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        active && "bg-accent text-accent-foreground",
        className
      )}
      {...props}
    />
  );
});
MobileNavigationItem.displayName = "MobileNavigationItem";

// Sidebar Navigation Components
const sidebarVariants = cva(
  "flex h-full flex-col border-r bg-background",
  {
    variants: {
      width: {
        sm: "w-48",
        default: "w-64",
        lg: "w-80",
      },
      collapsible: {
        true: "transition-all duration-300 ease-in-out",
        false: "",
      },
    },
    defaultVariants: {
      width: "default",
      collapsible: false,
    },
  }
);

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  collapsed?: boolean;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, width, collapsible, collapsed, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          sidebarVariants({ width, collapsible }),
          collapsed && collapsible && "w-16",
          className
        )}
        {...props}
      />
    );
  }
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-16 items-center border-b px-6", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto py-4", className)}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-t p-4", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

const SidebarNav = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("space-y-1 px-3", className)}
    {...props}
  />
));
SidebarNav.displayName = "SidebarNav";

const SidebarNavItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
    active?: boolean;
    icon?: React.ReactNode;
    collapsed?: boolean;
  }
>(({ asChild = false, className, active, icon, collapsed, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        active && "bg-accent text-accent-foreground",
        collapsed && "justify-center px-2",
        className
      )}
      {...props}
    >
      {icon && (
        <span className={cn("flex-shrink-0", collapsed && "h-5 w-5")}>
          {icon}
        </span>
      )}
      {!collapsed && children}
    </Comp>
  );
});
SidebarNavItem.displayName = "SidebarNavItem";

// Hook para navegação
export function useNavigation() {
  const [activeItem, setActiveItem] = React.useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const setActive = React.useCallback((item: string) => {
    setActiveItem(item);
  }, []);

  const toggleMobile = React.useCallback(() => {
    setIsMobileOpen(prev => !prev);
  }, []);

  const toggleSidebar = React.useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  const closeMobile = React.useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return {
    activeItem,
    isMobileOpen,
    isSidebarCollapsed,
    setActive,
    toggleMobile,
    toggleSidebar,
    closeMobile,
  };
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  MobileNavigation,
  MobileNavigationItem,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
  breadcrumbVariants,
  navigationMenuVariants,
  navigationMenuTriggerVariants,
  sidebarVariants,
};
