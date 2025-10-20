import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EnhancedData } from "@/types/card-intelligence";
import { getRequiredFieldsForLevel, getLevelBadgeColor } from "@/lib/interchange-calculator";
import { 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  AlertTriangle,
  TrendingDown,
  Info
} from "lucide-react";

interface EnhancedDataAssistantProps {
  enhancedData?: EnhancedData;
  l3EnforceMode?: boolean;
  estimatedSavings?: string;
  onAutoFill?: () => void;
}

export function EnhancedDataAssistant({ 
  enhancedData, 
  l3EnforceMode = false,
  estimatedSavings,
  onAutoFill 
}: EnhancedDataAssistantProps) {
  const l2Fields = getRequiredFieldsForLevel('L2');
  const l3Fields = getRequiredFieldsForLevel('L3');

  // Check completion
  const hasL2 = !!enhancedData?.level2;
  const hasL3 = !!enhancedData?.level3 && 
    enhancedData.level3.lineItems && 
    enhancedData.level3.lineItems.length > 0;

  const l2Complete = hasL2 && 
    enhancedData.level2?.customerCode &&
    enhancedData.level2?.taxAmount;

  const l3Complete = hasL3 &&
    enhancedData.level3?.lineItems.every(item => 
      item.productCode && item.commodityCode
    );

  const currentLevel = l3Complete ? 'L3' : l2Complete ? 'L2' : 'L1';
  const completionPercent = l3Complete ? 100 : l2Complete ? 66 : hasL2 ? 33 : 0;

  return (
    <Card className="bg-gradient-card shadow-md border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>Enhanced Data Assistant</span>
          </CardTitle>
          <Badge className={getLevelBadgeColor(currentLevel)}>
            {currentLevel} Qualified
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Qualification Progress</span>
            <span className="text-sm text-muted-foreground">{completionPercent}%</span>
          </div>
          <Progress value={completionPercent} className="h-2" />
        </div>

        {/* L3 Enforce Mode Alert */}
        {l3EnforceMode && !l3Complete && (
          <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
              <div>
                <p className="font-medium text-warning mb-1">L3 Enforce Mode Active</p>
                <p className="text-sm text-muted-foreground">
                  Complete all L3 fields to process this transaction
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Savings Estimate */}
        {estimatedSavings && (
          <div className="p-3 bg-success/10 border border-success/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-4 w-4 text-success" />
                <span className="font-medium">Estimated Savings</span>
              </div>
              <span className="text-xl font-bold text-success">{estimatedSavings}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              vs Level 1 interchange rate
            </p>
          </div>
        )}

        {/* L2 Checklist */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-sm">Level 2 Requirements</h4>
            <Badge 
              variant="outline" 
              className={l2Complete ? "text-success border-success" : "text-muted-foreground"}
            >
              {l2Complete ? "Complete" : "Incomplete"}
            </Badge>
          </div>
          <div className="space-y-2">
            {l2Fields.map((field, index) => {
              const isComplete = l2Complete || (index < 2 && hasL2);
              return (
                <div key={field} className="flex items-center space-x-2 text-sm">
                  {isComplete ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={isComplete ? "text-foreground" : "text-muted-foreground"}>
                    {field}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* L3 Checklist */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-sm">Level 3 Requirements</h4>
            <Badge 
              variant="outline"
              className={l3Complete ? "text-success border-success" : "text-muted-foreground"}
            >
              {l3Complete ? "Complete" : "Incomplete"}
            </Badge>
          </div>
          <div className="space-y-2">
            {l3Fields.map((field) => {
              const isComplete = l3Complete;
              return (
                <div key={field} className="flex items-center space-x-2 text-sm">
                  {isComplete ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={isComplete ? "text-foreground" : "text-muted-foreground"}>
                    {field}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Auto-fill */}
        {onAutoFill && !l3Complete && (
          <Button 
            onClick={onAutoFill}
            className="w-full bg-gradient-primary"
            variant="default"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            AI Auto-Fill Enhanced Data
          </Button>
        )}

        {/* Info */}
        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Enhanced data helps you qualify for lower interchange rates. 
              L3 data can save 0.5-1.0% per B2B transaction.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
