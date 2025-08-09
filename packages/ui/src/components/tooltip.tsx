"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const tooltipVariants = cva(
  "z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        success: "bg-green-600 text-white",
        warning: "bg-yellow-600 text-white",
        info: "bg-blue-600 text-white",
        dark: "bg-gray-900 text-white",
        light: "bg-white text-gray-900 border-gray-200",
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

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipVariants> {
  arrow?: boolean;
  children?: React.ReactNode;
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, variant, size, arrow = true, children, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipVariants({ variant, size }), className)}
    {...props}
  >
    {children}
    {arrow && (
      <TooltipPrimitive.Arrow className="fill-current" />
    )}
  </TooltipPrimitive.Content>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Componente Tooltip simplificado
export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  variant?: "default" | "secondary" | "destructive" | "success" | "warning" | "info" | "dark" | "light";
  size?: "sm" | "default" | "lg";
  delayDuration?: number;
  arrow?: boolean;
  disabled?: boolean;
  className?: string;
}

const Tooltip = ({
  children,
  content,
  side = "top",
  align = "center",
  variant = "default",
  size = "default",
  delayDuration = 400,
  arrow = true,
  disabled = false,
  className,
}: TooltipProps) => {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <TooltipRoot delayDuration={delayDuration}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          variant={variant}
          size={size}
          arrow={arrow}
          className={className}
        >
          {content}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};

// Tooltip com ícone
export interface IconTooltipProps extends Omit<TooltipProps, 'children'> {
  icon: React.ReactNode;
  iconClassName?: string;
}

const IconTooltip = ({
  icon,
  iconClassName,
  content,
  ...tooltipProps
}: IconTooltipProps) => {
  return (
    <Tooltip content={content} {...tooltipProps}>
      <span className={cn("inline-flex items-center justify-center cursor-help", iconClassName)}>
        {icon}
      </span>
    </Tooltip>
  );
};

// Tooltip para botões
export interface ButtonTooltipProps extends Omit<TooltipProps, 'children'> {
  children: React.ReactNode;
  showOnDisabled?: boolean;
}

const ButtonTooltip = ({
  children,
  showOnDisabled = true,
  disabled,
  ...tooltipProps
}: ButtonTooltipProps) => {
  // Se o botão está desabilitado e showOnDisabled é false, não mostra tooltip
  const shouldShowTooltip = !disabled || showOnDisabled;

  return (
    <Tooltip disabled={!shouldShowTooltip} {...tooltipProps}>
      {children}
    </Tooltip>
  );
};

// Tooltip com delay customizado para hover
export interface HoverTooltipProps extends TooltipProps {
  openDelay?: number;
  closeDelay?: number;
}

const HoverTooltip = ({
  children,
  content,
  openDelay = 400,
  closeDelay = 0,
  ...tooltipProps
}: HoverTooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipRoot 
        delayDuration={openDelay}
        disableHoverableContent={closeDelay === 0}
      >
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent {...tooltipProps}>
          {content}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};

// Hook para controlar tooltip programaticamente
export function useTooltip() {
  const [open, setOpen] = React.useState(false);
  
  const showTooltip = React.useCallback(() => setOpen(true), []);
  const hideTooltip = React.useCallback(() => setOpen(false), []);
  const toggleTooltip = React.useCallback(() => setOpen(prev => !prev), []);
  
  return {
    open,
    showTooltip,
    hideTooltip,
    toggleTooltip,
    setOpen,
  };
}

// Tooltip controlado
export interface ControlledTooltipProps extends Omit<TooltipProps, 'delayDuration'> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ControlledTooltip = ({
  children,
  content,
  open,
  onOpenChange,
  ...tooltipProps
}: ControlledTooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipRoot open={open} onOpenChange={onOpenChange}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent {...tooltipProps}>
          {content}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};

export {
  Tooltip,
  IconTooltip,
  ButtonTooltip,
  HoverTooltip,
  ControlledTooltip,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  tooltipVariants,
};
