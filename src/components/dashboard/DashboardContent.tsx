import { useState } from "react";
import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DateRangePicker, DateRange } from "@/components/ui/date-range-picker";
import { LimitedDashboard } from "./LimitedDashboard";
import { subDays } from "date-fns";
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle,
  Users,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Filter
} from "lucide-react";

interface DashboardContentProps {
  userRole?: "admin" | "operator" | "viewer" | "limited";
}

export function DashboardContent({ userRole = "admin" }: DashboardContentProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 6),
    to: new Date()
  });

  // Show limited dashboard for restricted users
  if (userRole !== "admin") {
    return <LimitedDashboard userRole={userRole} />;
  }
  const metrics = [
    {
      title: "Total Revenue",
      value: "$128,492.50",
      change: "+12.5% from last month",
      changeType: "positive" as const,
      icon: DollarSign
    },
    {
      title: "Transactions",
      value: "2,847",
      change: "+8.2% from last month", 
      changeType: "positive" as const,
      icon: CreditCard
    },
    {
      title: "Approval Rate",
      value: "94.3%",
      change: "-0.8% from last month",
      changeType: "negative" as const,
      icon: TrendingUp
    },
    {
      title: "Active Customers",
      value: "1,293",
      change: "+156 new this month",
      changeType: "positive" as const,
      icon: Users
    }
  ];

  const recentTransactions = [
    { id: "TXN001", amount: "$245.00", status: "settled", customer: "John Doe", time: "2 min ago" },
    { id: "TXN002", amount: "$89.99", status: "pending", customer: "Jane Smith", time: "5 min ago" },
    { id: "TXN003", amount: "$1,250.00", status: "settled", customer: "Acme Corp", time: "12 min ago" },
    { id: "TXN004", amount: "$67.50", status: "failed", customer: "Bob Wilson", time: "18 min ago" },
    { id: "TXN005", amount: "$399.99", status: "settled", customer: "Tech Solutions", time: "25 min ago" },
  ];

  const alerts = [
    { type: "warning", message: "3 chargebacks this week (+2 from last week)" },
    { type: "info", message: "Account updater processed 15 card updates" },
    { type: "success", message: "Payment gateway uptime: 99.98%" }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Date Range Picker */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Monitor your payment processing performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <DateRangePicker 
            date={dateRange}
            onDateChange={setDateRange}
          />
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      {/* Metrics Grid - Desktop first, responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Main Content Grid - Desktop optimized */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Recent Transactions */}
        <Card className="xl:col-span-2 bg-gradient-card shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <span>Recent Transactions</span>
            </CardTitle>
            <Button variant="outline" size="sm" className="flex items-center space-x-1">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth gap-2 sm:gap-0">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {transaction.status === "settled" && <CheckCircle className="h-4 w-4 text-success" />}
                      {transaction.status === "pending" && <Clock className="h-4 w-4 text-warning" />}
                      {transaction.status === "failed" && <XCircle className="h-4 w-4 text-destructive" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{transaction.customer}</p>
                      <p className="text-xs text-muted-foreground truncate">{transaction.id} • {transaction.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end sm:flex-col sm:items-end gap-2 sm:gap-1 flex-shrink-0">
                    <p className="font-semibold">{transaction.amount}</p>
                    <Badge 
                      variant={
                        transaction.status === "settled" ? "default" :
                        transaction.status === "pending" ? "secondary" : "destructive"
                      }
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Transactions
            </Button>
          </CardContent>
        </Card>

        {/* Alerts & Insights */}
        <Card className="bg-gradient-card shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-accent" />
              <span>Alerts & Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="p-3 rounded-lg border border-border bg-background/50">
                <div className="flex items-start space-x-2">
                  {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />}
                  {alert.type === "info" && <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />}
                  {alert.type === "success" && <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />}
                  <p className="text-sm text-foreground">{alert.message}</p>
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-sm mb-2">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Create Payment Link
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Revenue Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Chart visualization will be implemented with actual data</p>
              <p className="text-sm text-muted-foreground mt-1">Revenue trends, payment methods, and success rates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}