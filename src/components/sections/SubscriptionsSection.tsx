import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KPITile } from "@/components/ui/kpi-tile";
import { EmptyState } from "@/components/ui/empty-state";
import { 
  Repeat, 
  Plus, 
  Users,
  DollarSign,
  TrendingUp,
  Filter
} from "lucide-react";

export function SubscriptionsSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Subscriptions</h1>
          <p className="text-muted-foreground">Manage recurring billing and subscription plans</p>
        </div>
        <Button className="bg-gradient-primary shadow-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Subscription
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPITile
          title="Active Subscriptions"
          value="1,293"
          change="+156 this month"
          changeType="positive"
          icon={Repeat}
        />
        <KPITile
          title="Monthly Recurring Revenue"
          value="$45,890"
          change="+18.2% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <KPITile
          title="Churn Rate"
          value="2.3%"
          change="-0.5% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
        <KPITile
          title="Active Customers"
          value="847"
          change="+23 new this month"
          changeType="positive"
          icon={Users}
        />
      </div>

      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Subscription List</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Repeat}
            title="No subscriptions yet"
            description="Create your first subscription plan to start recurring billing"
            action={{
              label: "Create Subscription",
              onClick: () => console.log("Create subscription")
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
