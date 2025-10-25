import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ViewComplexity, VIEW_PRESETS } from "@/types/view-complexity";
import { Zap, Layers, Rocket, Check } from "lucide-react";

interface ViewSelectionWizardProps {
  open: boolean;
  onSelect: (level: ViewComplexity) => void;
  suggestedLevel?: ViewComplexity;
}

export function ViewSelectionWizard({
  open,
  onSelect,
  suggestedLevel = 'simple',
}: ViewSelectionWizardProps) {
  const [selected, setSelected] = useState<ViewComplexity>(suggestedLevel);

  const options: { key: ViewComplexity; icon: any; color: string }[] = [
    { key: 'simple', icon: Zap, color: 'text-green-500' },
    { key: 'standard', icon: Layers, color: 'text-blue-500' },
    { key: 'advanced', icon: Rocket, color: 'text-purple-500' },
  ];

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-3xl sm:max-w-[90vw] max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Transactions</DialogTitle>
          <DialogDescription className="text-base">
            Choose how you'd like to view your transactions. You can change this anytime.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          {options.map(({ key, icon: Icon, color }) => {
            const preset = VIEW_PRESETS[key];
            const isSelected = selected === key;
            const isSuggested = key === suggestedLevel;

            return (
              <Card
                key={key}
                className={`cursor-pointer transition-all relative touch-manipulation active:scale-95 ${
                  isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => setSelected(key)}
              >
                {isSuggested && (
                  <Badge className="absolute -top-2 -right-2" variant="secondary">
                    Recommended
                  </Badge>
                )}
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Icon className={`h-8 w-8 ${color}`} />
                    {isSelected && <Check className="h-5 w-5 text-primary" />}
                  </div>
                  <CardTitle>{preset.name}</CardTitle>
                  <CardDescription>{preset.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• {preset.columns.length} data columns</div>
                    <div>
                      • {preset.filters === 'all' ? 'All' : preset.filters.length} filter options
                    </div>
                    <div>
                      • {Object.values(preset.features).filter(Boolean).length} features enabled
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={() => onSelect('simple')}
            className="w-full sm:w-auto touch-manipulation"
          >
            Skip & Use Simple
          </Button>
          <Button 
            onClick={() => onSelect(selected)}
            className="w-full sm:w-auto touch-manipulation"
          >
            Continue with {VIEW_PRESETS[selected].name}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
