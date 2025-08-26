import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Settings, 
  Trash2, 
  ArrowRight, 
  Globe,
  CreditCard,
  DollarSign,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
  Zap
} from "lucide-react";

export function RoutingRulesEngine() {
  const rules = [
    {
      id: 1,
      name: "Currency-Based Routing",
      type: "currency",
      condition: "Currency = USD",
      action: "Route to Primary USD Account",
      priority: 1,
      active: true,
      successRate: 97.3,
      volume: 1250
    },
    {
      id: 2,
      name: "European Currency Handler",
      type: "currency",
      condition: "Currency = EUR",
      action: "Route to EUR Processing Account",
      priority: 1,
      active: true,
      successRate: 94.8,
      volume: 340
    },
    {
      id: 3,
      name: "Amex Card Routing",
      type: "card",
      condition: "Card Type = American Express",
      action: "Route to High-Risk Backup",
      priority: 2,
      active: true,
      successRate: 89.2,
      volume: 145
    },
    {
      id: 4,
      name: "Daily Limit Fallback",
      type: "decline",
      condition: "Decline Code = 44 (Daily Limit)",
      action: "Retry on Backup Account",
      priority: 3,
      active: true,
      successRate: 76.4,
      volume: 89
    },
    {
      id: 5,
      name: "Soft Decline Cascade",
      type: "decline",
      condition: "Decline Code = 2,4,41,250",
      action: "Auto-retry with 30s delay",
      priority: 4,
      active: true,
      successRate: 68.1,
      volume: 234
    },
    {
      id: 6,
      name: "Geographic EU Routing",
      type: "geographic",
      condition: "Customer Country in EU",
      action: "Prefer EUR Account",
      priority: 2,
      active: false,
      successRate: 0,
      volume: 0
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'currency': return <DollarSign className="h-4 w-4" />;
      case 'card': return <CreditCard className="h-4 w-4" />;
      case 'decline': return <AlertTriangle className="h-4 w-4" />;
      case 'geographic': return <MapPin className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'currency': return 'text-blue-500 bg-blue-100';
      case 'card': return 'text-green-500 bg-green-100';
      case 'decline': return 'text-orange-500 bg-orange-100';
      case 'geographic': return 'text-purple-500 bg-purple-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payment Routing Engine</h1>
          <p className="text-muted-foreground">Configure intelligent payment routing rules and fallback strategies</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button size="sm" className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Rule
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Success Rate Increase</p>
                <p className="text-xl font-bold text-green-600">+5.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Transactions Recovered</p>
                <p className="text-xl font-bold text-blue-600">127</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-xl font-bold">1.3s</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Rules</p>
                <p className="text-xl font-bold">{rules.filter(r => r.active).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rule Builder Interface */}
      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Quick Rule Builder</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Rule Type</Label>
              <select className="w-full p-2 border border-input rounded-md bg-background">
                <option value="currency">Currency</option>
                <option value="card">Card Type</option>
                <option value="decline">Decline Code</option>
                <option value="geographic">Geographic</option>
                <option value="amount">Amount Range</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Condition</Label>
              <Input placeholder="e.g., Currency = USD" />
            </div>
            <div className="space-y-2">
              <Label>Target Account</Label>
              <select className="w-full p-2 border border-input rounded-md bg-background">
                <option value="primary">Primary USD Account</option>
                <option value="eur">EUR Processing Account</option>
                <option value="backup">High-Risk Backup</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Create Rule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Rules List */}
      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Routing Rules</span>
            <Badge variant="secondary" className="ml-2">
              {rules.length} rules
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {rules.map((rule) => (
            <div key={rule.id} className="p-4 border border-input rounded-lg bg-background/30 hover:bg-background/50 transition-colors animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className={`p-2 rounded-lg ${getTypeColor(rule.type)}`}>
                    {getTypeIcon(rule.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{rule.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        Priority {rule.priority}
                      </Badge>
                      {rule.active ? (
                        <Badge variant="default" className="text-xs">Active</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">Inactive</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                      <span>{rule.condition}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span>{rule.action}</span>
                    </div>
                    {rule.active && (
                      <div className="flex items-center space-x-4 mt-2 text-xs">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>Success: {rule.successRate}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-3 w-3 text-blue-500" />
                          <span>Volume: {rule.volume}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={rule.active} />
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Routing Flow Visualization */}
      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Transaction Flow</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4 p-4 bg-muted/20 rounded-lg">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  100%
                </div>
                <p className="text-xs mt-2">Incoming</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  82%
                </div>
                <p className="text-xs mt-2">Primary</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  15%
                </div>
                <p className="text-xs mt-2">Backup</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                  3%
                </div>
                <p className="text-xs mt-2">Failed</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Current routing efficiency: 97% success rate across all merchant accounts
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}