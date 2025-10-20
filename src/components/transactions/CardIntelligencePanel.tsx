import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CardIntelligence } from "@/types/card-intelligence";
import { getLevelBadgeColor, getCountryFlag } from "@/lib/interchange-calculator";
import { 
  CreditCard, 
  Building2, 
  Globe, 
  TrendingDown, 
  Shield,
  AlertTriangle,
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface CardIntelligencePanelProps {
  cardIntelligence: CardIntelligence;
}

export function CardIntelligencePanel({ cardIntelligence }: CardIntelligencePanelProps) {
  const brandIcons: Record<string, string> = {
    visa: '💳',
    mastercard: '💳',
    amex: '💳',
    discover: '💳'
  };

  return (
    <div className="space-y-4">
      {/* Card Overview */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <span>Card Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Brand</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{brandIcons[cardIntelligence.brand]}</span>
                <span className="font-semibold capitalize">{cardIntelligence.brand}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Card Type</p>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="capitalize">
                  {cardIntelligence.type}
                </Badge>
                {cardIntelligence.isCommercial && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    <Building2 className="h-3 w-3 mr-1" />
                    Commercial
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Last 4 Digits</p>
              <p className="font-mono text-lg">•••• {cardIntelligence.last4}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">BIN</p>
              <p className="font-mono">{cardIntelligence.bin}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Issuer Country</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getCountryFlag(cardIntelligence.issuerCountryCode)}</span>
              <span className="font-medium">{cardIntelligence.issuerCountry}</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Account Type</p>
            <p className="font-medium">{cardIntelligence.accountType}</p>
          </div>
        </CardContent>
      </Card>

      {/* Interchange Qualification */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <TrendingDown className="h-5 w-5 text-success" />
            <span>Interchange Qualification</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Current Level</p>
              <Badge className={getLevelBadgeColor(cardIntelligence.level)}>
                {cardIntelligence.level}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Interchange Rate</p>
              <p className="text-xl font-bold">{cardIntelligence.interchangeRate}</p>
            </div>
          </div>

          {cardIntelligence.estimatedSavings && (
            <div className={`p-3 rounded-lg ${
              cardIntelligence.level === 'downgraded' 
                ? 'bg-destructive/10 border border-destructive/30' 
                : 'bg-success/10 border border-success/30'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {cardIntelligence.level === 'downgraded' ? (
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                )}
                <p className="font-semibold">
                  {cardIntelligence.level === 'downgraded' ? 'Cost Increase' : 'Savings vs L1'}
                </p>
              </div>
              <p className="text-2xl font-bold">
                {cardIntelligence.estimatedSavings}
              </p>
            </div>
          )}

          {cardIntelligence.downgradeReason && (
            <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                <div>
                  <p className="font-medium text-warning mb-1">Downgrade Detected</p>
                  <p className="text-sm text-muted-foreground">{cardIntelligence.downgradeReason}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CEDP Status */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>CEDP Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium mb-1">Card-on-File Network Tokenization</p>
              <p className="text-sm text-muted-foreground">
                {cardIntelligence.cedpEnabled 
                  ? 'Active - Enhanced security + lower rates' 
                  : 'Not enabled for this card'}
              </p>
            </div>
            <div>
              {cardIntelligence.cedpEnabled ? (
                <Badge className="bg-success/20 text-success border-success/30">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Enabled
                </Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">
                  Not Available
                </Badge>
              )}
            </div>
          </div>

          {cardIntelligence.cedpEnabled && (
            <div className="mt-3 p-3 bg-primary/5 rounded-lg">
              <p className="text-sm font-medium mb-1">Benefits Active:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ 5% interchange discount applied</li>
                <li>✓ Enhanced fraud protection</li>
                <li>✓ Reduced chargeback liability</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
