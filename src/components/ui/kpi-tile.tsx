import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPITileProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "flat";
  className?: string;
}

export function KPITile({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon,
  description,
  trend,
  className 
}: KPITileProps) {
  return (
    <Card className={cn("bg-gradient-card shadow-md hover:shadow-lg transition-smooth", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="bg-primary/10 p-2 rounded-lg">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {change && (
          <p className={cn(
            "text-xs mt-1 font-medium",
            changeType === "positive" && "text-success",
            changeType === "negative" && "text-destructive", 
            changeType === "neutral" && "text-muted-foreground"
          )}>
            {change}
          </p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
