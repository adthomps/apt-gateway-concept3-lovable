import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ViewComplexity } from "@/types/view-complexity";
import { ArrowRight, Info, Sparkles, TrendingUp } from "lucide-react";

interface UpgradeViewPromptProps {
  currentLevel: ViewComplexity;
  targetLevel: ViewComplexity;
  reason: string;
  featureName: string;
  onUpgrade: () => void;
  onDismiss?: () => void;
}

export function UpgradeViewPrompt({
  currentLevel,
  targetLevel,
  reason,
  featureName,
  onUpgrade,
  onDismiss,
}: UpgradeViewPromptProps) {
  const getIcon = () => {
    if (targetLevel === 'advanced') return <Sparkles className="h-4 w-4" />;
    if (targetLevel === 'standard') return <TrendingUp className="h-4 w-4" />;
    return <Info className="h-4 w-4" />;
  };

  return (
    <Alert className="bg-primary/5 border-primary/20">
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          <AlertTitle className="text-sm font-medium mb-1">
            {featureName} available in {targetLevel} view
          </AlertTitle>
          <AlertDescription className="text-xs text-muted-foreground">
            {reason}
          </AlertDescription>
        </div>
        <div className="flex gap-2">
          {onDismiss && (
            <Button variant="ghost" size="sm" onClick={onDismiss}>
              Maybe Later
            </Button>
          )}
          <Button size="sm" onClick={onUpgrade}>
            Switch to {targetLevel}
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </div>
    </Alert>
  );
}
