import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Webhook, 
  Plus,
  CheckCircle,
  XCircle,
  RefreshCw,
  Settings
} from "lucide-react";

export function WebhooksSection() {
  const webhooks = [
    {
      id: "WH-001",
      url: "https://api.example.com/webhooks",
      events: ["payment.succeeded", "payment.failed"],
      status: "active",
      deliveries: 1234,
      failures: 2
    },
    {
      id: "WH-002",
      url: "https://api.acme.com/notifications",
      events: ["customer.created", "invoice.paid"],
      status: "active",
      deliveries: 567,
      failures: 0
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Webhooks</h1>
          <p className="text-muted-foreground">Manage webhook endpoints and event deliveries</p>
        </div>
        <Button className="bg-gradient-primary shadow-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Endpoint
        </Button>
      </div>

      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle>Webhook Endpoints</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {webhooks.map((webhook) => (
            <div key={webhook.id} className="p-4 bg-muted/30 rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">{webhook.url}</p>
                    <Badge variant={webhook.status === "active" ? "default" : "secondary"}>
                      {webhook.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {webhook.events.length} events subscribed
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 text-success">
                  <CheckCircle className="h-4 w-4" />
                  <span>{webhook.deliveries} deliveries</span>
                </div>
                {webhook.failures > 0 && (
                  <div className="flex items-center space-x-1 text-destructive">
                    <XCircle className="h-4 w-4" />
                    <span>{webhook.failures} failures</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Deliveries</CardTitle>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No recent webhook deliveries
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
