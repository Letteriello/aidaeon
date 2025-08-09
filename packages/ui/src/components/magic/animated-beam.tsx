"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "../../lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: React.RefObject<HTMLElement>;
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam = forwardRef<SVGSVGElement, AnimatedBeamProps>(
  (
    {
      className,
      containerRef,
      fromRef,
      toRef,
      curvature = 0,
      reverse = false,
      duration = Math.random() * 3 + 4,
      delay = 0,
      pathColor = "gray",
      pathWidth = 2,
      pathOpacity = 0.2,
      gradientStartColor = "#ffaa40",
      gradientStopColor = "#9c40ff",
      startXOffset = 0,
      startYOffset = 0,
      endXOffset = 0,
      endYOffset = 0,
    },
    ref
  ) => {
    const id = React.useId();
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    React.useEffect(() => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const resizeObserver = new ResizeObserver(() => {
          // Trigger re-render when container resizes
          if (svgRef.current) {
            svgRef.current.style.display = "none";
            svgRef.current.getBoundingClientRect(); // Trigger reflow
            svgRef.current.style.display = "block";
          }
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
      }
      return undefined;
    }, [containerRef, fromRef, toRef]);

    React.useEffect(() => {
      const updatePath = () => {
        if (
          containerRef.current &&
          fromRef.current &&
          toRef.current &&
          svgRef.current
        ) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const rectA = fromRef.current.getBoundingClientRect();
          const rectB = toRef.current.getBoundingClientRect();

          const svgWidth = containerRect.width;
          const svgHeight = containerRect.height;
          svgRef.current.setAttribute("width", svgWidth.toString());
          svgRef.current.setAttribute("height", svgHeight.toString());

          const startX =
            rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
          const startY =
            rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
          const endX =
            rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
          const endY =
            rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

          const controlPointX = startX + (endX - startX) / 2;
          const controlPointY = startY - curvature;

          const d = `M ${startX},${startY} Q ${controlPointX},${controlPointY} ${endX},${endY}`;
          pathRef.current?.setAttribute("d", d);
        }
      };

      // Call once to set initial path
      updatePath();

      // Set up interval to update path (for dynamic updates)
      const intervalId = setInterval(updatePath, 10);
      return () => clearInterval(intervalId);
    }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

    return (
      <svg
        ref={svgRef}
        className={cn(
          "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
          className
        )}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            className={cn("transform-gpu")}
            id={id}
            gradientUnits="userSpaceOnUse"
            gradientTransform={reverse ? "rotate(180)" : ""}
          >
            <stop stopColor={gradientStartColor} stopOpacity="0" />
            <stop stopColor={gradientStartColor} />
            <stop offset="32.5%" stopColor={gradientStopColor} />
            <stop
              offset="100%"
              stopColor={gradientStopColor}
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d=""
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeOpacity={pathOpacity}
          fill="none"
        />
        <path
          d=""
          stroke={`url(#${id})`}
          strokeWidth={pathWidth}
          fill="none"
          strokeDasharray="5 5"
          style={{
            strokeDashoffset: reverse ? "-10" : "10",
            animation: `lineMove ${duration}s ease-in-out ${delay}s infinite`,
          }}
        />
        <style jsx>{`
          @keyframes lineMove {
            0% {
              stroke-dashoffset: ${reverse ? "-10" : "10"};
            }
            100% {
              stroke-dashoffset: ${reverse ? "10" : "-10"};
            }
          }
        `}</style>
      </svg>
    );
  }
);

AnimatedBeam.displayName = "AnimatedBeam";

export default AnimatedBeam;
