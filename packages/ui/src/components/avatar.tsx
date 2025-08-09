"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { User } from "lucide-react";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        default: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
        "3xl": "h-24 w-24",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-lg",
        rounded: "rounded-md",
      },
      border: {
        none: "",
        thin: "ring-2 ring-background",
        thick: "ring-4 ring-background",
        colored: "ring-2 ring-primary",
      },
    },
    defaultVariants: {
      size: "default",
      shape: "circle",
      border: "none",
    },
  }
);

const avatarImageVariants = cva(
  "aspect-square h-full w-full object-cover",
  {
    variants: {
      shape: {
        circle: "rounded-full",
        square: "rounded-lg",
        rounded: "rounded-md",
      },
    },
    defaultVariants: {
      shape: "circle",
    },
  }
);

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center bg-muted text-muted-foreground font-medium",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
        xl: "text-lg",
        "2xl": "text-xl",
        "3xl": "text-2xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-lg",
        rounded: "rounded-md",
      },
    },
    defaultVariants: {
      size: "default",
      shape: "circle",
    },
  }
);

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  showFallbackIcon?: boolean;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, shape, border, src, alt, fallback, showFallbackIcon = true, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, shape, border }), className)}
    {...props}
  >
    {src && (
      <AvatarPrimitive.Image
        src={src}
        alt={alt}
        className={avatarImageVariants({ shape })}
      />
    )}
    <AvatarPrimitive.Fallback
      className={avatarFallbackVariants({ size, shape })}
    >
      {fallback || (showFallbackIcon && <User className="h-1/2 w-1/2" />)}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

// Avatar com status indicator
export interface StatusAvatarProps extends AvatarProps {
  status?: 'online' | 'offline' | 'away' | 'busy';
  showStatus?: boolean;
}

const StatusAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  StatusAvatarProps
>(({ status, showStatus = true, className, ...props }, ref) => {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  return (
    <div className="relative inline-block">
      <Avatar ref={ref} className={className} {...props} />
      {showStatus && status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white",
            statusColors[status]
          )}
        />
      )}
    </div>
  );
});
StatusAvatar.displayName = "StatusAvatar";

// Avatar com badge de notificação
export interface NotificationAvatarProps extends AvatarProps {
  notificationCount?: number;
  showNotification?: boolean;
  maxCount?: number;
}

const NotificationAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  NotificationAvatarProps
>(({ notificationCount = 0, showNotification = true, maxCount = 99, className, ...props }, ref) => {
  const displayCount = notificationCount > maxCount ? `${maxCount}+` : notificationCount.toString();
  const shouldShowBadge = showNotification && notificationCount > 0;

  return (
    <div className="relative inline-block">
      <Avatar ref={ref} className={className} {...props} />
      {shouldShowBadge && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white ring-2 ring-white">
          {notificationCount > 9 ? '9+' : notificationCount}
        </span>
      )}
    </div>
  );
});
NotificationAvatar.displayName = "NotificationAvatar";

// Avatar Group para múltiplos avatares
export interface AvatarGroupProps {
  avatars: (AvatarProps & { id: string })[];
  max?: number;
  size?: VariantProps<typeof avatarVariants>['size'];
  shape?: VariantProps<typeof avatarVariants>['shape'];
  className?: string;
  spacing?: 'tight' | 'normal' | 'loose';
}

const AvatarGroup = ({
  avatars,
  max = 5,
  size = 'default',
  shape = 'circle',
  className,
  spacing = 'normal',
}: AvatarGroupProps) => {
  const visibleAvatars = avatars.slice(0, max);
  const hiddenCount = avatars.length - max;

  const spacingClasses = {
    tight: '-space-x-1',
    normal: '-space-x-2',
    loose: '-space-x-1',
  };

  return (
    <div className={cn("flex items-center", spacingClasses[spacing], className)}>
      {visibleAvatars.map(({ id, ...avatarProps }) => (
        <Avatar
          key={id}
          size={size}
          shape={shape}
          border="thin"
          {...avatarProps}
        />
      ))}
      {hiddenCount > 0 && (
        <Avatar
          size={size}
          shape={shape}
          border="thin"
          fallback={`+${hiddenCount}`}
          className="bg-muted"
        />
      )}
    </div>
  );
};

// Avatar editável
export interface EditableAvatarProps extends AvatarProps {
  onImageChange?: (file: File) => void;
  editable?: boolean;
  uploadText?: string;
}

const EditableAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  EditableAvatarProps
>(({ onImageChange, editable = true, uploadText = "Change photo", className, ...props }, ref) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file);
    }
  };

  return (
    <div className="group relative inline-block">
      <Avatar
        ref={ref}
        className={cn(
          editable && "cursor-pointer transition-opacity group-hover:opacity-75",
          className
        )}
        onClick={handleClick}
        {...props}
      />
      {editable && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            {uploadText}
          </div>
        </>
      )}
    </div>
  );
});
EditableAvatar.displayName = "EditableAvatar";

// Avatar com iniciais automáticas
export interface InitialsAvatarProps extends Omit<AvatarProps, 'fallback'> {
  name: string;
  maxInitials?: number;
}

const InitialsAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  InitialsAvatarProps
>(({ name, maxInitials = 2, ...props }, ref) => {
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .slice(0, maxInitials)
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <Avatar
      ref={ref}
      fallback={getInitials(name)}
      {...props}
    />
  );
});
InitialsAvatar.displayName = "InitialsAvatar";

// Avatar com loading state
export interface LoadingAvatarProps extends AvatarProps {
  loading?: boolean;
}

const LoadingAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  LoadingAvatarProps
>(({ loading = false, className, ...props }, ref) => {
  if (loading) {
    return (
      <div
        className={cn(
          avatarVariants({ size: props.size, shape: props.shape, border: props.border }),
          "animate-pulse bg-muted",
          className
        )}
      />
    );
  }

  return <Avatar ref={ref} className={className} {...props} />;
});
LoadingAvatar.displayName = "LoadingAvatar";

export {
  Avatar,
  StatusAvatar,
  NotificationAvatar,
  AvatarGroup,
  EditableAvatar,
  InitialsAvatar,
  LoadingAvatar,
  avatarVariants,
  avatarImageVariants,
  avatarFallbackVariants,
};
