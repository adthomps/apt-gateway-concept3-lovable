import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Link2, 
  Plus,
  QrCode,
  Copy,
  Eye,
  Edit,
  BarChart3,
  ExternalLink
} from "lucide-react";

export function LinksSection() {
  const paymentLinks = [
    {
      id: "LINK001",
      name: "Product Demo Payment",
      url: "https://secure.authorize.net/payment/pmt001",
      amount: "$99.00",
      type: "one-time",
      status: "active",
      clicks: 247,
      conversions: 89,
      created: "2024-01-15"
    },
    {
      id: "LINK002",
      name: "Monthly Subscription", 
      url: "https://secure.authorize.net/payment/pmt002",
      amount: "$29.99/mo",
      type: "recurring",
      status: "active",
      clicks: 1543,
      conversions: 432,
      created: "2024-01-10"
    },
    {
      id: "LINK003",
      name: "Event Registration",
      url: "https://secure.authorize.net/payment/pmt003", 
      amount: "$150.00",
      type: "one-time",
      status: "paused",
      clicks: 89,
      conversions: 23,
      created: "2024-01-18"
    }
  ];

  const quickTemplates = [
    { name: "Product Sale", amount: "$", type: "one-time" },
    { name: "Service Subscription", amount: "$/month", type: "recurring" },
    { name: "Donation", amount: "Any", type: "flexible" },
    { name: "Event Ticket", amount: "$", type: "one-time" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payment Links & Forms</h1>
          <p className="text-muted-foreground">Create and manage hosted payment solutions</p>
        </div>
        <Button className="bg-gradient-primary shadow-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Payment Link
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Link2 className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Links</p>
                <p className="text-xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Clicks</p>
                <p className="text-xl font-bold">5,247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-xl font-bold">34.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <QrCode className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">QR Scans</p>
                <p className="text-xl font-bold">892</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Templates */}
      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Quick Start Templates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickTemplates.map((template, index) => (
              <Card key={index} className="border border-border hover:border-primary/50 transition-smooth cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="mb-3">
                    <Link2 className="h-8 w-8 mx-auto text-primary" />
                  </div>
                  <h3 className="font-medium text-sm mb-1">{template.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {template.amount} • {template.type}
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Links Table */}
      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Link2 className="h-5 w-5" />
            <span>Your Payment Links</span>
            <Badge variant="secondary" className="ml-2">
              {paymentLinks.length} links
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="text-left p-4 font-medium">Link Details</th>
                  <th className="text-left p-4 font-medium">Amount & Type</th>
                  <th className="text-left p-4 font-medium">Performance</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Created</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paymentLinks.map((link, index) => (
                  <tr key={link.id} className={index % 2 === 0 ? "bg-background/50" : "bg-muted/10"}>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-sm mb-1">{link.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{link.id}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input 
                            value={link.url}
                            readOnly
                            className="text-xs h-6 bg-muted/50 border-none font-mono flex-1"
                          />
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-semibold">{link.amount}</p>
                        <Badge variant="outline" className="text-xs">
                          {link.type}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{link.conversions}</span> / {link.clicks}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round((link.conversions / link.clicks) * 100)}% conversion
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge 
                        variant={link.status === "active" ? "default" : "secondary"}
                      >
                        {link.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{link.created}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" title="View Link">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="QR Code">
                          <QrCode className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Analytics">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}