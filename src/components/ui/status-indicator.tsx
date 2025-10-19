import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "online" | "offline" | "degraded";
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StatusIndicator({ 
  status, 
  showLabel = false,
  size = "md",
  className 
}: StatusIndicatorProps) {
  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4"
  };

  const statusConfig = {
    online: {
      color: "bg-success",
      label: "Online",
      pulse: true
    },
    offline: {
      color: "bg-destructive",
      label: "Offline",
      pulse: false
    },
    degraded: {
      color: "bg-warning",
      label: "Degraded",
      pulse: true
    }
  };

  const config = statusConfig[status];

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="relative">
        <div className={cn(sizeClasses[size], config.color, "rounded-full")} />
        {config.pulse && (
          <div className={cn(
            sizeClasses[size], 
            config.color, 
            "rounded-full absolute inset-0 animate-ping opacity-75"
          )} />
        )}
      </div>
      {showLabel && (
        <span className="text-sm text-muted-foreground">{config.label}</span>
      )}
    </div>
  );
}
