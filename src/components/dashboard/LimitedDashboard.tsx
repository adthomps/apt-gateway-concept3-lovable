import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Shield,
  Eye,
  BarChart3,
  Lock
} from "lucide-react";

import { UserRole } from "@/types/auth";

interface LimitedDashboardProps {
  userRole: UserRole;
}

export function LimitedDashboard({ userRole }: LimitedDashboardProps) {
  const getAccessLevelContent = () => {
    switch (userRole) {
      case "transaction-manager":
        return {
          title: "Transaction Manager Dashboard",
          description: "Transaction and customer management access",
          allowedMetrics: [
            { title: "Active Transactions", value: "2,847", icon: CreditCard, color: "text-primary" },
            { title: "System Status", value: "Healthy", icon: CheckCircle, color: "text-green-600" },
            { title: "Pending Reviews", value: "23", icon: Clock, color: "text-yellow-600" },
            { title: "Total Customers", value: "1,293", icon: Users, color: "text-primary" },
          ],
          features: [
            { name: "Transaction Management", available: true },
            { name: "Customer Management", available: true },
            { name: "Basic Search", available: true },
            { name: "Payment Infrastructure View", available: true },
            { name: "Routing Engine View", available: true },
            { name: "User Management", available: false },
            { name: "System Settings", available: false },
          ]
        };
      
      default:
        return {
          title: "Access Required",
          description: "Please contact your administrator for access",
          allowedMetrics: [],
          features: []
        };
    }
  };

  const content = getAccessLevelContent();

  return (
    <div className="space-y-6">
      {/* Header with Role Badge */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{content.title}</h1>
          <p className="text-muted-foreground">{content.description}</p>
        </div>
        <Badge variant="outline" className="capitalize">
          {userRole} Access
        </Badge>
      </div>

      {/* Available Metrics */}
      {content.allowedMetrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.allowedMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="bg-gradient-card shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    </div>
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Icon className={`h-5 w-5 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Access Level Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Available Features</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded">
                  <span className="text-sm">{feature.name}</span>
                  <div className="flex items-center space-x-2">
                    {feature.available ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-xs text-green-600">Available</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 text-red-600" />
                        <span className="text-xs text-red-600">Restricted</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Request Access</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Need access to additional features? Contact your administrator to upgrade your permissions.
            </p>
            
            <div className="space-y-2">
              <Button className="w-full bg-gradient-primary">
                Contact Administrator
              </Button>
              <Button variant="outline" className="w-full">
                View Access Documentation
              </Button>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-sm mb-2">Available Upgrades:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                {userRole === "transaction-manager" && (
                  <>
                    <li>• Admin Access - Full reporting and user management</li>
                    <li>• Owner Access - Complete system control</li>
                  </>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Limited Recent Activity */}
      {userRole === "transaction-manager" && (
        <Card className="bg-gradient-card shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Transaction Processed</p>
                    <p className="text-xs text-muted-foreground">$245.00 • 2 min ago</p>
                  </div>
                </div>
                <Badge variant="default" className="text-xs">Success</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="font-medium text-sm">Payment Review Required</p>
                    <p className="text-xs text-muted-foreground">$1,250.00 • 5 min ago</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">Pending</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="font-medium text-sm">Transaction Failed</p>
                    <p className="text-xs text-muted-foreground">$67.50 • 12 min ago</p>
                  </div>
                </div>
                <Badge variant="destructive" className="text-xs">Failed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}