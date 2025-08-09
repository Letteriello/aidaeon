import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { X } from "lucide-react";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        success:
          "border-transparent bg-green-500 text-white hover:bg-green-500/80",
        warning:
          "border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80",
        info:
          "border-transparent bg-blue-500 text-white hover:bg-blue-500/80",
        outline: "text-foreground",
        ghost: "border-transparent bg-transparent text-foreground hover:bg-accent",
      },
      size: {
        sm: "px-1.5 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-1.5 text-base",
      },
      shape: {
        default: "rounded-full",
        rounded: "rounded-md",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  disabled?: boolean;
}

function Badge({
  className,
  variant,
  size,
  shape,
  icon,
  removable = false,
  onRemove,
  disabled = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant, size, shape }),
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="mr-1 flex items-center">
          {icon}
        </span>
      )}
      {children}
      {removable && !disabled && (
        <button
          type="button"
          className="ml-1 flex items-center justify-center rounded-full hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-white/20"
          onClick={onRemove}
          aria-label="Remove badge"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

// Badge com contador
export interface CountBadgeProps extends Omit<BadgeProps, 'children'> {
  count: number;
  max?: number;
  showZero?: boolean;
}

function CountBadge({
  count,
  max = 99,
  showZero = false,
  ...badgeProps
}: CountBadgeProps) {
  if (count === 0 && !showZero) {
    return null;
  }

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <Badge {...badgeProps}>
      {displayCount}
    </Badge>
  );
}

// Badge de status
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  status: 'online' | 'offline' | 'away' | 'busy' | 'idle';
  showText?: boolean;
}

function StatusBadge({
  status,
  showText = true,
  ...badgeProps
}: StatusBadgeProps) {
  const statusConfig = {
    online: { variant: 'success' as const, text: 'Online', color: 'bg-green-500' },
    offline: { variant: 'secondary' as const, text: 'Offline', color: 'bg-gray-500' },
    away: { variant: 'warning' as const, text: 'Away', color: 'bg-yellow-500' },
    busy: { variant: 'destructive' as const, text: 'Busy', color: 'bg-red-500' },
    idle: { variant: 'info' as const, text: 'Idle', color: 'bg-blue-500' },
  };

  const config = statusConfig[status];

  return (
    <Badge
      variant={config.variant}
      icon={
        <span className={cn("h-2 w-2 rounded-full", config.color)} />
      }
      {...badgeProps}
    >
      {showText && config.text}
    </Badge>
  );
}

// Badge com dot indicator
export interface DotBadgeProps extends BadgeProps {
  dotColor?: string;
  dotPosition?: 'left' | 'right';
}

function DotBadge({
  dotColor = 'bg-current',
  dotPosition = 'left',
  children,
  ...badgeProps
}: DotBadgeProps) {
  const dot = <span className={cn("h-2 w-2 rounded-full", dotColor)} />;

  return (
    <Badge {...badgeProps}>
      {dotPosition === 'left' && (
        <span className="mr-1.5 flex items-center">
          {dot}
        </span>
      )}
      {children}
      {dotPosition === 'right' && (
        <span className="ml-1.5 flex items-center">
          {dot}
        </span>
      )}
    </Badge>
  );
}

// Badge animado
export interface AnimatedBadgeProps extends BadgeProps {
  pulse?: boolean;
  bounce?: boolean;
  ping?: boolean;
}

function AnimatedBadge({
  pulse = false,
  bounce = false,
  ping = false,
  className,
  ...badgeProps
}: AnimatedBadgeProps) {
  return (
    <Badge
      className={cn(
        pulse && "animate-pulse",
        bounce && "animate-bounce",
        ping && "animate-ping",
        className
      )}
      {...badgeProps}
    />
  );
}

// Badge group para múltiplos badges
export interface BadgeGroupProps {
  badges: (BadgeProps & { id: string; content: React.ReactNode })[];
  max?: number;
  className?: string;
  spacing?: 'tight' | 'normal' | 'loose';
}

function BadgeGroup({
  badges,
  max,
  className,
  spacing = 'normal',
}: BadgeGroupProps) {
  const visibleBadges = max ? badges.slice(0, max) : badges;
  const hiddenCount = max && badges.length > max ? badges.length - max : 0;

  const spacingClasses = {
    tight: 'gap-1',
    normal: 'gap-2',
    loose: 'gap-3',
  };

  return (
    <div className={cn("flex flex-wrap items-center", spacingClasses[spacing], className)}>
      {visibleBadges.map(({ id, content, ...badgeProps }) => (
        <Badge key={id} {...badgeProps}>
          {content}
        </Badge>
      ))}
      {hiddenCount > 0 && (
        <Badge variant="secondary" size="sm">
          +{hiddenCount}
        </Badge>
      )}
    </div>
  );
}

// Badge com tooltip
export interface TooltipBadgeProps extends BadgeProps {
  tooltip?: string;
}

function TooltipBadge({
  tooltip,
  children,
  ...badgeProps
}: TooltipBadgeProps) {
  if (!tooltip) {
    return <Badge {...badgeProps}>{children}</Badge>;
  }

  return (
    <div className="group relative">
      <Badge {...badgeProps}>{children}</Badge>
      <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 transform rounded bg-black px-2 py-1 text-xs text-white group-hover:block">
        {tooltip}
        <div className="absolute top-full left-1/2 -translate-x-1/2 transform border-4 border-transparent border-t-black" />
      </div>
    </div>
  );
}

export {
  Badge,
  CountBadge,
  StatusBadge,
  DotBadge,
  AnimatedBadge,
  BadgeGroup,
  TooltipBadge,
  badgeVariants,
};
