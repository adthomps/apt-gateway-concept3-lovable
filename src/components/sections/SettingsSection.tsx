import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Key,
  Bell,
  Shield,
  Building,
  Plus,
  Trash2,
  Edit,
  TestTube,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export function SettingsSection() {
  const [sandboxMode, setSandboxMode] = useState(false);
  const [routeToSandbox, setRouteToSandbox] = useState(false);

  const merchantAccounts = [
    {
      id: 1,
      name: "Primary USD Account",
      processor: "Authorize.net",
      acquirer: "First Data",
      merchantId: "AUTH001",
      status: "active",
      environment: "production",
      acceptedCards: ["Visa", "Mastercard", "Amex"],
      routingTypes: ["USD", "Credit Cards", "High Volume"],
      fees: { transaction: "2.9%", monthly: "$25" },
      lastActivity: "2 min ago",
      isDefault: true
    },
    {
      id: 2,
      name: "Backup Processing",
      processor: "Authorize.net",
      acquirer: "Chase Paymentech",
      merchantId: "AUTH002", 
      status: "active",
      environment: "production",
      acceptedCards: ["Visa", "Mastercard"],
      routingTypes: ["USD", "Backup", "Failed Retries"],
      fees: { transaction: "3.1%", monthly: "$30" },
      lastActivity: "15 min ago",
      isDefault: false
    },
    {
      id: 3,
      name: "Sandbox Testing",
      processor: "Authorize.net",
      acquirer: "Test Gateway",
      merchantId: "SANDBOX001",
      status: "testing",
      environment: "sandbox",
      acceptedCards: ["All Test Cards"],
      routingTypes: ["Testing", "Development"],
      fees: { transaction: "Free", monthly: "Free" },
      lastActivity: "30 min ago",
      isDefault: false
    }
  ];

  const getStatusBadge = (status: string, environment: string) => {
    if (environment === "sandbox") {
      return <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">Sandbox</Badge>;
    }
    
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case "testing":
        return <Badge variant="secondary" className="text-blue-600">Testing</Badge>;
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account, API keys, and preferences</p>
      </div>

      <Tabs defaultValue="accounts" className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full min-w-fit">
            <TabsTrigger value="accounts" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              Merchant Accounts
            </TabsTrigger>
            <TabsTrigger value="sandbox" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              Sandbox & Testing
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              Notifications
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="accounts">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>Merchant Account Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">Connected Accounts</h3>
                  <p className="text-sm text-muted-foreground">Manage multiple Authorize.net merchant accounts with different processors</p>
                </div>
                <Button size="sm" className="bg-gradient-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
              </div>
              
              <div className="space-y-4">
                {merchantAccounts.map((account) => (
                  <div key={account.id} className="p-4 border rounded-lg bg-gradient-card">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium">{account.name}</h3>
                        {getStatusBadge(account.status, account.environment)}
                        {account.isDefault && (
                          <Badge variant="outline" className="text-green-600">Default</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Processor & Acquirer</p>
                        <p className="font-medium">{account.processor}</p>
                        <p className="text-muted-foreground text-xs">{account.acquirer}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Merchant ID</p>
                        <p className="font-medium font-mono">{account.merchantId}</p>
                        <p className="text-muted-foreground text-xs">Environment: {account.environment}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Activity</p>
                        <p className="font-medium">{account.lastActivity}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">Accepted Cards</p>
                        <div className="flex flex-wrap gap-1">
                          {account.acceptedCards.map((card, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{card}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">Routing Types</p>
                        <div className="flex flex-wrap gap-1">
                          {account.routingTypes.map((type, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">{type}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-muted-foreground">
                          Transaction Fee: <span className="font-medium">{account.fees.transaction}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Monthly Fee: <span className="font-medium">{account.fees.monthly}</span>
                        </span>
                      </div>
                      {account.environment === "sandbox" && (
                        <Badge variant="outline" className="text-blue-600">
                          <TestTube className="h-3 w-3 mr-1" />
                          Test Environment
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sandbox">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <TestTube className="h-5 w-5" />
                <span>Sandbox & Testing Environment</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h3 className="font-medium">Sandbox Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Enable sandbox mode for testing transactions without real charges
                  </p>
                </div>
                <Switch checked={sandboxMode} onCheckedChange={setSandboxMode} />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h3 className="font-medium">Route Transactions to Sandbox</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically route specific transactions to sandbox for testing
                  </p>
                </div>
                <Switch checked={routeToSandbox} onCheckedChange={setRouteToSandbox} />
              </div>

              {(sandboxMode || routeToSandbox) && (
                <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-medium text-blue-900">Sandbox Configuration</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sandbox-criteria">Routing Criteria</Label>
                      <select className="w-full p-2 border border-input rounded-md bg-background text-foreground">
                        <option value="amount">Transaction Amount</option>
                        <option value="email">Customer Email Domain</option>
                        <option value="ip">IP Address Range</option>
                        <option value="test-cards">Test Card Numbers</option>
                        <option value="manual">Manual Override</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sandbox-value">Criteria Value</Label>
                      <Input id="sandbox-value" placeholder="e.g., > $100, @test.com, 192.168.*" />
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    Test Sandbox Configuration
                  </Button>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-medium">Test Transaction Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <div className="text-center">
                      <p className="font-medium">Successful Transaction</p>
                      <p className="text-xs text-muted-foreground">Test successful payment flow</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                    <div className="text-center">
                      <p className="font-medium">Declined Transaction</p>
                      <p className="text-xs text-muted-foreground">Test decline scenarios</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Clock className="h-6 w-6 text-yellow-500" />
                    <div className="text-center">
                      <p className="font-medium">Pending Transaction</p>
                      <p className="text-xs text-muted-foreground">Test async processing</p>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security & API Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-login">Authorize.net API Login ID</Label>
                <Input id="api-login" placeholder="Enter your API Login ID" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transaction-key">Transaction Key</Label>
                <Input id="transaction-key" placeholder="Enter your Transaction Key" type="password" />
              </div>
              <Button className="bg-gradient-primary">
                <Key className="h-4 w-4 mr-2" />
                Save API Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Failed Transactions</Label>
                  <p className="text-xs text-muted-foreground">Instant alerts for payment failures</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Fraud Alerts</Label>
                  <p className="text-xs text-muted-foreground">High-risk transaction notifications</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>AI Insights</Label>
                  <p className="text-xs text-muted-foreground">Smart recommendations and analysis</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}