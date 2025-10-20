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
  TestTube,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Copy,
  Plus,
  Trash2,
  Edit,
  Globe,
  User,
  CreditCard,
  Building2,
  TrendingDown
} from "lucide-react";
import { InterchangeSettings } from "@/pages/AccountSettings/InterchangeSettings";

export function AccountSettings() {
  const [sandboxMode, setSandboxMode] = useState(false);
  const [routeToSandbox, setRouteToSandbox] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState(false);

  const apiConnections = [
    {
      id: "authorize-net",
      name: "Authorize.net",
      description: "Primary payment processor",
      status: "connected",
      environment: "production",
      lastUsed: "2 min ago",
      hasTestMode: true
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "Backup payment processor",
      status: "connected", 
      environment: "production",
      lastUsed: "15 min ago",
      hasTestMode: true
    },
    {
      id: "plaid",
      name: "Plaid",
      description: "Bank account verification",
      status: "connected",
      environment: "production", 
      lastUsed: "1 hour ago",
      hasTestMode: true
    },
    {
      id: "apple-pay",
      name: "Apple Pay",
      description: "Digital wallet integration",
      status: "pending",
      environment: "sandbox",
      lastUsed: "Never",
      hasTestMode: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
        <p className="text-muted-foreground">Manage API connections, security, and account preferences</p>
      </div>

      <Tabs defaultValue="api-keys" className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full min-w-fit">
            <TabsTrigger value="api-keys" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              API Keys
            </TabsTrigger>
            <TabsTrigger value="interchange" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              <TrendingDown className="h-3 w-3 mr-1" />
              Interchange
            </TabsTrigger>
            <TabsTrigger value="sandbox" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              Sandbox
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="account" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              Account
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="api-keys">
          <div className="space-y-6">
            {/* API Connections Overview */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Key className="h-5 w-5" />
                    <span>API Connections</span>
                  </CardTitle>
                  <Button size="sm" className="bg-gradient-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Connection
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiConnections.map((connection) => (
                    <div key={connection.id} className="p-4 border rounded-lg bg-gradient-card">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Globe className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{connection.name}</h3>
                            <p className="text-sm text-muted-foreground">{connection.description}</p>
                          </div>
                          <Badge className={getStatusColor(connection.status)}>
                            {connection.status}
                          </Badge>
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
                          <p className="text-muted-foreground">Environment</p>
                          <p className="font-medium capitalize">{connection.environment}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Used</p>
                          <p className="font-medium">{connection.lastUsed}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Test Mode Available</p>
                          <p className="font-medium">{connection.hasTestMode ? "Yes" : "No"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Authorize.net Credentials */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Authorize.net Credentials</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-login">API Login ID</Label>
                    <div className="relative">
                      <Input 
                        id="api-login" 
                        type={showApiKeys ? "text" : "password"}
                        placeholder="Enter your API Login ID" 
                        defaultValue="****1234"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0"
                        onClick={() => setShowApiKeys(!showApiKeys)}
                      >
                        {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transaction-key">Transaction Key</Label>
                    <div className="relative">
                      <Input 
                        id="transaction-key" 
                        type={showApiKeys ? "text" : "password"}
                        placeholder="Enter your Transaction Key" 
                        defaultValue="****5678"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0"
                        onClick={() => navigator.clipboard.writeText('transaction-key-value')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signature-key">Signature Key (Optional)</Label>
                  <Input 
                    id="signature-key" 
                    type={showApiKeys ? "text" : "password"}
                    placeholder="Enter your Signature Key for webhook validation" 
                    defaultValue="****9012"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Button className="bg-gradient-primary">
                    <Key className="h-4 w-4 mr-2" />
                    Update Credentials
                  </Button>
                  <Button variant="outline">
                    <Zap className="h-4 w-4 mr-2" />
                    Test Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interchange">
          <InterchangeSettings />
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
                  <h3 className="font-medium">Global Sandbox Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Route all transactions to sandbox environment for testing
                  </p>
                </div>
                <Switch checked={sandboxMode} onCheckedChange={setSandboxMode} />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h3 className="font-medium">Smart Sandbox Routing</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically route specific transactions to sandbox based on criteria
                  </p>
                </div>
                <Switch checked={routeToSandbox} onCheckedChange={setRouteToSandbox} />
              </div>

              {(sandboxMode || routeToSandbox) && (
                <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h3 className="font-medium text-blue-900 dark:text-blue-100">Sandbox Configuration</h3>
                  
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
          <div className="space-y-4">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>IP Whitelist</Label>
                    <p className="text-xs text-muted-foreground">Restrict API access to specific IP addresses</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Webhook Signature Validation</Label>
                    <p className="text-xs text-muted-foreground">Verify webhook authenticity using signatures</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>API Rate Limiting</Label>
                    <p className="text-xs text-muted-foreground">Prevent abuse with request rate limits</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Session Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Session Timeout (minutes)</Label>
                    <Input type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Concurrent Sessions</Label>
                    <Input type="number" defaultValue="3" />
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Revoke All Active Sessions
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Failed Transactions</Label>
                    <p className="text-xs text-muted-foreground">Instant alerts for payment failures</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>High-Risk Transactions</Label>
                    <p className="text-xs text-muted-foreground">Alerts for potentially fraudulent activity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Chargeback Notifications</Label>
                    <p className="text-xs text-muted-foreground">Immediate alerts for new chargebacks</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>API Connection Issues</Label>
                    <p className="text-xs text-muted-foreground">Alerts when payment processors go offline</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>AI Insights & Recommendations</Label>
                    <p className="text-xs text-muted-foreground">Smart recommendations and analysis reports</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Performance Reports</Label>
                    <p className="text-xs text-muted-foreground">Summary of payment processing performance</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Email Preferences</h4>
                <div className="space-y-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input id="notification-email" type="email" defaultValue="admin@company.com" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <div className="space-y-4">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Account Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="Acme Corporation" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-type">Business Type</Label>
                    <select className="w-full p-2 border border-input rounded-md bg-background text-foreground">
                      <option value="ecommerce">E-commerce</option>
                      <option value="saas">SaaS</option>
                      <option value="retail">Retail</option>
                      <option value="marketplace">Marketplace</option>
                      <option value="nonprofit">Non-profit</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input id="admin-email" type="email" defaultValue="admin@acme.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input id="address" defaultValue="123 Business St, Suite 100" />
                </div>

                <Button className="bg-gradient-primary">
                  <User className="h-4 w-4 mr-2" />
                  Update Account Information
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Billing Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Current Plan: Professional</p>
                    <p className="text-sm text-muted-foreground">$99/month • Next billing: Jan 15, 2024</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage Plan
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Payment Method</p>
                    <p className="text-sm text-muted-foreground">**** **** **** 4242 • Expires 12/25</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Update Card
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}