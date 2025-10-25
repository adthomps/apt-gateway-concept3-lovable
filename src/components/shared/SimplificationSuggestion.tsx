import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

interface SimplificationSuggestionProps {
  onSimplify: () => void;
  onDismiss: () => void;
}

export function SimplificationSuggestion({
  onSimplify,
  onDismiss,
}: SimplificationSuggestionProps) {
  return (
    <Alert className="bg-blue-500/5 border-blue-500/20">
      <Lightbulb className="h-4 w-4 text-blue-500" />
      <AlertTitle>Simplify your view?</AlertTitle>
      <AlertDescription className="mt-2">
        We noticed you haven't been using advanced features. Want to switch to Standard View for a cleaner experience?
      </AlertDescription>
      <div className="flex gap-2 mt-3">
        <Button size="sm" variant="outline" onClick={onDismiss}>
          Keep Advanced
        </Button>
        <Button size="sm" onClick={onSimplify}>
          Switch to Standard
        </Button>
      </div>
    </Alert>
  );
}
