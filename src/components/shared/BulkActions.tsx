import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  RefreshCw, 
  Tag, 
  Trash2, 
  X,
  FileText,
  Send
} from "lucide-react";

interface BulkActionsProps {
  selectedCount: number;
  onClearSelection: () => void;
  onExport: () => void;
  onRefund?: () => void;
  onTag?: () => void;
  onDelete?: () => void;
  onSendReceipt?: () => void;
}

export function BulkActions({
  selectedCount,
  onClearSelection,
  onExport,
  onRefund,
  onTag,
  onDelete,
  onSendReceipt,
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-primary/10 border-b border-border">
      <Badge variant="secondary" className="px-3">
        {selectedCount} selected
      </Badge>
      
      <div className="flex items-center gap-2 ml-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={onExport}
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-background">
            <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {onSendReceipt && (
              <DropdownMenuItem onClick={onSendReceipt}>
                <Send className="h-4 w-4 mr-2" />
                Send Receipts
              </DropdownMenuItem>
            )}
            
            {onTag && (
              <DropdownMenuItem onClick={onTag}>
                <Tag className="h-4 w-4 mr-2" />
                Add Tags
              </DropdownMenuItem>
            )}
            
            <DropdownMenuItem onClick={onExport}>
              <FileText className="h-4 w-4 mr-2" />
              Export to CSV
            </DropdownMenuItem>
            
            {onRefund && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onRefund} className="text-destructive">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refund Selected
                </DropdownMenuItem>
              </>
            )}
            
            {onDelete && (
              <DropdownMenuItem onClick={onDelete} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
