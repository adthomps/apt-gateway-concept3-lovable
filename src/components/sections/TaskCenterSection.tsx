import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ListTodo, 
  AlertTriangle,
  Shield,
  CreditCard,
  Users,
  Settings,
  Clock
} from "lucide-react";

export function TaskCenterSection() {
  const tasks = [
    {
      id: "TASK-001",
      title: "Respond to 2 disputes",
      description: "2 disputes require evidence submission within 3 days",
      priority: "high",
      category: "Disputes",
      icon: AlertTriangle,
      dueDate: "Due in 3 days"
    },
    {
      id: "TASK-002",
      title: "Review 5 high-risk transactions",
      description: "Transactions with risk score > 70 flagged for manual review",
      priority: "high",
      category: "Risk Management",
      icon: Shield,
      dueDate: "Due today"
    },
    {
      id: "TASK-003",
      title: "Update expired cards",
      description: "12 customer cards will expire this month. Run account updater",
      priority: "medium",
      category: "Customer Management",
      icon: CreditCard,
      dueDate: "Due in 7 days"
    },
    {
      id: "TASK-004",
      title: "Enable ACH payouts",
      description: "Complete bank account verification to enable ACH payouts",
      priority: "medium",
      category: "Setup",
      icon: Settings,
      dueDate: "No deadline"
    },
    {
      id: "TASK-005",
      title: "Verify new customers",
      description: "8 new customers pending identity verification",
      priority: "low",
      category: "Compliance",
      icon: Users,
      dueDate: "Due in 14 days"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Task Center</h1>
        <p className="text-muted-foreground">AI-generated tasks and recommendations to improve your operations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-card shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Due Soon</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ListTodo className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {tasks.map((task) => {
            const Icon = task.icon;
            return (
              <div key={task.id} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
                <Checkbox id={task.id} className="mt-1" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <p className="font-medium">{task.title}</p>
                        <Badge variant={
                          task.priority === "high" ? "destructive" :
                          task.priority === "medium" ? "default" : "secondary"
                        }>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="outline" className="text-xs">
                      {task.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Start
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
