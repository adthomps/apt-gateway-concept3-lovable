import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KPITile } from "@/components/ui/kpi-tile";
import { 
  TrendingDown, 
  Shield, 
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Info,
  Save
} from "lucide-react";
import { toast } from "sonner";

export function InterchangeSettings() {
  const [l3EnforceMode, setL3EnforceMode] = useState(false);
  const [l2PromptMode, setL2PromptMode] = useState(true);
  const [cedpOptimization, setCedpOptimization] = useState(true);
  const [autoFillEnabled, setAutoFillEnabled] = useState(true);

  const handleSave = () => {
    toast.success("Interchange settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Interchange Optimization</h1>
        <p className="text-muted-foreground">Configure interchange qualification and savings optimization</p>
      </div>

      {/* Monthly Savings Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPITile
          title="Total Savings (MTD)"
          value="$12,485"
          change="+24% vs last month"
          changeType="positive"
          icon={DollarSign}
        />
        <KPITile
          title="L2 Savings"
          value="$4,120"
          change="342 transactions"
          changeType="positive"
          icon={TrendingDown}
        />
        <KPITile
          title="L3 Savings"
          value="$7,285"
          change="156 transactions"
          changeType="positive"
          icon={TrendingDown}
        />
        <KPITile
          title="CEDP Savings"
          value="$1,080"
          change="89 transactions"
          changeType="positive"
          icon={Shield}
        />
      </div>

      {/* Settings */}
      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle>Qualification Rules</CardTitle>
          <CardDescription>Configure how enhanced data is handled for transactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* L3 Enforce Mode */}
          <div className="flex items-start justify-between space-x-4 p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Label htmlFor="l3-enforce" className="text-base font-semibold cursor-pointer">
                  L3 Enforce Mode
                </Label>
                <Badge variant="outline" className="text-xs">
                  {l3EnforceMode ? (
                    <><CheckCircle2 className="h-3 w-3 mr-1" />Active</>
                  ) : (
                    "Inactive"
                  )}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                When enabled, invoices and virtual terminal transactions will be blocked unless 
                complete Level 3 enhanced data is provided. This prevents accidental interchange downgrades.
              </p>
              {l3EnforceMode && (
                <div className="flex items-start space-x-2 p-2 bg-warning/10 border border-warning/30 rounded">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Required fields will be highlighted in red. Transactions cannot be processed without complete L3 data.
                  </p>
                </div>
              )}
            </div>
            <Switch
              id="l3-enforce"
              checked={l3EnforceMode}
              onCheckedChange={setL3EnforceMode}
            />
          </div>

          {/* L2 Prompt Mode */}
          <div className="flex items-start justify-between space-x-4 p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Label htmlFor="l2-prompt" className="text-base font-semibold cursor-pointer">
                  L2 Prompt Mode
                </Label>
                <Badge variant="outline" className="text-xs">
                  {l2PromptMode ? (
                    <><Info className="h-3 w-3 mr-1" />Active</>
                  ) : (
                    "Inactive"
                  )}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Show warnings when Level 2 data is incomplete, but still allow processing. 
                Helps capture additional savings without blocking transactions.
              </p>
              {l2PromptMode && (
                <div className="p-2 bg-primary/10 border border-primary/30 rounded">
                  <p className="text-xs text-muted-foreground">
                    Users will see savings estimates and missing field indicators.
                  </p>
                </div>
              )}
            </div>
            <Switch
              id="l2-prompt"
              checked={l2PromptMode}
              onCheckedChange={setL2PromptMode}
            />
          </div>

          {/* CEDP Optimization */}
          <div className="flex items-start justify-between space-x-4 p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Label htmlFor="cedp-opt" className="text-base font-semibold cursor-pointer">
                  CEDP Optimization
                </Label>
                <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/30">
                  <Shield className="h-3 w-3 mr-1" />
                  Recommended
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Automatically use network tokens for card-on-file transactions when available. 
                Reduces interchange by 5% and improves authorization rates.
              </p>
              <div className="p-2 bg-success/10 border border-success/30 rounded">
                <p className="text-xs text-muted-foreground">
                  Benefits: Lower fees, enhanced security, reduced fraud liability.
                </p>
              </div>
            </div>
            <Switch
              id="cedp-opt"
              checked={cedpOptimization}
              onCheckedChange={setCedpOptimization}
            />
          </div>

          {/* AI Auto-fill */}
          <div className="flex items-start justify-between space-x-4 p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Label htmlFor="ai-autofill" className="text-base font-semibold cursor-pointer">
                  AI Auto-Fill Enhanced Data
                </Label>
                <Badge variant="outline" className="text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Beta
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Let AI suggest and auto-populate enhanced data fields based on transaction context, 
                customer history, and product catalog.
              </p>
            </div>
            <Switch
              id="ai-autofill"
              checked={autoFillEnabled}
              onCheckedChange={setAutoFillEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Info className="h-5 w-5 text-primary" />
            <span>About Interchange Optimization</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Level 2 Data:</strong> Adds customer code, tax amount, 
            and PO number. Typically saves 0.2-0.4% on B2B transactions.
          </p>
          <p>
            <strong className="text-foreground">Level 3 Data:</strong> Includes complete line-item details 
            with product codes and commodity codes. Can save 0.5-1.0% on B2B and government transactions.
          </p>
          <p>
            <strong className="text-foreground">CEDP (Card-on-File):</strong> Uses network tokenization 
            for stored cards, reducing interchange by 5% and improving security.
          </p>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-gradient-primary" size="lg">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
