import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KPITile } from "@/components/ui/kpi-tile";
import { EmptyState } from "@/components/ui/empty-state";
import { EnhancedDataAssistant } from "@/components/transactions/EnhancedDataAssistant";
import { 
  FileText, 
  Plus, 
  Send, 
  Eye,
  DollarSign,
  Clock,
  CheckCircle,
  Filter
} from "lucide-react";
import { toast } from "sonner";

export function InvoicesSection() {
  const handleAutoFill = () => {
    toast.success("AI auto-fill feature coming soon!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground">Create and manage invoices for your customers</p>
        </div>
        <Button className="bg-gradient-primary shadow-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPITile
          title="Total Invoices"
          value="2,847"
          change="+12.5% from last month"
          changeType="positive"
          icon={FileText}
        />
        <KPITile
          title="Paid Invoices"
          value="$128,492"
          change="+8.2% from last month"
          changeType="positive"
          icon={CheckCircle}
        />
        <KPITile
          title="Pending"
          value="$24,120"
          change="42 invoices"
          changeType="neutral"
          icon={Clock}
        />
        <KPITile
          title="Overdue"
          value="$5,240"
          change="8 invoices"
          changeType="negative"
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Invoices</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={FileText}
                title="No invoices yet"
                description="Create your first invoice to get started with billing your customers"
                action={{
                  label: "Create Invoice",
                  onClick: () => console.log("Create invoice")
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Data Assistant Sidebar */}
        <div>
          <EnhancedDataAssistant
            l3EnforceMode={false}
            estimatedSavings="$2.45"
            onAutoFill={handleAutoFill}
          />
        </div>
      </div>
    </div>
  );
}
