import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard,
  Building2,
  Smartphone,
  Coins,
  Plus,
  Settings,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Euro,
  PoundSterling,
  ChevronRight,
  Link,
  Zap,
  Shield
} from "lucide-react";

interface PaymentAccount {
  id: string;
  name: string;
  processor: string;
  status: "active" | "inactive" | "testing";
  currencies: string[];
  fees: { transaction: string; monthly: string };
  environment: "production" | "sandbox";
  lastUsed: string;
  isDefault?: boolean;
}

interface PaymentMethod {
  type: "credit-card" | "ach" | "digital-wallet" | "crypto";
  name: string;
  icon: any;
  description: string;
  accounts: PaymentAccount[];
  acceptedTypes: string[];
  enabled: boolean;
}

export function PaymentInfrastructure() {
  const [selectedMethod, setSelectedMethod] = useState<string>("credit-card");

  const paymentMethods: PaymentMethod[] = [
    {
      type: "credit-card",
      name: "Credit & Debit Cards",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express, and other card networks",
      enabled: true,
      acceptedTypes: ["Visa", "Mastercard", "Amex", "Discover"],
      accounts: [
        {
          id: "cc-1",
          name: "Primary Card Processing",
          processor: "Authorize.net + First Data",
          status: "active",
          currencies: ["USD", "CAD"],
          fees: { transaction: "2.9% + $0.30", monthly: "$25" },
          environment: "production",
          lastUsed: "2 min ago",
          isDefault: true
        },
        {
          id: "cc-2", 
          name: "Backup Card Processor",
          processor: "Stripe Connect",
          status: "active",
          currencies: ["USD", "EUR", "GBP"],
          fees: { transaction: "2.9% + $0.30", monthly: "$0" },
          environment: "production",
          lastUsed: "15 min ago"
        }
      ]
    },
    {
      type: "ach",
      name: "ACH & Bank Transfers",
      icon: Building2,
      description: "Direct bank account debits and credits",
      enabled: true,
      acceptedTypes: ["ACH Debit", "ACH Credit", "Wire Transfer"],
      accounts: [
        {
          id: "ach-1",
          name: "Primary ACH Processor",
          processor: "Plaid + Dwolla",
          status: "active",
          currencies: ["USD"],
          fees: { transaction: "$0.25", monthly: "$10" },
          environment: "production",
          lastUsed: "1 hour ago"
        }
      ]
    },
    {
      type: "digital-wallet",
      name: "Digital Wallets",
      icon: Smartphone,
      description: "Apple Pay, Google Pay, PayPal, and other digital wallets",
      enabled: true,
      acceptedTypes: ["Apple Pay", "Google Pay", "PayPal", "Amazon Pay"],
      accounts: [
        {
          id: "wallet-1",
          name: "Apple Pay Integration",
          processor: "Apple Pay Direct",
          status: "active",
          currencies: ["USD", "CAD", "EUR"],
          fees: { transaction: "2.9% + $0.30", monthly: "$0" },
          environment: "production",
          lastUsed: "30 min ago"
        }
      ]
    },
    {
      type: "crypto",
      name: "Cryptocurrency",
      icon: Coins,
      description: "Bitcoin, Ethereum, and other digital currencies",
      enabled: false,
      acceptedTypes: ["Bitcoin", "Ethereum", "Litecoin", "USDC"],
      accounts: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "testing": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case "USD": return <DollarSign className="h-3 w-3" />;
      case "EUR": return <Euro className="h-3 w-3" />;
      case "GBP": return <PoundSterling className="h-3 w-3" />;
      default: return <DollarSign className="h-3 w-3" />;
    }
  };

  const selectedMethodData = paymentMethods.find(m => m.type === selectedMethod);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Payment Infrastructure</h1>
        <p className="text-muted-foreground">Configure payment methods, merchant accounts, and routing preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Payment Methods Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg">Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.type}
                    onClick={() => setSelectedMethod(method.type)}
                    className={`w-full p-3 rounded-lg text-left transition-smooth flex items-center justify-between ${
                      selectedMethod === method.type 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5" />
                      <div>
                        <p className="font-medium text-sm">{method.name}</p>
                        <p className="text-xs opacity-75">{method.accounts.length} account{method.accounts.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.enabled ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-gray-400" />
                      )}
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {selectedMethodData && (
            <>
              {/* Method Overview */}
              <Card className="bg-gradient-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <selectedMethodData.icon className="h-6 w-6 text-primary" />
                      <div>
                        <CardTitle className="text-xl">{selectedMethodData.name}</CardTitle>
                        <p className="text-muted-foreground">{selectedMethodData.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={selectedMethodData.enabled} />
                      <span className="text-sm font-medium">
                        {selectedMethodData.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Connected Accounts</p>
                      <p className="text-2xl font-bold">{selectedMethodData.accounts.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Accepted Types</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedMethodData.acceptedTypes.slice(0, 2).map((type, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{type}</Badge>
                        ))}
                        {selectedMethodData.acceptedTypes.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{selectedMethodData.acceptedTypes.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge className={selectedMethodData.enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {selectedMethodData.enabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Accounts Configuration */}
              <Tabs defaultValue="accounts" className="space-y-4">
                <div className="overflow-x-auto">
                  <TabsList className="grid grid-cols-3 w-full min-w-fit">
                    <TabsTrigger value="accounts" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
                      Connected Accounts
                    </TabsTrigger>
                    <TabsTrigger value="routing" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
                      Routing Rules
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
                      Advanced Settings
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="accounts">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Merchant Accounts</h3>
                      <Button size="sm" className="bg-gradient-primary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Account
                      </Button>
                    </div>

                    {selectedMethodData.accounts.length > 0 ? (
                      <div className="space-y-4">
                        {selectedMethodData.accounts.map((account) => (
                          <Card key={account.id} className="border">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <h4 className="font-medium">{account.name}</h4>
                                  <Badge className={getStatusColor(account.status)}>
                                    {account.status}
                                  </Badge>
                                  {account.isDefault && (
                                    <Badge variant="outline" className="text-green-600">Default</Badge>
                                  )}
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Processor</p>
                                  <p className="font-medium">{account.processor}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Supported Currencies</p>
                                  <div className="flex space-x-1 mt-1">
                                    {account.currencies.map((currency, index) => (
                                      <div key={index} className="flex items-center space-x-1">
                                        {getCurrencyIcon(currency)}
                                        <span className="text-xs font-medium">{currency}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Transaction Fee</p>
                                  <p className="font-medium">{account.fees.transaction}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Last Used</p>
                                  <p className="font-medium">{account.lastUsed}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card className="border-dashed border-2">
                        <CardContent className="p-8 text-center">
                          <selectedMethodData.icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h4 className="font-medium mb-2">No accounts configured</h4>
                          <p className="text-muted-foreground mb-4">
                            Add a merchant account to start accepting {selectedMethodData.name.toLowerCase()}
                          </p>
                          <Button className="bg-gradient-primary">
                            <Plus className="h-4 w-4 mr-2" />
                            Add First Account
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="routing">
                  <Card className="bg-gradient-card">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Zap className="h-5 w-5" />
                        <span>Routing Configuration</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Primary Routing Strategy</Label>
                          <select className="w-full p-2 border border-input rounded-md bg-background text-foreground">
                            <option value="lowest-cost">Lowest Cost First</option>
                            <option value="highest-success">Highest Success Rate</option>
                            <option value="balanced">Balanced (Cost + Success)</option>
                            <option value="custom">Custom Rules</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Fallback Strategy</Label>
                          <select className="w-full p-2 border border-input rounded-md bg-background text-foreground">
                            <option value="all-available">Try All Available</option>
                            <option value="backup-only">Backup Accounts Only</option>
                            <option value="none">No Fallback</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Currency-Specific Routing</h4>
                        {["USD", "EUR", "GBP"].map((currency) => (
                          <div key={currency} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              {getCurrencyIcon(currency)}
                              <span className="font-medium">{currency}</span>
                            </div>
                            <select className="p-1 border border-input rounded text-sm bg-background">
                              <option>Auto-select best</option>
                              <option>Primary account only</option>
                              <option>Specific account</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings">
                  <Card className="bg-gradient-card">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Shield className="h-5 w-5" />
                        <span>Advanced Settings</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Enable retry logic for failed transactions</Label>
                            <p className="text-xs text-muted-foreground">Automatically retry failed payments with backup accounts</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Real-time fraud detection</Label>
                            <p className="text-xs text-muted-foreground">Block suspicious transactions automatically</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Cost optimization routing</Label>
                            <p className="text-xs text-muted-foreground">Automatically route to lowest cost processors</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
}