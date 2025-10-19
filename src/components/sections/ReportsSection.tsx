import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { 
  BarChart3, 
  Plus,
  FileText,
  Download,
  Calendar
} from "lucide-react";

export function ReportsSection() {
  const reportTemplates = [
    { name: "Settlement Reconciliation", icon: FileText },
    { name: "Tax Report", icon: FileText },
    { name: "PCI Compliance", icon: FileText },
    { name: "Chargeback Analysis", icon: BarChart3 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">Generate and download custom reports</p>
        </div>
        <Button className="bg-gradient-primary shadow-primary">
          <Plus className="h-4 w-4 mr-2" />
          Custom Report
        </Button>
      </div>

      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <div key={template.name} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{template.name}</p>
                      <p className="text-xs text-muted-foreground">Generate report</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Calendar}
            title="No reports generated yet"
            description="Generate your first report to get insights into your payment data"
            action={{
              label: "Generate Report",
              onClick: () => console.log("Generate report")
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
