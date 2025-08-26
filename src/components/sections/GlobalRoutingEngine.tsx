import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Zap,
  Target,
  TrendingUp,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  ArrowDown,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  BarChart3,
  CreditCard,
  Building2,
  Smartphone,
  Coins
} from "lucide-react";

interface RoutingRule {
  id: string;
  name: string;
  priority: number;
  conditions: {
    amount?: { min?: number; max?: number };
    currency?: string[];
    paymentMethod?: string[];
    riskLevel?: string;
    region?: string[];
  };
  actions: {
    primary: string;
    fallback: string[];
  };
  status: "active" | "inactive" | "testing";
  performance: {
    triggered: number;
    successRate: number;
    avgSavings: number;
  };
}

export function GlobalRoutingEngine() {
  const [routingRules, setRoutingRules] = useState<RoutingRule[]>([
    {
      id: "rule-1",
      name: "High-Value Credit Cards",
      priority: 1,
      conditions: {
        amount: { min: 500 },
        paymentMethod: ["credit-card"],
        currency: ["USD", "CAD"]
      },
      actions: {
        primary: "Primary Card Processing",
        fallback: ["Backup Card Processor", "High-Risk Backup"]
      },
      status: "active",
      performance: {
        triggered: 2840,
        successRate: 97.2,
        avgSavings: 0.15
      }
    },
    {
      id: "rule-2", 
      name: "ACH Payments",
      priority: 2,
      conditions: {
        paymentMethod: ["ach"],
        currency: ["USD"]
      },
      actions: {
        primary: "Primary ACH Processor",
        fallback: []
      },
      status: "active",
      performance: {
        triggered: 1205,
        successRate: 94.8,
        avgSavings: 2.65
      }
    },
    {
      id: "rule-3",
      name: "Digital Wallet Fallback",
      priority: 3,
      conditions: {
        paymentMethod: ["digital-wallet"],
        riskLevel: "low"
      },
      actions: {
        primary: "Apple Pay Integration",
        fallback: ["Primary Card Processing"]
      },
      status: "testing",
      performance: {
        triggered: 450,
        successRate: 89.3,
        avgSavings: 0.08
      }
    }
  ]);

  const paymentFlow = [
    {
      step: 1,
      name: "Payment Received",
      description: "Transaction initiated by customer",
      icon: Target,
      status: "completed"
    },
    {
      step: 2,
      name: "Rule Evaluation",
      description: "Check routing rules in priority order",
      icon: Zap,
      status: "completed"
    },
    {
      step: 3,
      name: "Primary Routing",
      description: "Route to optimal payment processor",
      icon: ArrowRight,
      status: "active"
    },
    {
      step: 4,
      name: "Fallback Logic",
      description: "Retry with backup if primary fails",
      icon: ArrowDown,
      status: "pending"
    },
    {
      step: 5,
      name: "Success/Failure",
      description: "Final transaction result",
      icon: CheckCircle,
      status: "pending"
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

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit-card": return CreditCard;
      case "ach": return Building2;
      case "digital-wallet": return Smartphone;
      case "crypto": return Coins;
      default: return CreditCard;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Global Routing Engine</h1>
        <p className="text-muted-foreground">Unified payment routing across all payment methods and processors</p>
      </div>

      {/* Flow Visualization */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Payment Flow Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between overflow-x-auto pb-4">
            {paymentFlow.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="flex items-center space-x-4">
                  <div className="flex flex-col items-center space-y-2 min-w-[120px]">
                    <div className={`p-3 rounded-full ${
                      step.status === "completed" ? "bg-green-100 text-green-600" :
                      step.status === "active" ? "bg-blue-100 text-blue-600" :
                      "bg-gray-100 text-gray-400"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{step.name}</p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  {index < paymentFlow.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="rules" className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="grid grid-cols-3 w-full min-w-fit">
            <TabsTrigger value="rules" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              Routing Rules
            </TabsTrigger>
            <TabsTrigger value="performance" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              Performance
            </TabsTrigger>
            <TabsTrigger value="configuration" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              Global Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="rules">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Active Routing Rules</h3>
              <Button size="sm" className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Create Rule
              </Button>
            </div>

            <div className="space-y-4">
              {routingRules.map((rule) => (
                <Card key={rule.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs font-mono">
                            P{rule.priority}
                          </Badge>
                          <h4 className="font-medium">{rule.name}</h4>
                        </div>
                        <Badge className={getStatusColor(rule.status)}>
                          {rule.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          {rule.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Conditions</p>
                        <div className="space-y-1">
                          {rule.conditions.amount && (
                            <div className="flex items-center space-x-1 text-xs">
                              <DollarSign className="h-3 w-3" />
                              <span>
                                {rule.conditions.amount.min && `≥ $${rule.conditions.amount.min}`}
                                {rule.conditions.amount.max && ` ≤ $${rule.conditions.amount.max}`}
                              </span>
                            </div>
                          )}
                          {rule.conditions.paymentMethod && (
                            <div className="flex items-center space-x-1 text-xs">
                              {rule.conditions.paymentMethod.map((method, index) => {
                                const Icon = getPaymentMethodIcon(method);
                                return (
                                  <div key={index} className="flex items-center space-x-1">
                                    <Icon className="h-3 w-3" />
                                    <span>{method.replace('-', ' ')}</span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          {rule.conditions.currency && (
                            <div className="flex items-center space-x-1 text-xs">
                              <span>Currencies: {rule.conditions.currency.join(", ")}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Routing Action</p>
                        <div className="space-y-1">
                          <div className="text-xs">
                            <span className="font-medium">Primary:</span> {rule.actions.primary}
                          </div>
                          {rule.actions.fallback.length > 0 && (
                            <div className="text-xs">
                              <span className="font-medium">Fallback:</span> {rule.actions.fallback.join(", ")}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Performance</p>
                        <div className="space-y-1 text-xs">
                          <div>Triggered: {rule.performance.triggered.toLocaleString()} times</div>
                          <div>Success Rate: {rule.performance.successRate}%</div>
                          <div className="text-green-600">Avg Savings: ${rule.performance.avgSavings}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Rules</p>
                    <p className="text-2xl font-bold">{routingRules.length}</p>
                  </div>
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {routingRules.filter(r => r.status === "active").length} active
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Success Rate</p>
                    <p className="text-2xl font-bold">94.2%</p>
                  </div>
                  <Target className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">+2.1% vs last month</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Savings</p>
                    <p className="text-2xl font-bold">$3,240</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">This month</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Processing</p>
                    <p className="text-2xl font-bold">1.4s</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">-0.2s faster</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg">Rule Performance Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routingRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-xs font-mono">P{rule.priority}</Badge>
                      <span className="font-medium">{rule.name}</span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <p className="text-muted-foreground">Triggered</p>
                        <p className="font-medium">{rule.performance.triggered.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Success Rate</p>
                        <p className="font-medium">{rule.performance.successRate}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Savings</p>
                        <p className="font-medium text-green-600">${rule.performance.avgSavings}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Global Routing Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Routing Strategy</Label>
                  <select className="w-full p-2 border border-input rounded-md bg-background text-foreground">
                    <option value="smart">Smart Routing (AI-Optimized)</option>
                    <option value="cost">Cost Optimization First</option>
                    <option value="success">Success Rate First</option>
                    <option value="speed">Speed Optimization</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Fallback Timeout (seconds)</Label>
                  <Input type="number" defaultValue="30" />
                </div>

                <div className="space-y-2">
                  <Label>Max Retry Attempts</Label>
                  <Input type="number" defaultValue="3" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Advanced Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Machine Learning Optimization</Label>
                    <p className="text-xs text-muted-foreground">Use AI to continuously improve routing decisions</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Real-time Rule Adjustment</Label>
                    <p className="text-xs text-muted-foreground">Automatically adjust rules based on performance</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Load Balancing</Label>
                    <p className="text-xs text-muted-foreground">Distribute load across multiple processors</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Fraud-based Routing</Label>
                    <p className="text-xs text-muted-foreground">Route high-risk transactions to specialized processors</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}