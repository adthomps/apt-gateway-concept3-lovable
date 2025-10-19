import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KPITile } from "@/components/ui/kpi-tile";
import { 
  Sparkles, 
  TrendingUp,
  AlertTriangle,
  Target,
  Zap,
  Shield,
  BarChart3
} from "lucide-react";

export function AIInsightsSection() {
  const insights = [
    {
      title: "Authorization Rate Optimization",
      description: "AI detected that enabling 3DS for international transactions could increase approval rate by 4.2%",
      impact: "high",
      category: "Optimization"
    },
    {
      title: "Fraud Pattern Detected",
      description: "Unusual spike in card testing attempts detected from IP range 185.220.*.*. Recommended action: temporary block",
      impact: "critical",
      category: "Security"
    },
    {
      title: "Revenue Forecast",
      description: "Based on current trends, projected revenue for next month: $142,350 (+11% from current month)",
      impact: "info",
      category: "Forecasting"
    },
    {
      title: "Churn Risk Alert",
      description: "5 high-value customers showing signs of reduced activity. Recommended: engagement campaign",
      impact: "medium",
      category: "Customer Retention"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-foreground">AI Insights</h1>
          <Badge className="bg-gradient-primary">
            <Sparkles className="h-3 w-3 mr-1" />
            Powered by AI
          </Badge>
        </div>
        <p className="text-muted-foreground">AI-generated insights and recommendations for your payment operations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPITile
          title="Optimization Score"
          value="87%"
          change="+5% this month"
          changeType="positive"
          icon={Target}
        />
        <KPITile
          title="Predicted Success Rate"
          value="96.2%"
          change="+2.1% improvement possible"
          changeType="positive"
          icon={TrendingUp}
        />
        <KPITile
          title="Risk Score"
          value="Low"
          change="3 alerts active"
          changeType="neutral"
          icon={Shield}
        />
        <KPITile
          title="AI Recommendations"
          value="8"
          change="4 high priority"
          changeType="neutral"
          icon={Zap}
        />
      </div>

      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span>Recent AI Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-medium">{insight.title}</p>
                    <Badge variant={
                      insight.impact === "critical" ? "destructive" :
                      insight.impact === "high" ? "default" :
                      insight.impact === "medium" ? "secondary" : "outline"
                    }>
                      {insight.impact}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <Badge variant="outline" className="text-xs">
                  {insight.category}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span>Performance Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">AI trend analysis visualization</p>
              <p className="text-sm text-muted-foreground mt-1">Coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
