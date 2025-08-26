import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  Clock, 
  DollarSign,
  RefreshCw,
  Download,
  BarChart3,
  PieChart,
  Target,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from "lucide-react";

export function OrchestrationAnalytics() {
  const routingPerformance = {
    totalTransactions: 15847,
    successRate: 94.2,
    averageProcessingTime: 1.8,
    autoRetrySuccess: 12.3,
    costOptimization: 8.7
  };

  const merchantAccounts = [
    {
      name: "Primary USD",
      transactions: 12453,
      successRate: 96.8,
      avgProcessingTime: 1.2,
      fees: "$2,341.20",
      status: "healthy",
      lastUsed: "2 min ago"
    },
    {
      name: "Backup Account",
      transactions: 2894,
      successRate: 91.4,
      avgProcessingTime: 2.1,
      fees: "$687.45",
      status: "healthy",
      lastUsed: "5 min ago"
    },
    {
      name: "High-Risk Backup",
      transactions: 500,
      successRate: 88.2,
      avgProcessingTime: 2.8,
      fees: "$156.78",
      status: "warning",
      lastUsed: "1 hour ago"
    }
  ];

  const routingRules = [
    {
      name: "USD Credit Cards",
      triggered: 8234,
      successRate: 97.1,
      avgSavings: "$0.12",
      performance: "excellent"
    },
    {
      name: "High-Risk Fallback",
      triggered: 423,
      successRate: 89.3,
      avgSavings: "$0.08",
      performance: "good"
    },
    {
      name: "Visa Retry Logic",
      triggered: 1204,
      successRate: 85.6,
      avgSavings: "$0.15",
      performance: "good"
    }
  ];

  const timeSeriesData = [
    { time: "00:00", success: 96, failed: 4, retries: 8 },
    { time: "04:00", success: 94, failed: 6, retries: 12 },
    { time: "08:00", success: 92, failed: 8, retries: 15 },
    { time: "12:00", success: 95, failed: 5, retries: 10 },
    { time: "16:00", success: 97, failed: 3, retries: 7 },
    { time: "20:00", success: 93, failed: 7, retries: 14 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-green-600 bg-green-100";
      case "warning": return "text-yellow-600 bg-yellow-100";
      case "error": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "poor": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Orchestration Analytics</h1>
          <p className="text-muted-foreground">Payment routing performance and optimization insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-2xl font-bold">{routingPerformance.totalTransactions.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">+12.5%</span>
              <span className="text-muted-foreground ml-1">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{routingPerformance.successRate}%</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">+2.1%</span>
              <span className="text-muted-foreground ml-1">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Processing Time</p>
                <p className="text-2xl font-bold">{routingPerformance.averageProcessingTime}s</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">-0.3s</span>
              <span className="text-muted-foreground ml-1">faster</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Auto-Retry Success</p>
                <p className="text-2xl font-bold">{routingPerformance.autoRetrySuccess}%</p>
              </div>
              <RefreshCw className="h-8 w-8 text-purple-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">+1.8%</span>
              <span className="text-muted-foreground ml-1">improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cost Optimization</p>
                <p className="text-2xl font-bold">{routingPerformance.costOptimization}%</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">$2,340</span>
              <span className="text-muted-foreground ml-1">saved</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="accounts" className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full min-w-fit">
            <TabsTrigger value="accounts" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              Merchant Accounts
            </TabsTrigger>
            <TabsTrigger value="rules" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              Routing Rules
            </TabsTrigger>
            <TabsTrigger value="trends" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              Performance Trends
            </TabsTrigger>
            <TabsTrigger value="optimization" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4">
              Optimization
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="accounts">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Merchant Account Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {merchantAccounts.map((account, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium">{account.name}</h3>
                        <Badge className={getStatusColor(account.status)}>{account.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Last used: {account.lastUsed}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Transactions</p>
                        <p className="text-lg font-semibold">{account.transactions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                        <p className="text-lg font-semibold">{account.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Processing</p>
                        <p className="text-lg font-semibold">{account.avgProcessingTime}s</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Fees</p>
                        <p className="text-lg font-semibold">{account.fees}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Routing Rules Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routingRules.map((rule, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{rule.name}</h3>
                      <Badge className={getPerformanceColor(rule.performance)}>
                        {rule.performance}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Times Triggered</p>
                        <p className="text-lg font-semibold">{rule.triggered.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                        <p className="text-lg font-semibold">{rule.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Savings</p>
                        <p className="text-lg font-semibold text-green-600">{rule.avgSavings}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Impact</p>
                        <p className="text-lg font-semibold text-green-600">
                          ${(parseFloat(rule.avgSavings.replace('$', '')) * rule.triggered).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>24-Hour Performance Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Failed Rate</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Retry Rate</p>
                  </div>
                </div>
                
                {timeSeriesData.map((data, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-3 bg-muted/30 rounded">
                    <div className="text-center font-medium">{data.time}</div>
                    <div className="text-center">
                      <span className="text-green-600 font-semibold">{data.success}%</span>
                    </div>
                    <div className="text-center">
                      <span className="text-red-600 font-semibold">{data.failed}%</span>
                    </div>
                    <div className="text-center">
                      <span className="text-blue-600 font-semibold">{data.retries}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Optimization Opportunities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Route Visa cards to Primary USD first</p>
                      <p className="text-xs text-muted-foreground">Estimated savings: $120/day</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Optimize retry timing for declined cards</p>
                      <p className="text-xs text-muted-foreground">Could improve success rate by 3.2%</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Consider adding EUR merchant account</p>
                      <p className="text-xs text-muted-foreground">23% of failures are currency-related</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Cost Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">$2,340</p>
                  <p className="text-sm text-muted-foreground">Total savings this month</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Intelligent routing</span>
                    <span className="text-sm font-medium text-green-600">$1,820</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Auto-retry optimization</span>
                    <span className="text-sm font-medium text-green-600">$420</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fee optimization</span>
                    <span className="text-sm font-medium text-green-600">$100</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Projected monthly savings</span>
                    <span className="font-bold text-green-600">$7,020</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}