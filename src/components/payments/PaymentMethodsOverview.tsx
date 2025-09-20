import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  Building2, 
  Coins, 
  TrendingUp, 
  TrendingDown,
  Settings,
  Eye,
  BarChart3
} from "lucide-react";

const paymentMethodStats = [
  {
    method: "Credit Cards",
    icon: CreditCard,
    volume: "$2,450,890",
    transactions: 8947,
    successRate: 94.2,
    avgAmount: "$274.12",
    change: "+12.5%",
    changeType: "positive" as const,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    method: "ACH Transfers",
    icon: Building2,
    volume: "$1,890,450", 
    transactions: 2341,
    successRate: 97.8,
    avgAmount: "$807.54",
    change: "+8.3%",
    changeType: "positive" as const,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    method: "Stablecoin",
    icon: Coins,
    volume: "$345,670",
    transactions: 567,
    successRate: 99.1,
    avgAmount: "$609.70",
    change: "+45.2%",
    changeType: "positive" as const,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

const methodBreakdown = [
  { method: "Visa", percentage: 42, volume: "$1,029,374", color: "bg-blue-500" },
  { method: "Mastercard", percentage: 28, volume: "$686,249", color: "bg-red-500" },
  { method: "American Express", percentage: 15, volume: "$367,883", color: "bg-green-500" },
  { method: "ACH", percentage: 12, volume: "$294,234", color: "bg-purple-500" },
  { method: "Stablecoin", percentage: 3, volume: "$73,567", color: "bg-orange-500" }
];

export function PaymentMethodsOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Payment Methods Overview</h2>
          <p className="text-muted-foreground">Monitor performance across all payment channels</p>
        </div>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Method Settings
        </Button>
      </div>

      {/* Payment Method Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {paymentMethodStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gradient-card shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <Badge variant={stat.changeType === "positive" ? "default" : "destructive"}>
                    {stat.changeType === "positive" ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {stat.change}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{stat.method}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Volume</p>
                    <p className="text-xl font-bold">{stat.volume}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Transactions</p>
                    <p className="text-xl font-bold">{stat.transactions.toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="font-medium">{stat.successRate}%</span>
                  </div>
                  <Progress value={stat.successRate} className="h-2" />
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground">Average Amount</p>
                  <p className="text-lg font-semibold">{stat.avgAmount}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Payment Method Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="bg-gradient-card shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Payment Method Distribution</span>
            </CardTitle>
            <CardDescription>Volume breakdown by payment type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {methodBreakdown.map((method, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{method.method}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold">{method.percentage}%</span>
                    <p className="text-xs text-muted-foreground">{method.volume}</p>
                  </div>
                </div>
                <Progress value={method.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Method Performance</span>
            </CardTitle>
            <CardDescription>Key metrics across payment methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-success">97.2%</p>
                  <p className="text-xs text-muted-foreground">Overall Success</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-primary">2.3s</p>
                  <p className="text-xs text-muted-foreground">Avg Processing</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-accent">$487</p>
                  <p className="text-xs text-muted-foreground">Avg Transaction</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                  <div>
                    <p className="font-medium text-success">Best Performer</p>
                    <p className="text-sm text-muted-foreground">Stablecoin - 99.1% success rate</p>
                  </div>
                  <Coins className="h-5 w-5 text-success" />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                  <div>
                    <p className="font-medium text-warning">Needs Attention</p>
                    <p className="text-sm text-muted-foreground">Credit Cards - 3.2% decline rate</p>
                  </div>
                  <CreditCard className="h-5 w-5 text-warning" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}