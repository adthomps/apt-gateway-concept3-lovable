import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  icon: LucideIcon;
  status?: "success" | "error" | "pending" | "default";
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "success":
        return "text-success bg-success/10 border-success/20";
      case "error":
        return "text-destructive bg-destructive/10 border-destructive/20";
      case "pending":
        return "text-warning bg-warning/10 border-warning/20";
      default:
        return "text-primary bg-primary/10 border-primary/20";
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => {
        const Icon = item.icon;
        const isLast = index === items.length - 1;

        return (
          <div key={item.id} className="relative flex items-start">
            {/* Timeline line */}
            {!isLast && (
              <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-border" />
            )}

            {/* Icon */}
            <div
              className={cn(
                "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2",
                getStatusColor(item.status)
              )}
            >
              <Icon className="h-4 w-4" />
            </div>

            {/* Content */}
            <div className="ml-4 flex-1 pb-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.title}</p>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {item.timestamp}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
