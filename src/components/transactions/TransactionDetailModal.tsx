import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  RotateCcw,
  Shield,
  Globe,
  DollarSign,
  User,
  Calendar,
  MapPin,
  TrendingUp,
  Activity,
  Zap
} from "lucide-react";
import { CardIntelligencePanel } from "./CardIntelligencePanel";
import { EnhancedDataPanel } from "./EnhancedDataPanel";
import { mockCardIntelligence, mockEnhancedData } from '@/data/mock-card-intelligence';

interface Transaction {
  id: string;
  date: string;
  customer: string;
  email: string;
  amount: string;
  status: string;
  type: string;
  method: string;
  routingPath: Array<{
    account: string;
    status: string;
    processingTime: string;
    reason?: string;
    merchantId?: string;
    gatewayResponse?: string;
  }>;
  fraudScore: number;
  declineReason?: string;
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  ipAddress?: string;
  deviceFingerprint?: string;
  riskFactors?: string[];
  totalProcessingTime?: string;
  fees?: {
    processing: string;
    interchange: string;
    total: string;
  };
}

interface TransactionDetailModalProps {
  transaction: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionDetailModal({ transaction, open, onOpenChange }: TransactionDetailModalProps) {
  if (!transaction) return null;

  // Get card intelligence and enhanced data
  const cardIntelligence = mockCardIntelligence[transaction.id];
  const enhancedData = mockEnhancedData[transaction.id];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "declined": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "processing": return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getRiskLevel = (score: number) => {
    if (score < 20) return { level: "Low", color: "bg-green-500" };
    if (score < 50) return { level: "Medium", color: "bg-yellow-500" };
    return { level: "High", color: "bg-red-500" };
  };

  const riskInfo = getRiskLevel(transaction.fraudScore);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Transaction Details</span>
            <Badge variant="outline">{transaction.id}</Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="card-intelligence">Card Intelligence</TabsTrigger>
              <TabsTrigger value="enhanced-data">Enhanced Data</TabsTrigger>
              <TabsTrigger value="routing">Routing</TabsTrigger>
              <TabsTrigger value="fraud">Fraud</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
              <TabsTrigger value="related">Related</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Customer Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{transaction.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{transaction.email}</p>
                  </div>
                  {transaction.billingAddress && (
                    <div>
                      <p className="text-sm text-muted-foreground">Billing Address</p>
                      <p className="text-sm">
                        {transaction.billingAddress.street}<br />
                        {transaction.billingAddress.city}, {transaction.billingAddress.state} {transaction.billingAddress.zip}<br />
                        {transaction.billingAddress.country}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Payment Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="text-2xl font-bold">{transaction.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-medium">{transaction.method}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge 
                      variant={
                        transaction.status === "settled" ? "default" :
                        transaction.status === "pending" ? "secondary" : "destructive"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{transaction.date}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {transaction.fees && (
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Fee Breakdown</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Processing Fee</p>
                        <p className="text-lg font-semibold">{transaction.fees.processing}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Interchange Fee</p>
                        <p className="text-lg font-semibold">{transaction.fees.interchange}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Total Fees</p>
                        <p className="text-lg font-semibold text-primary">{transaction.fees.total}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="card-intelligence">
            {cardIntelligence ? (
              <CardIntelligencePanel cardIntelligence={cardIntelligence} />
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  Card intelligence data not available for this transaction
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="enhanced-data">
            <EnhancedDataPanel enhancedData={enhancedData} />
          </TabsContent>

          <TabsContent value="routing">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Payment Routing Journey</span>
                  {transaction.routingPath.length > 1 && (
                    <Badge variant="outline" className="ml-2">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Auto-Retry Enabled
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transaction.routingPath.map((route, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        {getStatusIcon(route.status)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{route.account}</p>
                            {route.merchantId && (
                              <p className="text-sm text-muted-foreground">Merchant ID: {route.merchantId}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{route.processingTime}</p>
                            <p className="text-xs text-muted-foreground capitalize">{route.status}</p>
                          </div>
                        </div>
                        
                        {route.reason && (
                          <div className="mt-2 p-2 bg-muted/50 rounded text-sm">
                            <p className="text-muted-foreground">Decline Reason: {route.reason}</p>
                          </div>
                        )}
                        
                        {route.gatewayResponse && (
                          <div className="mt-2">
                            <p className="text-xs text-muted-foreground">Gateway Response: {route.gatewayResponse}</p>
                          </div>
                        )}
                      </div>
                      
                      {index < transaction.routingPath.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
                
                {transaction.totalProcessingTime && (
                  <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Processing Time</span>
                      <span className="text-sm font-bold">{transaction.totalProcessingTime}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fraud">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Fraud Risk Assessment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${riskInfo.color}`}></div>
                      <span className="font-medium">{riskInfo.level} Risk</span>
                    </div>
                    <div className="text-2xl font-bold">{transaction.fraudScore}/100</div>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${riskInfo.color}`}
                      style={{ width: `${transaction.fraudScore}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>

              {transaction.riskFactors && transaction.riskFactors.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Risk Factors Detected</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {transaction.riskFactors.map((factor, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="technical">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>Technical Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {transaction.ipAddress && (
                    <div>
                      <p className="text-sm text-muted-foreground">IP Address</p>
                      <p className="font-mono text-sm">{transaction.ipAddress}</p>
                    </div>
                  )}
                  
                  {transaction.deviceFingerprint && (
                    <div>
                      <p className="text-sm text-muted-foreground">Device Fingerprint</p>
                      <p className="font-mono text-sm break-all">{transaction.deviceFingerprint}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Transaction Type</p>
                    <p className="font-medium">{transaction.type}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}