import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  FileText,
  Repeat,
  CreditCard,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { Transaction } from "@/data/mock-transactions";
import { mockTransactions } from "@/data/mock-transactions";
import { mockCustomers } from "@/data/mock-customers";
import { useNavigate } from "react-router-dom";

interface RelatedEntitiesProps {
  transaction: Transaction;
}

export function RelatedEntities({ transaction }: RelatedEntitiesProps) {
  const navigate = useNavigate();
  
  // Find customer
  const customer = mockCustomers.find(c => c.id === transaction.customerId);
  
  // Find related transactions from same customer
  const relatedTransactions = mockTransactions
    .filter(t => t.customerId === transaction.customerId && t.id !== transaction.id)
    .slice(0, 5);

  const handleViewCustomer = () => {
    navigate(`/customers?id=${transaction.customerId}`);
  };

  return (
    <div className="space-y-6">
      {/* Customer Information */}
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <User className="h-4 w-4" />
          Customer
        </h3>
        {customer ? (
          <div className="p-4 bg-muted/50 rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{customer.name}</p>
                <p className="text-sm text-muted-foreground">{customer.email}</p>
              </div>
              <Badge variant="secondary">{customer.status}</Badge>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Lifetime Value</p>
                <p className="font-medium">${customer.lifetimeValue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Transactions</p>
                <p className="font-medium">{customer.totalTransactions}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Joined</p>
                <p className="font-medium">{customer.joinedDate.toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Payment Methods</p>
                <p className="font-medium">{customer.paymentMethods}</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleViewCustomer}
            >
              View Customer Profile
              <ExternalLink className="h-3 w-3 ml-2" />
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No customer information available</p>
        )}
      </div>

      <Separator />

      {/* Related Transactions */}
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Repeat className="h-4 w-4" />
          Previous Transactions
        </h3>
        {relatedTransactions.length > 0 ? (
          <div className="space-y-2">
            {relatedTransactions.map((txn) => (
              <div
                key={txn.id}
                className="p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer"
                onClick={() => navigate(`/transactions?id=${txn.id}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm">{txn.id}</span>
                  <Badge variant={
                    txn.status === 'settled' ? 'default' :
                    txn.status === 'pending' ? 'secondary' :
                    txn.status === 'failed' ? 'destructive' :
                    'outline'
                  }>
                    {txn.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{txn.time}</span>
                  <span className="font-medium">{txn.amount}</span>
                </div>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => navigate(`/transactions?customer=${transaction.customerId}`)}
            >
              View All Transactions
              <ArrowRight className="h-3 w-3 ml-2" />
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No previous transactions found</p>
        )}
      </div>

      <Separator />

      {/* Payment Method */}
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Payment Method
        </h3>
        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Method</span>
            <span className="font-medium">{transaction.paymentMethod}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Gateway</span>
            <span className="font-medium">{transaction.gateway}</span>
          </div>
          {transaction.cardIntelligence && (
            <>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Card Type</span>
                <span className="font-medium capitalize">{transaction.cardIntelligence.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Issuer</span>
                <span className="font-medium">{transaction.cardIntelligence.issuerCountry}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Invoice Link (if applicable) */}
      {transaction.description?.includes('Invoice') && (
        <>
          <Separator />
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Related Invoice
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => navigate('/invoices')}
            >
              View Invoice
              <ExternalLink className="h-3 w-3 ml-2" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
