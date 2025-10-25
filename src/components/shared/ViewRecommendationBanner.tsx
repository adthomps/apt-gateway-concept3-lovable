import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ViewRecommendation } from "@/lib/view-recommendations";
import { TrendingUp, TrendingDown, Lightbulb, X } from "lucide-react";

interface ViewRecommendationBannerProps {
  recommendation: ViewRecommendation;
  onAccept: () => void;
  onDismiss: () => void;
}

export function ViewRecommendationBanner({
  recommendation,
  onAccept,
  onDismiss,
}: ViewRecommendationBannerProps) {
  const getIcon = () => {
    if (recommendation.type === 'upgrade') return <TrendingUp className="h-4 w-4" />;
    if (recommendation.type === 'downgrade') return <TrendingDown className="h-4 w-4" />;
    return <Lightbulb className="h-4 w-4" />;
  };

  return (
    <Alert className="relative">
      {getIcon()}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6"
        onClick={onDismiss}
      >
        <X className="h-3 w-3" />
      </Button>
      
      <AlertTitle>{recommendation.message}</AlertTitle>
      <AlertDescription className="mt-2">
        {recommendation.reason}
        {recommendation.actionable && (
          <div className="mt-3">
            <Button size="sm" onClick={onAccept}>
              {recommendation.type === 'upgrade' ? 'Upgrade' : 
               recommendation.type === 'downgrade' ? 'Simplify' : 
               'Learn More'}
            </Button>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
}
