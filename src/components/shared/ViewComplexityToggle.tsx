import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ViewComplexity, VIEW_PRESETS } from "@/types/view-complexity";
import { Layers, Zap, Rocket } from "lucide-react";

interface ViewComplexityToggleProps {
  currentLevel: ViewComplexity;
  onLevelChange: (level: ViewComplexity) => void;
}

export function ViewComplexityToggle({
  currentLevel,
  onLevelChange,
}: ViewComplexityToggleProps) {
  const levels: { key: ViewComplexity; icon: any; label: string }[] = [
    { key: 'simple', icon: Zap, label: 'Simple' },
    { key: 'standard', icon: Layers, label: 'Standard' },
    { key: 'advanced', icon: Rocket, label: 'Advanced' },
  ];

  return (
    <TooltipProvider>
      <div className="inline-flex rounded-lg border bg-background p-1 touch-manipulation">
        {levels.map(({ key, icon: Icon, label }) => {
          const isActive = currentLevel === key;
          const preset = VIEW_PRESETS[key];
          
          return (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="gap-2 touch-manipulation active:scale-95 min-h-[44px]"
                  onClick={() => onLevelChange(key)}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {isActive && <Badge variant="secondary" className="ml-1">Active</Badge>}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <p className="font-semibold">{preset.name}</p>
                <p className="text-sm text-muted-foreground">{preset.description}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {preset.columns.length} columns • {
                    preset.filters === 'all' ? 'All' : preset.filters.length
                  } filters
                </p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
