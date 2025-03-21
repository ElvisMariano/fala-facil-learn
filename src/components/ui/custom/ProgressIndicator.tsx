
import { cn } from "@/lib/utils";
import React from "react";

interface ProgressIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent";
  animated?: boolean;
}

const ProgressIndicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  ({ 
    className, 
    value, 
    max = 100, 
    showValue = false, 
    size = "md", 
    color = "primary",
    animated = true,
    ...props 
  }, ref) => {
    const percentage = Math.round((value / max) * 100);
    
    const sizeClasses = {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-3.5",
    };
    
    const colorClasses = {
      primary: "bg-primary",
      secondary: "bg-secondary",
      accent: "bg-accent",
    };
    
    return (
      <div ref={ref} className={cn("relative w-full overflow-hidden", className)} {...props}>
        <div className="w-full bg-muted rounded-full overflow-hidden" style={{ height: sizeClasses[size] }}>
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-in-out",
              colorClasses[color],
              animated && "animate-pulse-subtle"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showValue && (
          <span className="absolute right-0 -top-6 text-xs font-medium">
            {percentage}%
          </span>
        )}
      </div>
    );
  }
);

ProgressIndicator.displayName = "ProgressIndicator";

export { ProgressIndicator };
