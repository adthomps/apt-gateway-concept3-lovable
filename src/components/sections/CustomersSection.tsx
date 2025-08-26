import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Plus,
  Eye,
  Edit,
  CreditCard,
  Calendar,
  Mail
} from "lucide-react";

export function CustomersSection() {
  const customers = [
    {
      id: "CUST001",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      totalSpent: "$1,245.00",
      transactions: 12,
      lastTransaction: "2024-01-20",
      status: "active",
      paymentMethods: 2
    },
    {
      id: "CUST002", 
      name: "Sarah Johnson",
      email: "sarah@company.com",
      phone: "+1 (555) 987-6543",
      totalSpent: "$3,299.99",
      transactions: 28,
      lastTransaction: "2024-01-19",
      status: "active",
      paymentMethods: 1
    },
    {
      id: "CUST003",
      name: "Mike Wilson", 
      email: "mike.w@email.com",
      phone: "+1 (555) 456-7890",
      totalSpent: "$89.50",
      transactions: 1,
      lastTransaction: "2024-01-20",
      status: "inactive",
      paymentMethods: 1
    },
    {
      id: "CUST004",
      name: "Tech Solutions Inc",
      email: "billing@techsol.com", 
      phone: "+1 (555) 234-5678",
      totalSpent: "$15,450.00",
      transactions: 45,
      lastTransaction: "2024-01-20",
      status: "active",
      paymentMethods: 3
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground">Manage customer profiles and payment methods</p>
        </div>
        <Button className="bg-gradient-primary shadow-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-card shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search customers by name, email, or ID..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-input rounded-md bg-background text-foreground">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <Button variant="outline">Filter</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-xl font-bold">1,293</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active This Month</p>
                <p className="text-xl font-bold">847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Plus className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">New This Month</p>
                <p className="text-xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. LTV</p>
                <p className="text-xl font-bold">$2,450</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Customer Directory</span>
            <Badge variant="secondary" className="ml-2">
              {customers.length} customers shown
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="text-left p-4 font-medium">Customer</th>
                  <th className="text-left p-4 font-medium">Contact</th>
                  <th className="text-left p-4 font-medium">Total Spent</th>
                  <th className="text-left p-4 font-medium">Transactions</th>
                  <th className="text-left p-4 font-medium">Last Activity</th>
                  <th className="text-left p-4 font-medium">Payment Methods</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={customer.id} className={index % 2 === 0 ? "bg-background/50" : "bg-muted/10"}>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-sm">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.id}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs">{customer.email}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{customer.phone}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold">{customer.totalSpent}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{customer.transactions}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{customer.lastTransaction}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{customer.paymentMethods}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge 
                        variant={customer.status === "active" ? "default" : "secondary"}
                      >
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
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