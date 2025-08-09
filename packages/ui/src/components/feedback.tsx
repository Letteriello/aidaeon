"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

// Progress Component
const progressVariants = cva(
  "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        sm: "h-2",
        default: "h-4",
        lg: "h-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  showLabel?: boolean;
  color?: "default" | "success" | "warning" | "error";
  striped?: boolean;
  animated?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    size, 
    showLabel = false,
    color = "default",
    striped = false,
    animated = false,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const colorClasses = {
      default: "bg-primary",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      error: "bg-red-500",
    };

    return (
      <div className="space-y-2">
        {showLabel && (
          <div className="flex justify-between text-sm">
            <span>Progresso</span>
            <span>{Math.round(percentage)}%</span>
          </div>
        )}
        <div
          ref={ref}
          className={cn(progressVariants({ size }), className)}
          {...props}
        >
          <div
            className={cn(
              "h-full w-full flex-1 transition-all duration-300 ease-in-out",
              colorClasses[color],
              striped && "bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_20px]",
              animated && striped && "animate-pulse"
            )}
            style={{
              transform: `translateX(-${100 - percentage}%)`,
            }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

// Circular Progress Component
export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  color?: "default" | "success" | "warning" | "error";
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    size = 120,
    strokeWidth = 8,
    showLabel = false,
    color = "default",
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    const colorClasses = {
      default: "stroke-primary",
      success: "stroke-green-500",
      warning: "stroke-yellow-500",
      error: "stroke-red-500",
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-muted"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn("transition-all duration-300 ease-in-out", colorClasses[color])}
          />
        </svg>
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium">{Math.round(percentage)}%</span>
          </div>
        )}
      </div>
    );
  }
);
CircularProgress.displayName = "CircularProgress";

// Skeleton Component
const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted",
  {
    variants: {
      variant: {
        default: "bg-muted",
        shimmer: "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-[shimmer_2s_infinite]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width, height, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        style={{
          width,
          height,
          ...style,
        }}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

// Skeleton Group Component
export interface SkeletonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  avatar?: boolean;
  button?: boolean;
}

const SkeletonGroup = React.forwardRef<HTMLDivElement, SkeletonGroupProps>(
  ({ className, lines = 3, avatar = false, button = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-3", className)}
        {...props}
      >
        {avatar && (
          <div className="flex items-center space-x-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-4"
              style={{
                width: index === lines - 1 ? '60%' : '100%',
              }}
            />
          ))}
        </div>
        
        {button && (
          <Skeleton className="h-10 w-24" />
        )}
      </div>
    );
  }
);
SkeletonGroup.displayName = "SkeletonGroup";

// Spinner Component
const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        default: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
      variant: {
        default: "text-primary",
        secondary: "text-secondary",
        muted: "text-muted-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <div className={cn(spinnerVariants({ size, variant }))} />
        {label && (
          <span className="ml-2 text-sm text-muted-foreground">{label}</span>
        )}
      </div>
    );
  }
);
Spinner.displayName = "Spinner";

// Loading Overlay Component
export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
  text?: string;
  spinnerSize?: "xs" | "sm" | "default" | "lg" | "xl";
}

const LoadingOverlay = React.forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ className, loading = false, text = "Carregando...", spinnerSize = "lg", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        {children}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center space-y-4">
              <Spinner size={spinnerSize} />
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
);
LoadingOverlay.displayName = "LoadingOverlay";

// Status Indicator Component
const statusVariants = cva(
  "inline-flex items-center gap-2 text-sm font-medium",
  {
    variants: {
      status: {
        success: "text-green-600",
        warning: "text-yellow-600",
        error: "text-red-600",
        info: "text-blue-600",
        loading: "text-muted-foreground",
      },
    },
    defaultVariants: {
      status: "info",
    },
  }
);

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {
  text?: string;
  showIcon?: boolean;
}

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ className, status, text, showIcon = true, ...props }, ref) => {
    const icons = {
      success: CheckCircle,
      warning: AlertTriangle,
      error: AlertCircle,
      info: Info,
      loading: Loader2,
    };

    const Icon = status ? icons[status] : Info;

    return (
      <div
        ref={ref}
        className={cn(statusVariants({ status }), className)}
        {...props}
      >
        {showIcon && (
          <Icon className={cn(
            "h-4 w-4",
            status === "loading" && "animate-spin"
          )} />
        )}
        {text}
      </div>
    );
  }
);
StatusIndicator.displayName = "StatusIndicator";

// Error Boundary Component
export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const Fallback = this.props.fallback;
        return <Fallback error={this.state.error!} resetError={this.resetError} />;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Algo deu errado</h2>
            <p className="text-sm text-muted-foreground">
              Ocorreu um erro inesperado. Tente recarregar a página.
            </p>
          </div>
          <button
            onClick={this.resetError}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for loading states
export function useLoading(initialState = false) {
  const [loading, setLoading] = React.useState(initialState);
  const [error, setError] = React.useState<Error | null>(null);

  const startLoading = React.useCallback(() => {
    setLoading(true);
    setError(null);
  }, []);

  const stopLoading = React.useCallback(() => {
    setLoading(false);
  }, []);

  const setLoadingError = React.useCallback((error: Error) => {
    setLoading(false);
    setError(error);
  }, []);

  const reset = React.useCallback(() => {
    setLoading(false);
    setError(null);
  }, []);

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setError: setLoadingError,
    reset,
  };
}

export {
  Progress,
  CircularProgress,
  Skeleton,
  SkeletonGroup,
  Spinner,
  LoadingOverlay,
  StatusIndicator,
  ErrorBoundary,
  progressVariants,
  skeletonVariants,
  spinnerVariants,
  statusVariants,
};
