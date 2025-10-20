import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { EnhancedDataAssistant } from "@/components/transactions/EnhancedDataAssistant";
import { 
  Terminal as TerminalIcon, 
  CreditCard,
  Plus,
  TrendingDown
} from "lucide-react";
import { toast } from "sonner";

export function VirtualTerminalSection() {
  const [l2Mode, setL2Mode] = useState(true);
  const [l3Mode, setL3Mode] = useState(false);

  const handleAutoFill = () => {
    toast.success("AI auto-fill feature coming soon!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Virtual Terminal</h1>
        <p className="text-muted-foreground">Process card-present and manual transactions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-card shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Payment Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="4111 1111 1111 1111" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input id="cardholderName" placeholder="John Doe" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" placeholder="12345" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" placeholder="0.00" type="number" step="0.01" />
            </div>
            <Button className="w-full bg-gradient-primary shadow-primary" size="lg">
              <TerminalIcon className="h-4 w-4 mr-2" />
              Process Payment
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-gradient-card shadow-md">
            <CardHeader>
              <CardTitle>Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground mb-4">No items in cart</p>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              {/* Enhanced Data Toggles */}
              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="l2-toggle" className="font-medium">L2 Mode</Label>
                    <p className="text-xs text-muted-foreground">Include customer & tax data</p>
                  </div>
                  <Switch
                    id="l2-toggle"
                    checked={l2Mode}
                    onCheckedChange={setL2Mode}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="l3-toggle" className="font-medium">L3 Mode</Label>
                    <p className="text-xs text-muted-foreground">Include line item details</p>
                  </div>
                  <Switch
                    id="l3-toggle"
                    checked={l3Mode}
                    onCheckedChange={setL3Mode}
                  />
                </div>

                {(l2Mode || l3Mode) && (
                  <div className="p-3 bg-success/10 border border-success/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingDown className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium">Savings</span>
                    </div>
                    <p className="text-2xl font-bold text-success">
                      {l3Mode ? "$1.80" : l2Mode ? "$0.87" : "$0.00"}
                    </p>
                    <Badge className="mt-2 bg-success/20 text-success border-success/30">
                      {l3Mode ? "L3" : l2Mode ? "L2" : "L1"} Rate Applied
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Data Assistant */}
          <EnhancedDataAssistant
            l3EnforceMode={false}
            estimatedSavings={l3Mode ? "$1.80" : l2Mode ? "$0.87" : "$0.00"}
            onAutoFill={handleAutoFill}
          />
        </div>
      </div>
    </div>
  );
}
