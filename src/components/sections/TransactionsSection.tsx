import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { ColumnChooser } from "@/components/ui/column-chooser";
import { FilterPanel, FilterConfig } from "@/components/shared/FilterPanel";
import { AdvancedFilterModal } from "@/components/shared/AdvancedFilterModal";
import { ViewsManager } from "@/components/shared/ViewsManager";
import { BulkActions } from "@/components/shared/BulkActions";
import { TransactionDetailModal } from "@/components/transactions/TransactionDetailModal";
import { exportToCSV, SavedView } from "@/lib/views-manager";
import { mockTransactions, Transaction } from "@/data/mock-transactions";
import { getLevelBadgeColor, getCountryFlag } from "@/lib/interchange-calculator";
import {
  Search,
  Download,
  RefreshCw,
  CreditCard,
  Building2,
  Shield,
  CheckCircle,
  Clock,
  XCircle,
  RotateCcw,
  SlidersHorizontal,
  Zap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const allColumns = [
  { id: 'select', label: 'Select' },
  { id: 'id', label: 'Transaction ID' },
  { id: 'time', label: 'Time' },
  { id: 'customer', label: 'Customer' },
  { id: 'amount', label: 'Amount' },
  { id: 'status', label: 'Status' },
  { id: 'paymentMethod', label: 'Payment Method' },
  { id: 'gateway', label: 'Gateway' },
  { id: 'cardBrand', label: 'Card Brand' },
  { id: 'cardType', label: 'Card Type' },
  { id: 'last4', label: 'Last 4' },
  { id: 'issuer', label: 'Issuer' },
  { id: 'level', label: 'Interchange Level' },
  { id: 'cedp', label: 'CEDP' },
  { id: 'riskScore', label: 'Risk Score' },
];

const filterConfigs: FilterConfig[] = [
  {
    id: 'dateRange',
    label: 'Date Range',
    type: 'daterange',
  },
  {
    id: 'status',
    label: 'Status',
    type: 'multiselect',
    options: [
      { value: 'settled', label: 'Settled' },
      { value: 'pending', label: 'Pending' },
      { value: 'failed', label: 'Failed' },
      { value: 'refunded', label: 'Refunded' },
      { value: 'disputed', label: 'Disputed' },
    ],
  },
  {
    id: 'gateway',
    label: 'Gateway',
    type: 'multiselect',
    options: [
      { value: 'Stripe', label: 'Stripe' },
      { value: 'Authorize.net', label: 'Authorize.net' },
      { value: 'Braintree', label: 'Braintree' },
      { value: 'Square', label: 'Square' },
      { value: 'Plaid', label: 'Plaid' },
    ],
  },
  {
    id: 'cardBrand',
    label: 'Card Brand',
    type: 'multiselect',
    options: [
      { value: 'visa', label: 'Visa' },
      { value: 'mastercard', label: 'Mastercard' },
      { value: 'amex', label: 'American Express' },
      { value: 'discover', label: 'Discover' },
    ],
  },
  {
    id: 'amountRange',
    label: 'Amount Range',
    type: 'range',
    min: 0,
    max: 5000,
  },
];

const quickPresets = [
  {
    id: 'today',
    label: 'Today',
    icon: Zap,
    filters: {
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
    },
  },
  {
    id: 'failed',
    label: 'Failed Transactions',
    icon: XCircle,
    filters: {
      status: ['failed'],
    },
  },
  {
    id: 'high-risk',
    label: 'High Risk',
    icon: Shield,
    filters: {
      minRisk: 50,
    },
  },
  {
    id: 'large',
    label: 'Large Transactions',
    icon: CreditCard,
    filters: {
      minAmount: 1000,
    },
  },
];

export function TransactionsSection() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAdvancedModal, setShowAdvancedModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    'select', 'id', 'time', 'customer', 'amount', 'status', 'paymentMethod', 'level', 'riskScore'
  ]);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { toast } = useToast();

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'settled':
        return <Badge variant="default" className="bg-success/20 text-success border-success/30"><CheckCircle className="h-3 w-3 mr-1" />Settled</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      case 'refunded':
        return <Badge variant="outline" className="border-primary/30 text-primary"><RotateCcw className="h-3 w-3 mr-1" />Refunded</Badge>;
      case 'disputed':
        return <Badge variant="destructive" className="bg-destructive/20"><XCircle className="h-3 w-3 mr-1" />Disputed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(txn => {
      // Search filter
      if (searchTerm && !(
        txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      )) {
        return false;
      }

      // Date range filter
      if (filters.dateRange?.from || filters.dateRange?.to) {
        const txnDate = new Date(txn.time);
        if (filters.dateRange.from && txnDate < filters.dateRange.from) return false;
        if (filters.dateRange.to && txnDate > filters.dateRange.to) return false;
      }

      // Status filter (multiselect)
      if (filters.status?.length > 0 && !filters.status.includes(txn.status)) return false;

      // Gateway filter (multiselect)
      if (filters.gateway?.length > 0 && !filters.gateway.includes(txn.gateway)) return false;

      // Card brand filter (multiselect)
      if (filters.cardBrand?.length > 0 && !filters.cardBrand.includes(txn.cardIntelligence?.brand)) return false;

      // Card type filter (multiselect)
      if (filters.cardType?.length > 0 && !filters.cardType.includes(txn.cardIntelligence?.type)) return false;

      // Interchange level filter (multiselect)
      if (filters.level?.length > 0 && !filters.level.includes(txn.cardIntelligence?.level)) return false;

      // Amount range filter
      if (filters.amountRange) {
        const [min, max] = filters.amountRange;
        if (txn.amountValue < min || txn.amountValue > max) return false;
      }

      // Min/Max amount filters
      if (filters.minAmount !== undefined && txn.amountValue < filters.minAmount) return false;
      if (filters.maxAmount !== undefined && txn.amountValue > filters.maxAmount) return false;

      // Risk score filter
      if (filters.riskScore && txn.riskScore) {
        const [min, max] = filters.riskScore;
        if (txn.riskScore < min || txn.riskScore > max) return false;
      }

      // Min/Max risk filters
      if (filters.minRisk !== undefined && (!txn.riskScore || txn.riskScore < filters.minRisk)) return false;
      if (filters.maxRisk !== undefined && (!txn.riskScore || txn.riskScore > filters.maxRisk)) return false;

      // Currency filter
      if (filters.currency && !txn.amount.includes(filters.currency)) return false;

      // Issuer country filter
      if (filters.issuerCountry && txn.cardIntelligence?.issuerCountryCode !== filters.issuerCountry) return false;

      // Commercial card filter
      if (filters.isCommercial && !txn.cardIntelligence?.isCommercial) return false;

      // CEDP filter
      if (filters.cedpEnabled && !txn.cardIntelligence?.cedpEnabled) return false;

      // Customer email filter
      if (filters.customerEmail && !txn.customerEmail.toLowerCase().includes(filters.customerEmail.toLowerCase())) return false;

      // Transaction ID filter
      if (filters.transactionId && !txn.id.toLowerCase().includes(filters.transactionId.toLowerCase())) return false;

      return true;
    });
  }, [mockTransactions, searchTerm, filters]);

  const paginatedTransactions = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredTransactions.slice(start, start + pageSize);
  }, [filteredTransactions, page, pageSize]);

  const columns = useMemo(() => {
    const allColumnDefs = [
      {
        key: 'select',
        header: '',
        cell: (row: Transaction) => (
          <Checkbox
            checked={selectedRows.has(row.id)}
            onCheckedChange={(checked) => {
              const newSelection = new Set(selectedRows);
              if (checked) {
                newSelection.add(row.id);
              } else {
                newSelection.delete(row.id);
              }
              setSelectedRows(newSelection);
            }}
          />
        ),
      },
      {
        key: 'id',
        header: 'ID',
        cell: (row: Transaction) => (
          <span className="font-mono text-sm">{row.id}</span>
        ),
      },
      {
        key: 'time',
        header: 'Time',
        cell: (row: Transaction) => (
          <span className="text-sm text-muted-foreground">{row.time}</span>
        ),
      },
      {
        key: 'customer',
        header: 'Customer',
        cell: (row: Transaction) => (
          <div>
            <p className="font-medium">{row.customer}</p>
            <p className="text-xs text-muted-foreground">{row.customerEmail}</p>
          </div>
        ),
      },
      {
        key: 'amount',
        header: 'Amount',
        cell: (row: Transaction) => (
          <span className="font-bold">{row.amount}</span>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        cell: (row: Transaction) => getStatusBadge(row.status),
      },
      {
        key: 'paymentMethod',
        header: 'Payment Method',
        cell: (row: Transaction) => (
          <span className="text-sm">{row.paymentMethod}</span>
        ),
      },
      {
        key: 'gateway',
        header: 'Gateway',
        cell: (row: Transaction) => (
          <Badge variant="outline" className="text-xs">{row.gateway}</Badge>
        ),
      },
      {
        key: 'cardBrand',
        header: 'Card Brand',
        cell: (row: Transaction) => row.cardIntelligence ? (
          <Badge variant="outline" className="text-xs capitalize">{row.cardIntelligence.brand}</Badge>
        ) : <span className="text-muted-foreground">—</span>,
      },
      {
        key: 'cardType',
        header: 'Card Type',
        cell: (row: Transaction) => row.cardIntelligence ? (
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs capitalize">{row.cardIntelligence.type}</Badge>
            {row.cardIntelligence.isCommercial && (
              <Building2 className="h-3 w-3 text-primary" />
            )}
          </div>
        ) : <span className="text-muted-foreground">—</span>,
      },
      {
        key: 'last4',
        header: 'Last 4',
        cell: (row: Transaction) => row.cardIntelligence ? (
          <span className="font-mono text-sm">•••• {row.cardIntelligence.last4}</span>
        ) : <span className="text-muted-foreground">—</span>,
      },
      {
        key: 'issuer',
        header: 'Issuer',
        cell: (row: Transaction) => row.cardIntelligence ? (
          <span className="text-sm">
            {getCountryFlag(row.cardIntelligence.issuerCountryCode)} {row.cardIntelligence.issuerCountry}
          </span>
        ) : <span className="text-muted-foreground">—</span>,
      },
      {
        key: 'level',
        header: 'Level',
        cell: (row: Transaction) => row.cardIntelligence ? (
          <Badge className={getLevelBadgeColor(row.cardIntelligence.level)}>
            {row.cardIntelligence.level}
          </Badge>
        ) : <span className="text-muted-foreground">—</span>,
      },
      {
        key: 'cedp',
        header: 'CEDP',
        cell: (row: Transaction) => row.cardIntelligence?.cedpEnabled ? (
          <Badge className="bg-success/20 text-success border-success/30 text-xs">
            <Shield className="h-3 w-3" />
          </Badge>
        ) : <span className="text-muted-foreground">—</span>,
      },
      {
        key: 'riskScore',
        header: 'Risk Score',
        cell: (row: Transaction) => row.riskScore ? (
          <Badge variant={
            row.riskScore > 50 ? 'destructive' :
            row.riskScore > 25 ? 'secondary' :
            'outline'
          } className="text-xs">
            {row.riskScore}
          </Badge>
        ) : <span className="text-muted-foreground">—</span>,
      },
    ];

    return allColumnDefs.filter(col => selectedColumns.includes(col.key));
  }, [selectedColumns, selectedRows]);

  const handleLoadView = (view: SavedView) => {
    setFilters(view.filters);
    setSelectedColumns(view.columns);
    toast({
      title: "View loaded",
      description: `"${view.name}" has been applied`,
    });
  };

  const handleExport = () => {
    const exportData = (selectedRows.size > 0 
      ? filteredTransactions.filter(t => selectedRows.has(t.id))
      : filteredTransactions
    ).map(t => ({
      ID: t.id,
      Time: t.time,
      Customer: t.customer,
      Email: t.customerEmail,
      Amount: t.amount,
      Status: t.status,
      PaymentMethod: t.paymentMethod,
      Gateway: t.gateway,
      Fee: t.fee,
      Net: t.net,
    }));

    exportToCSV(exportData, 'transactions');
    toast({
      title: "Export complete",
      description: `Exported ${exportData.length} transactions to CSV`,
    });
  };

  const handleBulkRefund = () => {
    toast({
      title: "Bulk refund initiated",
      description: `Processing refunds for ${selectedRows.size} transactions`,
    });
    setSelectedRows(new Set());
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshed",
      description: "Transaction data has been refreshed",
    });
  };

  const applyQuickPreset = (preset: typeof quickPresets[0]) => {
    setFilters(preset.filters);
    toast({
      title: "Quick filter applied",
      description: `Showing ${preset.label.toLowerCase()}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-primary" />
            Transactions
          </h1>
          <p className="text-muted-foreground">View and manage all payment transactions</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <ViewsManager
            context="transactions"
            currentFilters={filters}
            currentColumns={selectedColumns}
            onLoadView={handleLoadView}
          />
          <ColumnChooser
            columns={allColumns}
            selectedColumns={selectedColumns}
            onSelectionChange={setSelectedColumns}
          />
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by transaction ID, customer name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvancedModal(true)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Advanced
            </Button>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2">
            {quickPresets.map((preset) => (
              <Button
                key={preset.id}
                variant="outline"
                size="sm"
                onClick={() => applyQuickPreset(preset)}
                className="h-8"
              >
                <preset.icon className="h-3 w-3 mr-1" />
                {preset.label}
              </Button>
            ))}
          </div>

          <FilterPanel
            filters={filterConfigs}
            values={filters}
            onValuesChange={setFilters}
          />
        </CardContent>
      </Card>

      {/* Bulk Actions Bar */}
      <BulkActions
        selectedCount={selectedRows.size}
        onClearSelection={() => setSelectedRows(new Set())}
        onExport={handleExport}
        onRefund={handleBulkRefund}
        onSendReceipt={() => {
          toast({ title: "Receipts sent", description: `Sent ${selectedRows.size} receipts` });
          setSelectedRows(new Set());
        }}
      />

      {/* Transactions Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable
            data={paginatedTransactions}
            columns={columns}
            onRowClick={(row) => {
              setSelectedTransaction(row);
              setShowModal(true);
            }}
            emptyMessage="No transactions found"
            pagination={{
              page,
              pageSize,
              total: filteredTransactions.length,
              onPageChange: setPage,
            }}
          />
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

      {/* Advanced Filter Modal */}
      <AdvancedFilterModal
        open={showAdvancedModal}
        onOpenChange={setShowAdvancedModal}
        filters={filters}
        onApply={setFilters}
        onReset={() => setFilters({})}
      />
    </div>
  );
}
