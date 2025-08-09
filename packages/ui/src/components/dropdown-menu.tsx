"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const dropdownMenuContentVariants = cva(
  "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      size: {
        sm: "min-w-[6rem] p-1",
        default: "min-w-[8rem] p-1",
        lg: "min-w-[12rem] p-2",
        xl: "min-w-[16rem] p-2",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>,
    VariantProps<typeof dropdownMenuContentVariants> {}

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, size, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(dropdownMenuContentVariants({ size }), className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    destructive?: boolean;
  }
>(({ className, inset, destructive, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      destructive && "text-destructive focus:text-destructive",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

// Componente de item com ícone
export interface DropdownMenuItemWithIconProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  icon?: React.ReactNode;
  shortcut?: string;
  destructive?: boolean;
}

const DropdownMenuItemWithIcon = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemWithIconProps
>(({ className, icon, shortcut, destructive, children, ...props }, ref) => (
  <DropdownMenuItem
    ref={ref}
    className={cn(
      "flex items-center gap-2",
      destructive && "text-destructive focus:text-destructive",
      className
    )}
    {...props}
  >
    {icon && <span className="flex h-4 w-4 items-center justify-center">{icon}</span>}
    <span className="flex-1">{children}</span>
    {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
  </DropdownMenuItem>
));
DropdownMenuItemWithIcon.displayName = "DropdownMenuItemWithIcon";

// Dropdown menu com header
export interface DropdownMenuWithHeaderProps {
  trigger: React.ReactNode;
  header?: {
    title?: string;
    description?: string;
    avatar?: React.ReactNode;
  };
  items: Array<{
    type: 'item' | 'separator' | 'label' | 'checkbox' | 'radio';
    label?: string;
    icon?: React.ReactNode;
    shortcut?: string;
    destructive?: boolean;
    checked?: boolean;
    value?: string;
    onClick?: () => void;
    disabled?: boolean;
  }>;
  size?: VariantProps<typeof dropdownMenuContentVariants>['size'];
  className?: string;
}

const DropdownMenuWithHeader = ({
  trigger,
  header,
  items,
  size,
  className,
}: DropdownMenuWithHeaderProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent size={size} className={className}>
        {header && (
          <>
            <div className="flex items-center gap-2 px-2 py-2">
              {header.avatar}
              <div className="flex flex-col">
                {header.title && (
                  <div className="text-sm font-medium">{header.title}</div>
                )}
                {header.description && (
                  <div className="text-xs text-muted-foreground">
                    {header.description}
                  </div>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        {items.map((item, index) => {
          const key = `item-${index}`;
          
          switch (item.type) {
            case 'separator':
              return <DropdownMenuSeparator key={key} />;
            case 'label':
              return (
                <DropdownMenuLabel key={key}>
                  {item.label}
                </DropdownMenuLabel>
              );
            case 'checkbox':
              return (
                <DropdownMenuCheckboxItem
                  key={key}
                  checked={item.checked}
                  onCheckedChange={() => item.onClick?.()}
                  disabled={item.disabled}
                >
                  {item.label}
                </DropdownMenuCheckboxItem>
              );
            case 'radio':
              return (
                <DropdownMenuRadioItem
                  key={key}
                  value={item.value || ''}
                  disabled={item.disabled}
                >
                  {item.label}
                </DropdownMenuRadioItem>
              );
            default:
              return (
                <DropdownMenuItemWithIcon
                  key={key}
                  icon={item.icon}
                  shortcut={item.shortcut}
                  destructive={item.destructive}
                  onClick={item.onClick}
                  disabled={item.disabled}
                >
                  {item.label}
                </DropdownMenuItemWithIcon>
              );
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Hook para controlar dropdown menu
export function useDropdownMenu() {
  const [open, setOpen] = React.useState(false);
  
  const openMenu = React.useCallback(() => setOpen(true), []);
  const closeMenu = React.useCallback(() => setOpen(false), []);
  const toggleMenu = React.useCallback(() => setOpen(prev => !prev), []);
  
  return {
    open,
    openMenu,
    closeMenu,
    toggleMenu,
    setOpen,
  };
}

// Dropdown menu controlado
export interface ControlledDropdownMenuProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

const ControlledDropdownMenu = ({
  children,
  open,
  onOpenChange,
  modal = true,
}: ControlledDropdownMenuProps) => {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange} modal={modal}>
      {children}
    </DropdownMenu>
  );
};

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemWithIcon,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuWithHeader,
  ControlledDropdownMenu,
  dropdownMenuContentVariants,
};
