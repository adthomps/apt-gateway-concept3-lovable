import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Shield, TrendingUp, Eye, CheckCircle, XCircle, Clock, Filter, AlertCircle, Activity, DollarSign, Globe } from 'lucide-react';

interface RiskTransaction {
  id: string;
  amount: string;
  customer: string;
  riskScore: number;
  status: 'hold' | 'approved' | 'declined' | 'under_review';
  triggers: string[];
  timestamp: string;
  location: string;
  paymentMethod: string;
}

interface RiskMetric {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: any;
}

export function RiskManagement() {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const riskMetrics: RiskMetric[] = [
    {
      title: 'Risk Score Average',
      value: '23.4',
      change: '-5.2% from last week',
      changeType: 'positive',
      icon: Shield
    },
    {
      title: 'Flagged Transactions',
      value: '47',
      change: '+12% from yesterday',
      changeType: 'negative',
      icon: AlertTriangle
    },
    {
      title: 'False Positive Rate',
      value: '8.3%',
      change: '-2.1% from last month',
      changeType: 'positive',
      icon: TrendingUp
    },
    {
      title: 'Active Rules',
      value: '24',
      change: '3 rules updated today',
      changeType: 'neutral',
      icon: Activity
    }
  ];

  const flaggedTransactions: RiskTransaction[] = [
    {
      id: 'TXN-R001',
      amount: '$2,450.00',
      customer: 'John Smith',
      riskScore: 87,
      status: 'hold',
      triggers: ['High Amount', 'New Location', 'Velocity'],
      timestamp: '5 min ago',
      location: 'New York, NY',
      paymentMethod: 'Credit Card ***4532'
    },
    {
      id: 'TXN-R002',
      amount: '$890.99',
      customer: 'Sarah Johnson',
      riskScore: 72,
      status: 'under_review',
      triggers: ['Device Mismatch', 'IP Risk'],
      timestamp: '12 min ago',
      location: 'Los Angeles, CA',
      paymentMethod: 'ACH ***9876'
    },
    {
      id: 'TXN-R003',
      amount: '$156.00',
      customer: 'Mike Chen',
      riskScore: 65,
      status: 'approved',
      triggers: ['Minor Velocity'],
      timestamp: '18 min ago',
      location: 'Chicago, IL',
      paymentMethod: 'Credit Card ***1234'
    },
    {
      id: 'TXN-R004',
      amount: '$3,200.00',
      customer: 'Anonymous User',
      riskScore: 95,
      status: 'declined',
      triggers: ['High Risk Location', 'BIN Risk', 'No History'],
      timestamp: '25 min ago',
      location: 'Unknown',
      paymentMethod: 'Credit Card ***0000'
    }
  ];

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-destructive';
    if (score >= 60) return 'text-warning';
    return 'text-success';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'hold':
        return <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">On Hold</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-success/20 text-success border-success/30">Approved</Badge>;
      case 'declined':
        return <Badge variant="destructive">Declined</Badge>;
      case 'under_review':
        return <Badge variant="outline" className="border-primary/30 text-primary">Under Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleTransactionAction = (transactionId: string, action: 'approve' | 'decline' | 'review') => {
    console.log(`${action} transaction ${transactionId}`);
    // Implementation would update transaction status
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span>Risk Management</span>
          </h1>
          <p className="text-muted-foreground">Monitor and manage fraud detection and risk assessment</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Configure Rules
          </Button>
          <Button size="sm" className="bg-gradient-primary">
            <AlertCircle className="h-4 w-4 mr-2" />
            View Alerts
          </Button>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {riskMetrics.map((metric, index) => (
          <Card key={index} className="bg-gradient-card shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <p className={`text-xs ${
                    metric.changeType === 'positive' ? 'text-success' :
                    metric.changeType === 'negative' ? 'text-destructive' : 'text-muted-foreground'
                  }`}>
                    {metric.change}
                  </p>
                </div>
                <metric.icon className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="transactions" className="text-xs sm:text-sm">Transactions</TabsTrigger>
          <TabsTrigger value="rules" className="text-xs sm:text-sm">Rules</TabsTrigger>
          <TabsTrigger value="alerts" className="text-xs sm:text-sm">Alerts</TabsTrigger>
          <TabsTrigger value="reports" className="text-xs sm:text-sm">Reports</TabsTrigger>
        </TabsList>

        {/* Flagged Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <Card className="bg-gradient-card shadow-md">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <span>High-Risk Transactions</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="hold">On Hold</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flaggedTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-foreground">{transaction.id}</span>
                              {getStatusBadge(transaction.status)}
                            </div>
                            <span className="text-sm text-muted-foreground">{transaction.timestamp}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">Risk Score:</span>
                            <span className={`font-bold ${getRiskScoreColor(transaction.riskScore)}`}>
                              {transaction.riskScore}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Customer:</span>
                            <p className="font-medium">{transaction.customer}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Amount:</span>
                            <p className="font-bold text-foreground">{transaction.amount}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Location:</span>
                            <p className="font-medium">{transaction.location}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Payment:</span>
                            <p className="font-medium">{transaction.paymentMethod}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm text-muted-foreground">Triggers:</span>
                          {transaction.triggers.map((trigger, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-destructive/30 text-destructive">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      {(transaction.status === 'hold' || transaction.status === 'under_review') && (
                        <div className="flex items-center space-x-2 lg:ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-success text-success hover:bg-success/10"
                            onClick={() => handleTransactionAction(transaction.id, 'approve')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline" 
                            className="border-destructive text-destructive hover:bg-destructive/10"
                            onClick={() => handleTransactionAction(transaction.id, 'decline')}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTransactionAction(transaction.id, 'review')}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Rules Tab */}
        <TabsContent value="rules" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <Card className="bg-gradient-card shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Velocity Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="velocity-enabled">Enable Velocity Checking</Label>
                  <Switch id="velocity-enabled" defaultChecked />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="daily-limit">Daily Transaction Limit</Label>
                    <Input id="daily-limit" placeholder="$5,000" />
                  </div>
                  <div>
                    <Label htmlFor="hourly-count">Hourly Count Limit</Label>
                    <Input id="hourly-count" placeholder="10" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Geographic Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="geo-enabled">Enable Geographic Checks</Label>
                  <Switch id="geo-enabled" defaultChecked />
                </div>
                <div>
                  <Label htmlFor="blocked-countries">Blocked Countries</Label>
                  <Input id="blocked-countries" placeholder="Enter country codes" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="vpn-detection">Block VPN/Proxy</Label>
                  <Switch id="vpn-detection" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card className="bg-gradient-card shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                <span>Active Risk Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                    <div>
                      <p className="font-medium text-destructive">High Risk Activity Detected</p>
                      <p className="text-sm text-muted-foreground">Multiple failed attempts from suspicious IP range</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Clock className="h-4 w-4 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium text-warning">Velocity Threshold Exceeded</p>
                      <p className="text-sm text-muted-foreground">User exceeded daily transaction limit</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <Card className="bg-gradient-card shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Risk Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Risk score trends over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">False Positive Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">False positive rate analysis</p>
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