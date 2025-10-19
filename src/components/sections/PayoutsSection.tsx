import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KPITile } from "@/components/ui/kpi-tile";
import { 
  DollarSign, 
  Calendar,
  TrendingUp,
  Building2,
  Download
} from "lucide-react";

export function PayoutsSection() {
  const payouts = [
    {
      id: "PO-001",
      amount: "$12,450.00",
      status: "paid",
      date: "2025-01-20",
      arrivalDate: "2025-01-22"
    },
    {
      id: "PO-002",
      amount: "$8,290.50",
      status: "pending",
      date: "2025-01-21",
      arrivalDate: "2025-01-23"
    },
    {
      id: "PO-003",
      amount: "$15,670.25",
      status: "in_transit",
      date: "2025-01-22",
      arrivalDate: "2025-01-24"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payouts / Settlements</h1>
          <p className="text-muted-foreground">Track your payment settlements and bank transfers</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPITile
          title="Next Payout"
          value="$8,290"
          change="Arriving Jan 23"
          changeType="neutral"
          icon={DollarSign}
        />
        <KPITile
          title="Available Balance"
          value="$24,120"
          change="Ready to payout"
          changeType="positive"
          icon={TrendingUp}
        />
        <KPITile
          title="Pending Balance"
          value="$12,450"
          change="Processing"
          changeType="neutral"
          icon={Calendar}
        />
        <KPITile
          title="This Month"
          value="$128,492"
          change="+12.5% from last month"
          changeType="positive"
          icon={Building2}
        />
      </div>

      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle>Recent Payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {payouts.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">{payout.id}</p>
                    <Badge variant={
                      payout.status === "paid" ? "default" : 
                      payout.status === "in_transit" ? "secondary" : "outline"
                    }>
                      {payout.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Created {payout.date} • Arriving {payout.arrivalDate}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-semibold text-lg">{payout.amount}</p>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
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
