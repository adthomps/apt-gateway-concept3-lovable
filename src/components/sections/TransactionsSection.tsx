import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRangePicker, DateRange } from '@/components/ui/date-range-picker';
import { TransactionDetailModal } from '@/components/transactions/TransactionDetailModal';
import { subDays } from 'date-fns';
import { 
  CreditCard, 
  Download, 
  RefreshCw, 
  Eye, 
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  RotateCcw,
  DollarSign
} from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  customer: string;
  email?: string;
  amount: string;
  status: 'settled' | 'pending' | 'failed' | 'refunded' | 'void' | 'chargeback' | 'risk_hold';
  paymentMethod: string;
  type?: string;
  method?: string;
  riskScore?: number;
  fraudScore?: number;
  location: string;
  routingPath: string[];
}

export function TransactionsSection() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 6),
    to: new Date()
  });
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const transactions: Transaction[] = [
    {
      id: 'TXN-001',
      date: '2024-03-15 14:32:00',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: '$245.00',
      status: 'settled',
      paymentMethod: 'Visa ****4532',
      type: 'Credit Card',
      method: 'Visa ****4532',
      fraudScore: 12,
      location: 'New York, NY',
      routingPath: ['Stripe', 'Chase Bank']
    },
    {
      id: 'TXN-002',
      date: '2024-03-15 14:28:00',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      amount: '$89.99',
      status: 'pending',
      paymentMethod: 'Mastercard ****8765',
      type: 'Credit Card',
      method: 'Mastercard ****8765',
      fraudScore: 8,
      location: 'Los Angeles, CA',
      routingPath: ['Square', 'Wells Fargo']
    },
    {
      id: 'TXN-003',
      date: '2024-03-15 14:15:00',
      customer: 'Acme Corp',
      email: 'billing@acme.com',
      amount: '$1,250.00',
      status: 'risk_hold',
      paymentMethod: 'ACH ****9876',
      type: 'ACH',
      method: 'ACH ****9876',
      riskScore: 85,
      fraudScore: 85,
      location: 'Chicago, IL',
      routingPath: ['PayPal', 'Bank of America']
    },
    {
      id: 'TXN-004',
      date: '2024-03-15 13:45:00',
      customer: 'Bob Wilson',
      email: 'bob@email.com',
      amount: '$67.50',
      status: 'failed',
      paymentMethod: 'Visa ****1234',
      type: 'Credit Card',
      method: 'Visa ****1234',
      fraudScore: 23,
      location: 'Miami, FL',
      routingPath: ['Stripe', 'Declined']
    },
    {
      id: 'TXN-005',
      date: '2024-03-15 13:22:00',
      customer: 'Tech Solutions',
      email: 'payments@techsol.com',
      amount: '$399.99',
      status: 'settled',
      paymentMethod: 'USDC ****abc123',
      type: 'Stablecoin',
      method: 'USDC ****abc123',
      fraudScore: 5,
      location: 'San Francisco, CA',
      routingPath: ['Circle', 'Coinbase']
    },
    {
      id: 'TXN-006',
      date: '2024-03-15 12:55:00',
      customer: 'Global Industries',
      email: 'billing@global.com',
      amount: '$2,800.00',
      status: 'chargeback',
      paymentMethod: 'Amex ****5678',
      type: 'Credit Card',
      method: 'Amex ****5678',
      fraudScore: 15,
      location: 'Boston, MA',
      routingPath: ['Square', 'American Express']
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'settled':
        return <Badge variant="default" className="bg-success/20 text-success border-success/30">Settled</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'refunded':
        return <Badge variant="outline" className="border-primary/30 text-primary">Refunded</Badge>;
      case 'void':
        return <Badge variant="outline" className="text-muted-foreground">Void</Badge>;
      case 'chargeback':
        return <Badge variant="destructive" className="bg-destructive/20">Chargeback</Badge>;
      case 'risk_hold':
        return <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">Risk Hold</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'settled':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'risk_hold':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'failed':
      case 'chargeback':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'refunded':
        return <RotateCcw className="h-4 w-4 text-primary" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const handleTransactionAction = (transactionId: string, action: 'void' | 'refund' | 'approve' | 'decline') => {
    console.log(`${action} transaction ${transactionId}`);
    // Implementation would handle the specific action
  };

  const canPerformActions = (status: string) => {
    return ['settled', 'pending', 'risk_hold'].includes(status);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesSearch = transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-primary" />
            <span>Transactions</span>
          </h1>
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
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Filter className="h-5 w-5 text-primary" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
              <Input
                placeholder="Customer name or Transaction ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Date Range</label>
              <DateRangePicker
                date={dateRange}
                onDateChange={setDateRange}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="settled">Settled</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="risk_hold">Risk Hold</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                  <SelectItem value="chargeback">Chargeback</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Amount Range</label>
              <div className="flex items-center space-x-2">
                <Input placeholder="Min" className="w-20" />
                <span className="text-muted-foreground">-</span>
                <Input placeholder="Max" className="w-20" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <span>Transaction History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(transaction.status)}
                        <span className="font-medium text-foreground">{transaction.id}</span>
                        {getStatusBadge(transaction.status)}
                        {transaction.riskScore && (
                          <Badge variant="outline" className="border-warning/30 text-warning">
                            Risk: {transaction.riskScore}
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{transaction.date}</span>
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
                        <span className="text-muted-foreground">Payment Method:</span>
                        <p className="font-medium">{transaction.paymentMethod}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <p className="font-medium">{transaction.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-muted-foreground">Routing:</span>
                      {transaction.routingPath.map((path, index) => (
                        <span key={index} className="flex items-center">
                          {index > 0 && <span className="mx-1 text-muted-foreground">→</span>}
                          <Badge variant="outline" className="text-xs">{path}</Badge>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 lg:ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(transaction)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                    
                    {canPerformActions(transaction.status) && (
                      <>
                        {transaction.status === 'risk_hold' && (
                          <>
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
                          </>
                        )}
                        
                        {(transaction.status === 'settled' || transaction.status === 'pending') && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-warning text-warning hover:bg-warning/10"
                              onClick={() => handleTransactionAction(transaction.id, 'void')}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Void
                            </Button>
                            {transaction.status === 'settled' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-primary text-primary hover:bg-primary/10"
                                onClick={() => handleTransactionAction(transaction.id, 'refund')}
                              >
                                <RotateCcw className="h-4 w-4 mr-1" />
                                Refund
                              </Button>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <span className="text-sm text-muted-foreground">Page 1 of 1</span>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          open={showModal}
          onOpenChange={setShowModal}
        />
      )}
    </div>
  );
}