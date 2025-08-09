"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const loadingVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "text-primary",
        secondary: "text-secondary",
        muted: "text-muted-foreground",
        destructive: "text-destructive",
      },
      size: {
        sm: "h-4 w-4",
        default: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  type?: "spinner" | "dots" | "pulse" | "bars" | "wave";
  text?: string;
}

const Spinner = ({ className, size }: { className?: string; size?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const Dots = ({ className }: { className?: string }) => (
  <div className={cn("flex space-x-1", className)}>
    <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]"></div>
    <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]"></div>
    <div className="h-2 w-2 animate-bounce rounded-full bg-current"></div>
  </div>
);

const Pulse = ({ className }: { className?: string }) => (
  <div className={cn("relative", className)}>
    <div className="h-4 w-4 animate-ping rounded-full bg-current opacity-75"></div>
    <div className="absolute inset-0 h-4 w-4 rounded-full bg-current"></div>
  </div>
);

const Bars = ({ className }: { className?: string }) => (
  <div className={cn("flex space-x-1", className)}>
    <div className="h-6 w-1 animate-pulse bg-current [animation-delay:-0.4s]"></div>
    <div className="h-6 w-1 animate-pulse bg-current [animation-delay:-0.2s]"></div>
    <div className="h-6 w-1 animate-pulse bg-current"></div>
    <div className="h-6 w-1 animate-pulse bg-current [animation-delay:-0.2s]"></div>
    <div className="h-6 w-1 animate-pulse bg-current [animation-delay:-0.4s]"></div>
  </div>
);

const Wave = ({ className }: { className?: string }) => (
  <div className={cn("flex space-x-1", className)}>
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="h-6 w-1 animate-pulse bg-current"
        style={{
          animationDelay: `${i * 0.1}s`,
          animationDuration: '1s',
        }}
      ></div>
    ))}
  </div>
);

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, variant, size, type = "spinner", text, ...props }, ref) => {
    const renderLoader = () => {
      const loaderClassName = loadingVariants({ variant, size });
      
      switch (type) {
        case "dots":
          return <Dots className={loaderClassName} />;
        case "pulse":
          return <Pulse className={loaderClassName} />;
        case "bars":
          return <Bars className={loaderClassName} />;
        case "wave":
          return <Wave className={loaderClassName} />;
        default:
          return <Spinner className={loaderClassName} />;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center space-y-2",
          className
        )}
        {...props}
      >
        {renderLoader()}
        {text && (
          <p className={cn(
            "text-sm",
            variant === "muted" ? "text-muted-foreground" : "text-foreground"
          )}>
            {text}
          </p>
        )}
      </div>
    );
  }
);

Loading.displayName = "Loading";

// Componente de Loading para páginas inteiras
export interface LoadingPageProps {
  text?: string;
  variant?: "default" | "minimal";
}

const LoadingPage = ({ text = "Carregando...", variant = "default" }: LoadingPageProps) => {
  if (variant === "minimal") {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loading type="spinner" text={text} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <Loading type="spinner" size="xl" className="mb-4" />
        <h2 className="text-lg font-semibold text-foreground">{text}</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Por favor, aguarde um momento...
        </p>
      </div>
    </div>
  );
};

// Componente de Loading para botões
export interface LoadingButtonProps {
  loading?: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
}

const LoadingButton = ({ 
  loading = false, 
  children, 
  loadingText,
  className,
  ...props 
}: LoadingButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center space-x-2 disabled:opacity-50",
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading && <Loading type="spinner" size="sm" />}
      <span>{loading && loadingText ? loadingText : children}</span>
    </button>
  );
};

export { Loading, LoadingPage, LoadingButton, loadingVariants };
