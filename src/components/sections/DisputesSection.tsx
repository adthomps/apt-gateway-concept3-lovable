import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KPITile } from "@/components/ui/kpi-tile";
import { 
  AlertTriangle, 
  Shield,
  DollarSign,
  TrendingDown,
  Filter,
  Upload
} from "lucide-react";

export function DisputesSection() {
  const disputes = [
    {
      id: "DSP001",
      transactionId: "TXN-1234",
      amount: "$245.00",
      reason: "Fraudulent",
      status: "needs_response",
      dueDate: "2025-02-01",
      customer: "John Doe"
    },
    {
      id: "DSP002",
      transactionId: "TXN-5678",
      amount: "$89.99",
      reason: "Product not received",
      status: "under_review",
      dueDate: "2025-02-05",
      customer: "Jane Smith"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Disputes</h1>
          <p className="text-muted-foreground">Manage chargebacks and dispute responses</p>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPITile
          title="Open Disputes"
          value="12"
          change="2 new this week"
          changeType="negative"
          icon={AlertTriangle}
        />
        <KPITile
          title="Disputed Amount"
          value="$5,240"
          change="+12% from last month"
          changeType="negative"
          icon={DollarSign}
        />
        <KPITile
          title="Win Rate"
          value="68%"
          change="+5% from last month"
          changeType="positive"
          icon={Shield}
        />
        <KPITile
          title="Dispute Rate"
          value="0.8%"
          change="-0.2% from last month"
          changeType="positive"
          icon={TrendingDown}
        />
      </div>

      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle>Active Disputes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {disputes.map((dispute) => (
              <div key={dispute.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">{dispute.id}</p>
                    <Badge variant={dispute.status === "needs_response" ? "destructive" : "secondary"}>
                      {dispute.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {dispute.transactionId} • {dispute.customer} • {dispute.reason}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Due: {dispute.dueDate}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="font-semibold">{dispute.amount}</p>
                  <Button size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Respond
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
