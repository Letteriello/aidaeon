"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import type {
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { cn } from "../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const formItemVariants = cva(
  "space-y-2",
  {
    variants: {
      variant: {
        default: "",
        inline: "flex items-center space-y-0 space-x-3",
        stacked: "space-y-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface FormItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formItemVariants> {}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, variant, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={cn(formItemVariants({ variant }), className)}
          {...props}
        />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean;
    optional?: boolean;
  }
>(({ className, required, optional, children, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        error && "text-destructive",
        className
      )}
      htmlFor={formItemId}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-destructive">*</span>}
      {optional && <span className="ml-1 text-muted-foreground">(optional)</span>}
    </label>
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const formMessageVariants = cva(
  "text-sm font-medium flex items-center gap-2",
  {
    variants: {
      variant: {
        destructive: "text-destructive",
        warning: "text-yellow-600",
        success: "text-green-600",
        info: "text-blue-600",
      },
    },
    defaultVariants: {
      variant: "destructive",
    },
  }
);

export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof formMessageVariants> {
  message?: string;
  showIcon?: boolean;
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, variant, message, showIcon = true, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children || message;

    if (!body) {
      return null;
    }

    const getIcon = () => {
      if (!showIcon) return null;
      
      switch (variant) {
        case "success":
          return <CheckCircle2 className="h-4 w-4" />;
        case "warning":
          return <AlertCircle className="h-4 w-4" />;
        case "info":
          return <Info className="h-4 w-4" />;
        default:
          return <AlertCircle className="h-4 w-4" />;
      }
    };

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn(formMessageVariants({ variant: error ? "destructive" : variant }), className)}
        {...props}
      >
        {getIcon()}
        {body}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";

// Componente de grupo de campos
export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, title, description, collapsible, defaultCollapsed, children, ...props }, ref) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed || false);

    return (
      <div
        ref={ref}
        className={cn("space-y-4 rounded-lg border p-4", className)}
        {...props}
      >
        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{title}</h3>
                {collapsible && (
                  <button
                    type="button"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {isCollapsed ? "Expand" : "Collapse"}
                  </button>
                )}
              </div>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        {(!collapsible || !isCollapsed) && (
          <div className="space-y-4">{children}</div>
        )}
      </div>
    );
  }
);
FormGroup.displayName = "FormGroup";

// Componente de seção de formulário
export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ className, title, subtitle, icon, actions, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-6", className)}
        {...props}
      >
        {(title || subtitle || icon || actions) && (
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {icon && (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  {icon}
                </div>
              )}
              <div className="space-y-1">
                {title && (
                  <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                )}
                {subtitle && (
                  <p className="text-muted-foreground">{subtitle}</p>
                )}
              </div>
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        )}
        <div className="space-y-6">{children}</div>
      </div>
    );
  }
);
FormSection.displayName = "FormSection";

// Hook para validação de formulário
export function useFormValidation() {
  const { formState, trigger, clearErrors, setError } = useFormContext();
  
  const validateField = React.useCallback(async (fieldName: string) => {
    return await trigger(fieldName);
  }, [trigger]);
  
  const validateForm = React.useCallback(async () => {
    return await trigger();
  }, [trigger]);
  
  const clearFieldError = React.useCallback((fieldName: string) => {
    clearErrors(fieldName);
  }, [clearErrors]);
  
  const setFieldError = React.useCallback((fieldName: string, error: { message: string }) => {
    setError(fieldName, error);
  }, [setError]);
  
  return {
    isValid: formState.isValid,
    isValidating: formState.isValidating,
    errors: formState.errors,
    validateField,
    validateForm,
    clearFieldError,
    setFieldError,
  };
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormGroup,
  FormSection,
  formItemVariants,
  formMessageVariants,
};
