import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/data/mock-transactions";
import { ChevronRight, CheckCircle, Clock, XCircle, RotateCcw } from "lucide-react";

interface MobileTransactionCardProps {
  transaction: Transaction;
  onClick: () => void;
}

export function MobileTransactionCard({
  transaction,
  onClick,
}: MobileTransactionCardProps) {
  const getStatusBadge = () => {
    switch (transaction.status) {
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
        return <Badge variant="outline">{transaction.status}</Badge>;
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:bg-muted/50 active:scale-[0.98] transition-all"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-medium truncate">{transaction.customer}</span>
              {getStatusBadge()}
            </div>
            <div className="text-sm text-muted-foreground">
              {transaction.time}
            </div>
          </div>
          
          <div className="flex items-center gap-3 ml-2">
            <div className="text-right">
              <div className="font-semibold text-lg whitespace-nowrap">{transaction.amount}</div>
              <div className="text-xs text-muted-foreground">
                {transaction.paymentMethod}
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
