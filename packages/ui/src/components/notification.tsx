"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "../lib/utils";

// Toast Notification Component
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
        success:
          "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900/20 dark:text-green-100",
        warning:
          "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-100",
        info:
          "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-100",
      },
      size: {
        sm: "p-3 text-sm",
        default: "p-4",
        lg: "p-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  onClose?: () => void;
  duration?: number;
  persistent?: boolean;
  showIcon?: boolean;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ 
    className, 
    variant, 
    size, 
    title, 
    description, 
    action, 
    onClose, 
    duration = 5000,
    persistent = false,
    showIcon = true,
    children,
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
      if (!persistent && duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          onClose?.();
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, persistent, onClose]);

    const getIcon = () => {
      if (!showIcon) return null;
      
      switch (variant) {
        case "success":
          return <CheckCircle className="h-5 w-5 text-green-600" />;
        case "destructive":
          return <AlertCircle className="h-5 w-5 text-red-600" />;
        case "warning":
          return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
        case "info":
          return <Info className="h-5 w-5 text-blue-600" />;
        default:
          return <Info className="h-5 w-5" />;
      }
    };

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant, size }), className)}
        {...props}
      >
        <div className="flex items-start space-x-3">
          {getIcon()}
          <div className="flex-1 space-y-1">
            {title && (
              <div className="font-semibold leading-none tracking-tight">
                {title}
              </div>
            )}
            {description && (
              <div className="text-sm opacity-90">
                {description}
              </div>
            )}
            {children}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {action}
          {onClose && (
            <button
              onClick={() => {
                setIsVisible(false);
                onClose();
              }}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-transparent opacity-50 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);
Toast.displayName = "Toast";

// Notification Banner Component
const bannerVariants = cva(
  "flex w-full items-center justify-between p-4 border-l-4",
  {
    variants: {
      variant: {
        default: "bg-background border-l-border",
        info: "bg-blue-50 border-l-blue-500 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100",
        success: "bg-green-50 border-l-green-500 text-green-900 dark:bg-green-900/20 dark:text-green-100",
        warning: "bg-yellow-50 border-l-yellow-500 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-100",
        destructive: "bg-red-50 border-l-red-500 text-red-900 dark:bg-red-900/20 dark:text-red-100",
      },
      size: {
        sm: "p-2 text-sm",
        default: "p-4",
        lg: "p-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface NotificationBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  onClose?: () => void;
  showIcon?: boolean;
  dismissible?: boolean;
}

const NotificationBanner = React.forwardRef<HTMLDivElement, NotificationBannerProps>(
  ({ 
    className, 
    variant, 
    size, 
    title, 
    description, 
    action, 
    onClose, 
    showIcon = true,
    dismissible = true,
    children,
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const getIcon = () => {
      if (!showIcon) return null;
      
      switch (variant) {
        case "success":
          return <CheckCircle className="h-5 w-5 text-green-600" />;
        case "destructive":
          return <AlertCircle className="h-5 w-5 text-red-600" />;
        case "warning":
          return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
        case "info":
          return <Info className="h-5 w-5 text-blue-600" />;
        default:
          return <Info className="h-5 w-5" />;
      }
    };

    const handleClose = () => {
      setIsVisible(false);
      onClose?.();
    };

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(bannerVariants({ variant, size }), className)}
        {...props}
      >
        <div className="flex items-start space-x-3">
          {getIcon()}
          <div className="flex-1 space-y-1">
            {title && (
              <div className="font-semibold leading-none tracking-tight">
                {title}
              </div>
            )}
            {description && (
              <div className="text-sm opacity-90">
                {description}
              </div>
            )}
            {children}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {action}
          {dismissible && (
            <button
              onClick={handleClose}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-transparent opacity-50 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);
NotificationBanner.displayName = "NotificationBanner";

// Alert Component
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success:
          "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900/20 dark:text-green-100 [&>svg]:text-green-600",
        warning:
          "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-100 [&>svg]:text-yellow-600",
        info:
          "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-100 [&>svg]:text-blue-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  showIcon?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, description, showIcon = true, children, ...props }, ref) => {
    const getIcon = () => {
      if (!showIcon) return null;
      
      switch (variant) {
        case "success":
          return <CheckCircle className="h-4 w-4" />;
        case "destructive":
          return <AlertCircle className="h-4 w-4" />;
        case "warning":
          return <AlertTriangle className="h-4 w-4" />;
        case "info":
          return <Info className="h-4 w-4" />;
        default:
          return <Info className="h-4 w-4" />;
      }
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {getIcon()}
        <div>
          {title && (
            <h5 className="mb-1 font-medium leading-none tracking-tight">
              {title}
            </h5>
          )}
          {description && (
            <div className="text-sm [&_p]:leading-relaxed">
              {description}
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }
);
Alert.displayName = "Alert";

// Toast Provider Context
interface ToastContextType {
  toasts: ToastType[];
  addToast: (toast: Omit<ToastType, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

interface ToastType {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  duration?: number;
  persistent?: boolean;
  action?: React.ReactNode;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
}

export function ToastProvider({ children, maxToasts = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastType[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastType, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts(prev => {
      const updated = [newToast, ...prev];
      return updated.slice(0, maxToasts);
    });
  }, [maxToasts]);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// Toast Container
function ToastContainer() {
  const context = React.useContext(ToastContext);
  if (!context) return null;

  const { toasts, removeToast } = context;

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          duration={toast.duration}
          persistent={toast.persistent}
          action={toast.action}
          onClose={() => removeToast(toast.id)}
          className="mb-2"
        />
      ))}
    </div>
  );
}

// Hook para usar toasts
export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Hook para notificações
export function useNotification() {
  const { addToast } = useToast();

  const notify = React.useCallback({
    success: (title: string, description?: string, options?: Partial<ToastType>) => {
      addToast({ title, description, variant: 'success', ...options });
    },
    error: (title: string, description?: string, options?: Partial<ToastType>) => {
      addToast({ title, description, variant: 'destructive', ...options });
    },
    warning: (title: string, description?: string, options?: Partial<ToastType>) => {
      addToast({ title, description, variant: 'warning', ...options });
    },
    info: (title: string, description?: string, options?: Partial<ToastType>) => {
      addToast({ title, description, variant: 'info', ...options });
    },
    default: (title: string, description?: string, options?: Partial<ToastType>) => {
      addToast({ title, description, variant: 'default', ...options });
    },
  }, [addToast]);

  return notify;
}

export {
  Toast,
  NotificationBanner,
  Alert,
  toastVariants,
  bannerVariants,
  alertVariants,
};
