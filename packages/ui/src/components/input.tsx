"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff, Search, X, Check, AlertCircle } from "lucide-react";
import { cn } from "../lib/utils";

// Base Input Component
const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        default: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
      variant: {
        default: "border-input",
        ghost: "border-0 bg-transparent",
        filled: "bg-muted border-0",
      },
      state: {
        default: "",
        error: "border-red-500 focus-visible:ring-red-500",
        success: "border-green-500 focus-visible:ring-green-500",
        warning: "border-yellow-500 focus-visible:ring-yellow-500",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      state: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  warning?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    size, 
    variant, 
    state, 
    label, 
    description, 
    error, 
    success, 
    warning,
    leftIcon,
    rightIcon,
    loading,
    ...props 
  }, ref) => {
    // Determine state based on props
    const currentState = error ? "error" : success ? "success" : warning ? "warning" : state;
    const message = error || success || warning;

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ size, variant, state: currentState }),
              leftIcon && "pl-10",
              (rightIcon || loading) && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          {(rightIcon || loading) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
              ) : (
                rightIcon
              )}
            </div>
          )}
        </div>
        {description && !message && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {message && (
          <p className={cn(
            "text-sm flex items-center gap-1",
            error && "text-red-600",
            success && "text-green-600",
            warning && "text-yellow-600"
          )}>
            {error && <AlertCircle className="h-4 w-4" />}
            {success && <Check className="h-4 w-4" />}
            {warning && <AlertCircle className="h-4 w-4" />}
            {message}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// Password Input Component
export interface PasswordInputProps extends Omit<InputProps, 'type' | 'rightIcon'> {
  showToggle?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePassword = () => setShowPassword(prev => !prev);

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        rightIcon={
          showToggle ? (
            <button
              type="button"
              onClick={togglePassword}
              className="hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          ) : undefined
        }
        {...props}
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";

// Search Input Component
export interface SearchInputProps extends Omit<InputProps, 'type' | 'leftIcon'> {
  onClear?: () => void;
  showClearButton?: boolean;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, showClearButton = true, value, ...props }, ref) => {
    const handleClear = () => {
      onClear?.();
    };

    const showClear = showClearButton && value;

    return (
      <Input
        ref={ref}
        type="search"
        leftIcon={<Search className="h-4 w-4" />}
        rightIcon={
          showClear ? (
            <button
              type="button"
              onClick={handleClear}
              className="hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          ) : undefined
        }
        value={value}
        {...props}
      />
    );
  }
);
SearchInput.displayName = "SearchInput";

// Textarea Component
const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "min-h-[60px] px-2 py-1 text-xs",
        default: "min-h-[80px] px-3 py-2 text-sm",
        lg: "min-h-[120px] px-4 py-3 text-base",
      },
      variant: {
        default: "border-input",
        ghost: "border-0 bg-transparent",
        filled: "bg-muted border-0",
      },
      state: {
        default: "",
        error: "border-red-500 focus-visible:ring-red-500",
        success: "border-green-500 focus-visible:ring-green-500",
        warning: "border-yellow-500 focus-visible:ring-yellow-500",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      state: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  warning?: string;
  showCharCount?: boolean;
  maxLength?: number;
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    size, 
    variant, 
    state, 
    label, 
    description, 
    error, 
    success, 
    warning,
    showCharCount,
    maxLength,
    autoResize,
    value,
    onChange,
    ...props 
  }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const currentState = error ? "error" : success ? "success" : warning ? "warning" : state;
    const message = error || success || warning;
    const charCount = typeof value === 'string' ? value.length : 0;

    // Auto resize functionality
    React.useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [value, autoResize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
      if (autoResize) {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <textarea
          className={cn(textareaVariants({ size, variant, state: currentState }), className)}
          ref={(node) => {
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            textareaRef.current = node;
          }}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />
        <div className="flex justify-between items-center">
          <div>
            {description && !message && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            {message && (
              <p className={cn(
                "text-sm flex items-center gap-1",
                error && "text-red-600",
                success && "text-green-600",
                warning && "text-yellow-600"
              )}>
                {error && <AlertCircle className="h-4 w-4" />}
                {success && <Check className="h-4 w-4" />}
                {warning && <AlertCircle className="h-4 w-4" />}
                {message}
              </p>
            )}
          </div>
          {(showCharCount || maxLength) && (
            <p className={cn(
              "text-sm text-muted-foreground",
              maxLength && charCount > maxLength * 0.9 && "text-yellow-600",
              maxLength && charCount >= maxLength && "text-red-600"
            )}>
              {charCount}{maxLength && `/${maxLength}`}
            </p>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// Input Group Component
export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  spacing?: "sm" | "default" | "lg";
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, children, orientation = "vertical", spacing = "default", ...props }, ref) => {
    const spacingClasses = {
      sm: orientation === "vertical" ? "space-y-2" : "space-x-2",
      default: orientation === "vertical" ? "space-y-4" : "space-x-4",
      lg: orientation === "vertical" ? "space-y-6" : "space-x-6",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-col" : "flex-row items-end",
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
InputGroup.displayName = "InputGroup";

// File Input Component
export interface FileInputProps extends Omit<InputProps, 'type'> {
  accept?: string;
  multiple?: boolean;
  onFileChange?: (files: FileList | null) => void;
  dragAndDrop?: boolean;
  maxSize?: number; // in bytes
  allowedTypes?: string[];
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ 
    className,
    accept,
    multiple,
    onFileChange,
    dragAndDrop = true,
    maxSize,
    allowedTypes,
    error,
    ...props 
  }, ref) => {
    const [isDragOver, setIsDragOver] = React.useState(false);
    const [fileError, setFileError] = React.useState<string>("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const validateFile = (file: File): string | null => {
      if (maxSize && file.size > maxSize) {
        return `Arquivo muito grande. Tamanho máximo: ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
      }
      
      if (allowedTypes && !allowedTypes.includes(file.type)) {
        return `Tipo de arquivo não permitido. Tipos aceitos: ${allowedTypes.join(', ')}`;
      }
      
      return null;
    };

    const handleFileChange = (files: FileList | null) => {
      setFileError("");
      
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const error = validateFile(files[i]);
          if (error) {
            setFileError(error);
            return;
          }
        }
      }
      
      onFileChange?.(files);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFileChange(e.dataTransfer.files);
    };

    const handleClick = () => {
      inputRef.current?.click();
    };

    if (dragAndDrop) {
      return (
        <div className="space-y-2">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
              isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25",
              "hover:border-primary hover:bg-primary/5"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <input
              ref={(node) => {
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
                inputRef.current = node;
              }}
              type="file"
              className="hidden"
              accept={accept}
              multiple={multiple}
              onChange={(e) => handleFileChange(e.target.files)}
              {...props}
            />
            <div className="space-y-2">
              <div className="text-muted-foreground">
                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Clique para fazer upload ou arraste arquivos aqui</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {accept && `Formatos aceitos: ${accept}`}
                  {maxSize && ` • Tamanho máximo: ${(maxSize / 1024 / 1024).toFixed(1)}MB`}
                </p>
              </div>
            </div>
          </div>
          {(error || fileError) && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {error || fileError}
            </p>
          )}
        </div>
      );
    }

    return (
      <Input
        ref={ref}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFileChange(e.target.files)}
        error={error || fileError}
        className={className}
        {...props}
      />
    );
  }
);
FileInput.displayName = "FileInput";

export {
  Input,
  PasswordInput,
  SearchInput,
  Textarea,
  InputGroup,
  FileInput,
  inputVariants,
  textareaVariants,
};
