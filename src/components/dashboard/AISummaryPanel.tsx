import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Brain,
  Target
} from "lucide-react";

export function AISummaryPanel() {
  const insights = [
    {
      type: "optimization",
      icon: Target,
      title: "Authorization Rate Opportunity",
      description: "Enable 3DS for international cards to increase approval rate by 4.2%",
      impact: "high",
      action: "Configure 3DS"
    },
    {
      type: "forecast",
      icon: TrendingUp,
      title: "Revenue Forecast",
      description: "Projected revenue for next 30 days: $142,350 (+11% from current period)",
      impact: "info",
      action: "View Details"
    },
    {
      type: "alert",
      icon: AlertTriangle,
      title: "Risk Pattern Detected",
      description: "Unusual spike in failed transactions from 3 IP addresses in the last hour",
      impact: "critical",
      action: "Review Now"
    }
  ];

  const stats = [
    { label: "Success Rate Improvement", value: "+2.1%", trend: "up" },
    { label: "Fraud Detection Accuracy", value: "98.4%", trend: "up" },
    { label: "Processing Time", value: "-15%", trend: "up" }
  ];

  return (
    <Card className="bg-gradient-card shadow-md border-accent/20 relative overflow-hidden">
      {/* Hologram effect background */}
      <div className="absolute inset-0 bg-gradient-hologram opacity-50 pointer-events-none" />
      
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-accent/10 p-2 rounded-lg">
              <Brain className="h-5 w-5 text-accent animate-pulse" />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center space-x-2">
                <span>AI Intelligence Summary</span>
                <Badge className="bg-gradient-primary text-white">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Live
                </Badge>
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Real-time insights powered by AI • Last updated: 2 min ago
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pb-4 border-b border-border">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                {stat.trend === "up" && (
                  <TrendingUp className="h-4 w-4 text-success" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* AI Insights */}
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>Top Insights</span>
            </h4>
            <Badge variant="outline" className="text-xs">
              3 new
            </Badge>
          </div>

          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div 
                key={index} 
                className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth group"
              >
                <div className="flex items-start space-x-3">
                  <div className={`
                    p-2 rounded-lg flex-shrink-0
                    ${insight.impact === "critical" ? "bg-destructive/10" :
                      insight.impact === "high" ? "bg-accent/10" :
                      "bg-primary/10"}
                  `}>
                    <Icon className={`h-4 w-4 
                      ${insight.impact === "critical" ? "text-destructive" :
                        insight.impact === "high" ? "text-accent" :
                        "text-primary"}
                    `} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-sm">{insight.title}</p>
                      <Badge 
                        variant={insight.impact === "critical" ? "destructive" : "secondary"}
                        className="text-[10px] px-1.5 py-0"
                      >
                        {insight.impact}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {insight.description}
                    </p>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-7 text-xs -ml-2 group-hover:text-accent"
                    >
                      {insight.action}
                      <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        <Button 
          variant="outline" 
          className="w-full mt-2"
          onClick={() => window.location.href = '/ai-insights'}
        >
          <Brain className="h-4 w-4 mr-2" />
          View All AI Insights
        </Button>
      </CardContent>
    </Card>
  );
}
