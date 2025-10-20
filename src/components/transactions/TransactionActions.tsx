import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  RefreshCw,
  Ban,
  Send,
  Tag,
  FileText,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Transaction } from "@/data/mock-transactions";

interface TransactionActionsProps {
  transaction: Transaction;
}

export function TransactionActions({ transaction }: TransactionActionsProps) {
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [refundAmount, setRefundAmount] = useState(transaction.amountValue.toString());
  const [refundReason, setRefundReason] = useState("");
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [note, setNote] = useState("");
  const { toast } = useToast();

  const canRefund = transaction.status === 'settled';
  const canVoid = transaction.status === 'pending';

  const handleRefund = () => {
    toast({
      title: "Refund processed",
      description: `Refunded $${refundAmount} to ${transaction.customer}`,
    });
    setRefundDialogOpen(false);
    setRefundAmount(transaction.amountValue.toString());
    setRefundReason("");
  };

  const handleVoid = () => {
    toast({
      title: "Transaction voided",
      description: `Transaction ${transaction.id} has been voided`,
    });
  };

  const handleResendReceipt = () => {
    toast({
      title: "Receipt sent",
      description: `Receipt sent to ${transaction.customerEmail}`,
    });
  };

  const handleAddNote = () => {
    toast({
      title: "Note added",
      description: "Your note has been saved to this transaction",
    });
    setNoteDialogOpen(false);
    setNote("");
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => setRefundDialogOpen(true)}
            disabled={!canRefund}
            className="justify-start"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refund
          </Button>
          <Button
            variant="outline"
            onClick={handleVoid}
            disabled={!canVoid}
            className="justify-start"
          >
            <Ban className="h-4 w-4 mr-2" />
            Void
          </Button>
          <Button
            variant="outline"
            onClick={handleResendReceipt}
            className="justify-start"
          >
            <Send className="h-4 w-4 mr-2" />
            Resend Receipt
          </Button>
          <Button
            variant="outline"
            onClick={() => setNoteDialogOpen(true)}
            className="justify-start"
          >
            <FileText className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>
      </div>

      <Separator />

      {/* Transaction Status */}
      <div>
        <h3 className="text-sm font-medium mb-3">Transaction Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-sm">Current Status</span>
            <Badge variant={
              transaction.status === 'settled' ? 'default' :
              transaction.status === 'pending' ? 'secondary' :
              transaction.status === 'failed' ? 'destructive' :
              'outline'
            }>
              {transaction.status}
            </Badge>
          </div>
          
          {canRefund && (
            <div className="flex items-start gap-2 p-3 bg-success/10 border border-success/20 rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Eligible for refund</p>
                <p className="text-muted-foreground text-xs">
                  You can issue a full or partial refund for this transaction
                </p>
              </div>
            </div>
          )}

          {canVoid && (
            <div className="flex items-start gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <AlertCircle className="h-4 w-4 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Pending settlement</p>
                <p className="text-muted-foreground text-xs">
                  This transaction can be voided before settlement
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Audit Log */}
      <div>
        <h3 className="text-sm font-medium mb-3">Audit Log</h3>
        <div className="space-y-2">
          <div className="flex items-start gap-3 text-sm">
            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
            <div className="flex-1">
              <p className="font-medium">Transaction created</p>
              <p className="text-muted-foreground text-xs">{transaction.time}</p>
            </div>
          </div>
          
          {transaction.status === 'settled' && (
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-success mt-2" />
              <div className="flex-1">
                <p className="font-medium">Payment captured</p>
                <p className="text-muted-foreground text-xs">2 minutes after creation</p>
              </div>
            </div>
          )}

          {transaction.status === 'failed' && (
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-destructive mt-2" />
              <div className="flex-1">
                <p className="font-medium">Payment failed</p>
                <p className="text-muted-foreground text-xs">Insufficient funds</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Refund Dialog */}
      <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle>Issue Refund</DialogTitle>
            <DialogDescription>
              Refund {transaction.customer} for transaction {transaction.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="refund-amount">Refund Amount</Label>
              <Input
                id="refund-amount"
                type="number"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                max={transaction.amountValue}
                step="0.01"
              />
              <p className="text-xs text-muted-foreground">
                Maximum: ${transaction.amountValue.toFixed(2)}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="refund-reason">Reason (Optional)</Label>
              <Select value={refundReason} onValueChange={setRefundReason}>
                <SelectTrigger id="refund-reason">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="duplicate">Duplicate charge</SelectItem>
                  <SelectItem value="fraudulent">Fraudulent</SelectItem>
                  <SelectItem value="customer-request">Customer request</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRefundDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRefund}>Issue Refund</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Note Dialog */}
      <Dialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogDescription>
              Add an internal note to this transaction
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNote}>Save Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
