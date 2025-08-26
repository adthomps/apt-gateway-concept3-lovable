import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TransactionDetailModal } from "@/components/transactions/TransactionDetailModal";
import { useState } from "react";
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download,
  Eye,
  RefreshCw,
  Calendar,
  DollarSign,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  RotateCcw,
  TrendingUp
} from "lucide-react";

export function TransactionsSection() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const transactions = [
    { 
      id: "40000123456",
      date: "2024-01-20 14:32", 
      customer: "John Smith", 
      email: "john@example.com",
      amount: "$245.00", 
      status: "settled",
      type: "Credit Card",
      method: "Visa ****1234",
      routingPath: [
        { account: "Primary USD", status: "success", processingTime: "1.2s", merchantId: "AUTH001", gatewayResponse: "Approved" }
      ],
      billingAddress: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "USA"
      },
      ipAddress: "192.168.1.100",
      deviceFingerprint: "d4f5e6g7h8i9j0k1l2m3n4o5p6q7r8s9",
      riskFactors: ["New device detected"],
      totalProcessingTime: "1.2s",
      fees: {
        processing: "$7.35",
        interchange: "$2.45",
        total: "$9.80"
      },
      fraudScore: 12,
      declineReason: null
    },
    { 
      id: "40000123457",
      date: "2024-01-20 13:15", 
      customer: "Sarah Johnson", 
      email: "sarah@company.com",
      amount: "$1,299.99", 
      status: "pending",
      type: "ACH",
      method: "Bank ****5678",
      routingPath: [
        { account: "Primary USD", status: "processing", processingTime: "0.8s", merchantId: "AUTH001" }
      ],
      billingAddress: {
        street: "456 Business Ave",
        city: "Los Angeles",
        state: "CA",
        zip: "90210",
        country: "USA"
      },
      ipAddress: "10.0.0.50",
      totalProcessingTime: "0.8s",
      fees: {
        processing: "$38.99",
        interchange: "$12.99",
        total: "$51.98"
      },
      fraudScore: 8,
      declineReason: null
    },
    { 
      id: "40000123458",
      date: "2024-01-20 12:08", 
      customer: "Mike Wilson", 
      email: "mike.w@email.com",
      amount: "$89.50", 
      status: "failed",
      type: "Credit Card",
      method: "MC ****9012",
      routingPath: [
        { account: "Primary USD", status: "declined", processingTime: "0.9s", reason: "Insufficient funds", merchantId: "AUTH001", gatewayResponse: "Declined - NSF" },
        { account: "Backup Account", status: "declined", processingTime: "1.1s", reason: "Card declined", merchantId: "AUTH002", gatewayResponse: "Declined - Card" }
      ],
      billingAddress: {
        street: "789 Oak St",
        city: "Chicago",
        state: "IL",
        zip: "60601",
        country: "USA"
      },
      ipAddress: "172.16.0.20",
      riskFactors: ["Multiple recent failures", "High-risk IP"],
      totalProcessingTime: "2.0s",
      fraudScore: 23,
      declineReason: "Card declined by issuer"
    },
    { 
      id: "40000123459",
      date: "2024-01-20 11:47", 
      customer: "Tech Solutions Inc", 
      email: "billing@techsol.com",
      amount: "$2,450.00", 
      status: "settled",
      type: "Credit Card",
      method: "Amex ****3456",
      routingPath: [
        { account: "High-Risk Backup", status: "success", processingTime: "2.1s" }
      ],
      fraudScore: 5,
      declineReason: null
    },
    { 
      id: "40000123460",
      date: "2024-01-20 10:22", 
      customer: "Lisa Chen", 
      email: "lisa@startup.io",
      amount: "$67.99", 
      status: "settled",
      type: "Credit Card",
      method: "Visa ****7890",
      routingPath: [
        { account: "Primary USD", status: "declined", processingTime: "0.7s", reason: "Daily limit reached" },
        { account: "Backup Account", status: "success", processingTime: "1.3s" }
      ],
      fraudScore: 15,
      declineReason: null
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">View and manage all payment transactions</p>
        </div>
        <div className="flex items-center space-x-2">
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

      {/* Filters */}
      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter Transactions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Transaction ID, customer..." className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <div className="relative">
                <Calendar className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input type="date" className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount Range</label>
              <div className="relative">
                <DollarSign className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Min - Max" className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select className="w-full p-2 border border-input rounded-md bg-background text-foreground">
                <option value="">All Statuses</option>
                <option value="settled">Settled</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Transaction History</span>
            <Badge variant="secondary" className="ml-2">
              {transactions.length} results
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="text-left p-4 font-medium">Transaction ID</th>
                  <th className="text-left p-4 font-medium">Date & Time</th>
                  <th className="text-left p-4 font-medium">Customer</th>
                  <th className="text-left p-4 font-medium">Amount</th>
                  <th className="text-left p-4 font-medium">Payment Method</th>
                  <th className="text-left p-4 font-medium">Routing Path</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={transaction.id} className={index % 2 === 0 ? "bg-background/50" : "bg-muted/10"}>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-sm">{transaction.id}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <p className="text-xs text-muted-foreground">{transaction.type}</p>
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${
                              transaction.fraudScore < 20 ? 'bg-green-500' : 
                              transaction.fraudScore < 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <span className="text-xs text-muted-foreground">
                              Risk: {transaction.fraudScore}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{transaction.date}</p>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-sm">{transaction.customer}</p>
                        <p className="text-xs text-muted-foreground">{transaction.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold">{transaction.amount}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{transaction.method}</p>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        {transaction.routingPath.map((route, routeIndex) => (
                          <div key={routeIndex} className="flex items-center space-x-2 text-xs">
                            <span className="text-muted-foreground">{route.account}</span>
                            {route.status === "success" && <CheckCircle className="h-3 w-3 text-green-500" />}
                            {route.status === "declined" && <AlertTriangle className="h-3 w-3 text-red-500" />}
                            {route.status === "processing" && <Clock className="h-3 w-3 text-blue-500" />}
                            <span className="text-muted-foreground">({route.processingTime})</span>
                            {routeIndex < transaction.routingPath.length - 1 && (
                              <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                        ))}
                        {transaction.routingPath.length > 1 && (
                          <div className="flex items-center space-x-1 mt-1">
                            <RotateCcw className="h-3 w-3 text-blue-500" />
                            <span className="text-xs text-blue-600">Auto-retried</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            transaction.status === "settled" ? "default" :
                            transaction.status === "pending" ? "secondary" : "destructive"
                          }
                        >
                          {transaction.status}
                        </Badge>
                        {transaction.routingPath.length > 1 && transaction.status === "settled" && (
                          <Badge variant="outline" className="text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Recovered
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setIsDetailModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing 1-{transactions.length} of 2,847 transactions
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <TransactionDetailModal
        transaction={selectedTransaction}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedTransaction(null);
        }}
      />
    </div>
  );
}