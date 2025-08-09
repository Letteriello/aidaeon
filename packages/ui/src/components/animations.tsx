"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

// Fade Animation Component
const fadeVariants = cva(
  "transition-opacity duration-300 ease-in-out",
  {
    variants: {
      variant: {
        in: "opacity-100",
        out: "opacity-0",
      },
      duration: {
        fast: "duration-150",
        normal: "duration-300",
        slow: "duration-500",
      },
    },
    defaultVariants: {
      variant: "in",
      duration: "normal",
    },
  }
);

export interface FadeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fadeVariants> {
  show?: boolean;
  asChild?: boolean;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(
  ({ className, variant, duration, show = true, asChild = false, children, ...props }, ref) => {
    const [shouldRender, setShouldRender] = React.useState(show);
    const [isVisible, setIsVisible] = React.useState(show);

    React.useEffect(() => {
      if (show) {
        setShouldRender(true);
        // Delay to trigger animation
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
      } else {
        setIsVisible(false);
        // Wait for animation to complete before unmounting
        const timer = setTimeout(() => setShouldRender(false), duration === "fast" ? 150 : duration === "slow" ? 500 : 300);
        return () => clearTimeout(timer);
      }
    }, [show, duration]);

    if (!shouldRender) return null;

    const Comp = asChild ? React.Fragment : "div";
    const content = (
      <div
        ref={ref}
        className={cn(
          fadeVariants({ variant: isVisible ? "in" : "out", duration }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );

    return asChild ? <>{children}</> : content;
  }
);
Fade.displayName = "Fade";

// Slide Animation Component
const slideVariants = cva(
  "transition-transform duration-300 ease-in-out",
  {
    variants: {
      direction: {
        up: "translate-y-0",
        down: "translate-y-0",
        left: "translate-x-0",
        right: "translate-x-0",
      },
      variant: {
        in: "",
        out: "",
      },
      duration: {
        fast: "duration-150",
        normal: "duration-300",
        slow: "duration-500",
      },
    },
    compoundVariants: [
      {
        direction: "up",
        variant: "out",
        class: "-translate-y-full",
      },
      {
        direction: "down",
        variant: "out",
        class: "translate-y-full",
      },
      {
        direction: "left",
        variant: "out",
        class: "-translate-x-full",
      },
      {
        direction: "right",
        variant: "out",
        class: "translate-x-full",
      },
    ],
    defaultVariants: {
      direction: "up",
      variant: "in",
      duration: "normal",
    },
  }
);

export interface SlideProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof slideVariants> {
  show?: boolean;
  asChild?: boolean;
}

const Slide = React.forwardRef<HTMLDivElement, SlideProps>(
  ({ className, direction, variant, duration, show = true, asChild = false, children, ...props }, ref) => {
    const [shouldRender, setShouldRender] = React.useState(show);
    const [isVisible, setIsVisible] = React.useState(show);

    React.useEffect(() => {
      if (show) {
        setShouldRender(true);
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
      } else {
        setIsVisible(false);
        const timer = setTimeout(() => setShouldRender(false), duration === "fast" ? 150 : duration === "slow" ? 500 : 300);
        return () => clearTimeout(timer);
      }
    }, [show, duration]);

    if (!shouldRender) return null;

    const Comp = asChild ? React.Fragment : "div";
    const content = (
      <div
        ref={ref}
        className={cn(
          slideVariants({ 
            direction, 
            variant: isVisible ? "in" : "out", 
            duration 
          }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );

    return asChild ? <>{children}</> : content;
  }
);
Slide.displayName = "Slide";

// Scale Animation Component
const scaleVariants = cva(
  "transition-transform duration-300 ease-in-out",
  {
    variants: {
      variant: {
        in: "scale-100",
        out: "scale-0",
        "zoom-in": "scale-110",
        "zoom-out": "scale-90",
      },
      origin: {
        center: "origin-center",
        top: "origin-top",
        bottom: "origin-bottom",
        left: "origin-left",
        right: "origin-right",
        "top-left": "origin-top-left",
        "top-right": "origin-top-right",
        "bottom-left": "origin-bottom-left",
        "bottom-right": "origin-bottom-right",
      },
      duration: {
        fast: "duration-150",
        normal: "duration-300",
        slow: "duration-500",
      },
    },
    defaultVariants: {
      variant: "in",
      origin: "center",
      duration: "normal",
    },
  }
);

export interface ScaleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof scaleVariants> {
  show?: boolean;
  asChild?: boolean;
}

const Scale = React.forwardRef<HTMLDivElement, ScaleProps>(
  ({ className, variant, origin, duration, show = true, asChild = false, children, ...props }, ref) => {
    const [shouldRender, setShouldRender] = React.useState(show);
    const [isVisible, setIsVisible] = React.useState(show);

    React.useEffect(() => {
      if (show) {
        setShouldRender(true);
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
      } else {
        setIsVisible(false);
        const timer = setTimeout(() => setShouldRender(false), duration === "fast" ? 150 : duration === "slow" ? 500 : 300);
        return () => clearTimeout(timer);
      }
    }, [show, duration]);

    if (!shouldRender) return null;

    const Comp = asChild ? React.Fragment : "div";
    const content = (
      <div
        ref={ref}
        className={cn(
          scaleVariants({ 
            variant: isVisible ? "in" : "out", 
            origin, 
            duration 
          }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );

    return asChild ? <>{children}</> : content;
  }
);
Scale.displayName = "Scale";

// Bounce Animation Component
const bounceVariants = cva(
  "animate-bounce",
  {
    variants: {
      variant: {
        default: "animate-bounce",
        pulse: "animate-pulse",
        ping: "animate-ping",
        spin: "animate-spin",
      },
      duration: {
        fast: "duration-500",
        normal: "duration-1000",
        slow: "duration-2000",
      },
      infinite: {
        true: "animate-infinite",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      duration: "normal",
      infinite: true,
    },
  }
);

export interface BounceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bounceVariants> {
  asChild?: boolean;
}

const Bounce = React.forwardRef<HTMLDivElement, BounceProps>(
  ({ className, variant, duration, infinite, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div";
    const content = (
      <div
        ref={ref}
        className={cn(bounceVariants({ variant, duration, infinite }), className)}
        {...props}
      >
        {children}
      </div>
    );

    return asChild ? <>{children}</> : content;
  }
);
Bounce.displayName = "Bounce";

// Stagger Animation Component
export interface StaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  show?: boolean;
}

const Stagger = React.forwardRef<HTMLDivElement, StaggerProps>(
  ({ className, children, delay = 100, duration = 300, show = true, ...props }, ref) => {
    const [visibleItems, setVisibleItems] = React.useState<number[]>([]);
    const childrenArray = React.Children.toArray(children);

    React.useEffect(() => {
      if (show) {
        childrenArray.forEach((_, index) => {
          setTimeout(() => {
            setVisibleItems(prev => [...prev, index]);
          }, index * delay);
        });
      } else {
        setVisibleItems([]);
      }
    }, [show, delay, childrenArray.length]);

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {childrenArray.map((child, index) => (
          <div
            key={index}
            className={cn(
              "transition-all ease-out",
              `duration-[${duration}ms]`,
              visibleItems.includes(index)
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            )}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }
);
Stagger.displayName = "Stagger";

// Parallax Animation Component
export interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  offset?: number;
  disabled?: boolean;
}

const Parallax = React.forwardRef<HTMLDivElement, ParallaxProps>(
  ({ className, children, speed = 0.5, offset = 0, disabled = false, ...props }, ref) => {
    const [transform, setTransform] = React.useState(0);
    const elementRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => elementRef.current!);

    React.useEffect(() => {
      if (disabled) return;

      const handleScroll = () => {
        if (!elementRef.current) return;

        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        
        setTransform(rate + offset);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [speed, offset, disabled]);

    return (
      <div
        ref={elementRef}
        className={cn("will-change-transform", className)}
        style={{
          transform: disabled ? undefined : `translateY(${transform}px)`,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Parallax.displayName = "Parallax";

// Reveal Animation Component (Intersection Observer)
export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  animation?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale";
  duration?: "fast" | "normal" | "slow";
  delay?: number;
}

const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(
  ({ 
    className, 
    children, 
    threshold = 0.1, 
    rootMargin = "0px", 
    triggerOnce = true,
    animation = "fade",
    duration = "normal",
    delay = 0,
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const elementRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => elementRef.current!);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        },
        { threshold, rootMargin }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce, delay]);

    const getAnimationClasses = () => {
      const durationClass = {
        fast: "duration-300",
        normal: "duration-500",
        slow: "duration-700",
      }[duration];

      const baseClasses = `transition-all ease-out ${durationClass}`;

      switch (animation) {
        case "fade":
          return cn(
            baseClasses,
            isVisible ? "opacity-100" : "opacity-0"
          );
        case "slide-up":
          return cn(
            baseClasses,
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          );
        case "slide-down":
          return cn(
            baseClasses,
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          );
        case "slide-left":
          return cn(
            baseClasses,
            isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          );
        case "slide-right":
          return cn(
            baseClasses,
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          );
        case "scale":
          return cn(
            baseClasses,
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          );
        default:
          return baseClasses;
      }
    };

    return (
      <div
        ref={elementRef}
        className={cn(getAnimationClasses(), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Reveal.displayName = "Reveal";

// Hook para animações
export function useAnimation() {
  const [isAnimating, setIsAnimating] = React.useState(false);

  const animate = React.useCallback((duration: number = 300) => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), duration);
  }, []);

  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return {
    isAnimating,
    animate,
    prefersReducedMotion,
  };
}

export {
  Fade,
  Slide,
  Scale,
  Bounce,
  Stagger,
  Parallax,
  Reveal,
  fadeVariants,
  slideVariants,
  scaleVariants,
  bounceVariants,
};
