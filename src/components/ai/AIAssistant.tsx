import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  User, 
  Send, 
  X, 
  Sparkles,
  Shield,
  TrendingUp,
  AlertTriangle,
  Zap,
  Search,
  BarChart3,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "fraud_analysis" | "transaction_query" | "optimization" | "general";
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your AI payment assistant. I can help you with fraud analysis, transaction insights, routing optimization, and much more. Try one of the quick actions below or ask me anything about your payment data!",
      timestamp: new Date(),
      type: "general"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { 
      label: "Fraud Trends", 
      icon: Shield, 
      type: "fraud_analysis",
      action: "Analyze fraud trends in the last 30 days and identify suspicious patterns",
      color: "text-red-500 bg-red-50"
    },
    { 
      label: "High-Risk Review", 
      icon: AlertTriangle, 
      type: "fraud_analysis",
      action: "Review all transactions with fraud score > 70 from the last 7 days",
      color: "text-yellow-500 bg-yellow-50"
    },
    { 
      label: "Unsettled Analysis", 
      icon: Clock, 
      type: "transaction_query",
      action: "Analyze all pending/unsettled transactions and suggest actions",
      color: "text-blue-500 bg-blue-50"
    },
    { 
      label: "Routing Optimization", 
      icon: TrendingUp, 
      type: "optimization",
      action: "Analyze routing performance and suggest optimizations for better success rates",
      color: "text-green-500 bg-green-50"
    },
    { 
      label: "Failed Insights", 
      icon: Search, 
      type: "transaction_query",
      action: "Analyze recent failed transactions and identify common decline reasons",
      color: "text-purple-500 bg-purple-50"
    },
    { 
      label: "Real-time Check", 
      icon: Zap, 
      type: "fraud_analysis",
      action: "Run fraud analysis on the most recent 100 transactions",
      color: "text-orange-500 bg-orange-50"
    }
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (content: string, type?: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
      type: type as Message["type"]
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(content, type),
        timestamp: new Date(),
        type: type as Message["type"]
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockResponse = (query: string, type?: string) => {
    if (query.includes("fraud trends") || type === "fraud_analysis") {
      return "📊 **Fraud Trend Analysis (Last 30 Days)**\n\n✅ **Key Findings:**\n• 12% increase in high-risk scores during evening hours\n• Suspicious pattern: Multiple attempts from IP range 185.220.*.*\n• Card testing attacks detected on weekends\n\n🚨 **Recommendations:**\n• Implement stricter velocity checks after 8PM\n• Block IP range 185.220.*.* temporarily\n• Enable enhanced card verification for weekend transactions\n\n📈 **Impact:** Could reduce fraud by 28% and save ~$4,200/month";
    }
    
    if (query.includes("high-risk") || query.includes("fraud score > 70")) {
      return "⚠️ **High-Risk Transaction Review**\n\n🔍 **Found 23 transactions** with fraud score > 70:\n• 8 transactions from new devices\n• 6 transactions with mismatched billing addresses\n• 9 transactions with suspicious velocity patterns\n\n💡 **Suggested Actions:**\n• Manual review recommended for 12 transactions\n• Auto-decline enabled for 4 repeat offenders\n• Additional verification required for 7 transactions";
    }
    
    if (query.includes("unsettled") || query.includes("pending")) {
      return "⏱️ **Unsettled Transaction Analysis**\n\n📋 **Status Overview:**\n• 47 pending transactions ($12,340 total)\n• 15 transactions pending for >24 hours\n• Average settlement time: 2.3 hours\n\n🎯 **Recommended Actions:**\n• Follow up on 8 transactions stuck in 'processing'\n• Contact processor for 3 transactions with gateway timeouts\n• Auto-retry 6 transactions that can be safely retried";
    }
    
    if (query.includes("routing") || query.includes("optimization")) {
      return "🎯 **Routing Performance Analysis**\n\n📊 **Current Performance:**\n• Primary USD: 96.8% success rate\n• Backup Account: 91.4% success rate\n• Auto-retry success: 12.3%\n\n🚀 **Optimization Opportunities:**\n• Route Visa transactions to Primary USD first (+2.1% success)\n• Implement dynamic routing based on amount (+$340/day savings)\n• Optimize retry timing for declined transactions (+1.8% recovery)";
    }
    
    if (query.includes("failed") || query.includes("decline")) {
      return "❌ **Failed Transaction Analysis**\n\n📉 **Top Decline Reasons (Last 7 days):**\n• Insufficient funds: 34% (89 transactions)\n• Card declined by issuer: 28% (73 transactions)\n• Invalid CVV: 18% (47 transactions)\n• Expired card: 12% (31 transactions)\n\n💡 **Insights:**\n• 67% of 'insufficient funds' retried successfully after 24h\n• CVV failures often indicate card testing attempts\n• Consider implementing account updater service";
    }
    
    if (query.includes("real-time") || query.includes("recent 100")) {
      return "⚡ **Real-time Fraud Check (Last 100 Transactions)**\n\n🛡️ **Risk Assessment:**\n• 3 high-risk transactions detected\n• 12 medium-risk transactions requiring review\n• 85 transactions passed all checks\n\n🚨 **Immediate Actions Required:**\n• Block card ending in 1234 (multiple velocity violations)\n• Review transaction #40000123461 (new device + high amount)\n• Monitor IP 192.168.1.45 (unusual geographic pattern)";
    }

    return "🤖 **Analysis Complete**\n\nI've processed your request and identified several key insights. The data shows interesting patterns that could help optimize your payment processing. Would you like me to dive deeper into any specific area or provide additional recommendations?";
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    handleSendMessage(action.action, action.type);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:inset-auto lg:right-0 lg:top-0 lg:bottom-0 lg:w-[32rem] animate-fade-in">
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <Card className="relative h-full lg:h-screen bg-gradient-card shadow-2xl border-l border-border lg:rounded-none animate-slide-in-right">
        <CardHeader className="bg-gradient-primary text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-1 rounded">
                <Bot className="h-4 w-4" />
              </div>
              <CardTitle className="text-lg">AI Copilot</CardTitle>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                <Sparkles className="h-3 w-3 mr-1" />
                Fraud AI
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[calc(100%-5rem)]">
          {/* Quick Actions */}
          <div className="p-4 border-b border-border">
            <p className="text-xs text-muted-foreground mb-2">Quick Actions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.label}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickAction(action)}
                    className={`flex items-center space-x-1 text-xs h-8 ${action.color} hover:opacity-80`}
                  >
                    <Icon className="h-3 w-3" />
                    <span className="truncate">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start space-x-3",
                    message.role === "user" && "flex-row-reverse space-x-reverse"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-full",
                    message.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-accent text-accent-foreground"
                  )}>
                    {message.role === "user" ? 
                      <User className="h-4 w-4" /> : 
                      <Bot className="h-4 w-4" />
                    }
                  </div>
                  <div className={cn(
                    "flex-1 max-w-[80%]",
                    message.role === "user" ? "text-right" : "text-left"
                  )}>
                    <div className={cn(
                      "p-3 rounded-lg shadow-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted"
                    )}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Bot className="h-4 w-4 animate-pulse" />
                  <p className="text-sm">AI is analyzing...</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about fraud patterns, transaction insights, or routing optimization..."
                className="min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }
                }}
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}