import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Sparkles,
  Filter,
  Clock,
  CreditCard,
  Users,
  FileText,
  Bot,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Zap,
  Calendar,
  RefreshCw
} from "lucide-react";

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAISearch, setIsAISearch] = useState(false);
  const [showDefaultResults, setShowDefaultResults] = useState(true);

  // Default search results - unsettled/pending and last 24h settled
  const defaultResults = [
    {
      type: "transaction",
      title: "Transaction #40000123456", 
      description: "Payment of $245.00 from John Smith",
      metadata: "Pending • Credit Card • Visa ****1234 • 2 hours ago",
      status: "pending",
      relevance: 100
    },
    {
      type: "transaction",
      title: "Transaction #40000123457",
      description: "Payment of $1,299.99 from Sarah Johnson", 
      metadata: "Processing • ACH • Bank ****5678 • 45 min ago",
      status: "processing",
      relevance: 100
    },
    {
      type: "transaction", 
      title: "Transaction #40000123458",
      description: "Payment of $89.50 from Mike Wilson",
      metadata: "Failed • Credit Card • MC ****9012 • 1 hour ago",
      status: "failed",
      relevance: 100
    },
    {
      type: "transaction",
      title: "Transaction #40000123459",
      description: "Payment of $2,450.00 from Tech Solutions Inc",
      metadata: "Settled • Credit Card • Amex ****3456 • 3 hours ago",
      status: "settled",
      relevance: 100
    },
    {
      type: "transaction",
      title: "Transaction #40000123460", 
      description: "Payment of $67.99 from Lisa Chen",
      metadata: "Settled • Credit Card • Visa ****7890 • 5 hours ago",
      status: "settled",
      relevance: 100
    },
    {
      type: "transaction",
      title: "Transaction #40000123461",
      description: "Payment of $156.00 from Alex Turner",
      metadata: "Unsettled • Credit Card • MC ****2345 • 30 min ago",
      status: "unsettled",
      relevance: 100
    }
  ];

  const recentSearches = [
    "Unsettled transactions",
    "Failed payments last 24 hours",
    "Pending ACH transactions", 
    "High-risk transactions today",
    "Chargebacks this week"
  ];

  const quickFilters = [
    { label: "Pending/Unsettled", icon: Clock, count: "47", color: "text-yellow-600 bg-yellow-50" },
    { label: "Failed (24h)", icon: AlertCircle, count: "12", color: "text-red-600 bg-red-50" },
    { label: "Settled (24h)", icon: CheckCircle, count: "1,847", color: "text-green-600 bg-green-50" },
    { label: "High-Risk", icon: Zap, count: "8", color: "text-orange-600 bg-orange-50" }
  ];

  // Auto-load default results on component mount
  useEffect(() => {
    if (!searchQuery) {
      setShowDefaultResults(true);
    } else {
      setShowDefaultResults(false);
    }
  }, [searchQuery]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="text-yellow-600 bg-yellow-50">Pending</Badge>;
      case "processing":
        return <Badge variant="secondary" className="text-blue-600 bg-blue-50">Processing</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "settled":
        return <Badge variant="default" className="bg-green-500">Settled</Badge>;
      case "unsettled":
        return <Badge variant="outline" className="text-orange-600 border-orange-200">Unsettled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Intelligent Search</h1>
          <p className="text-muted-foreground">Showing unsettled/pending transactions and last 24h activity</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Search Interface */}
      <Card className="bg-gradient-card shadow-md">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Search Modes */}
            <div className="flex items-center space-x-2">
              <Button
                variant={!isAISearch ? "default" : "outline"}
                size="sm"
                onClick={() => setIsAISearch(false)}
              >
                <Search className="h-4 w-4 mr-2" />
                Standard Search
              </Button>
              <Button
                variant={isAISearch ? "default" : "outline"}
                size="sm"
                onClick={() => setIsAISearch(true)}
                className="bg-accent/10 border-accent/20 hover:bg-accent/20"
              >
                <Bot className="h-4 w-4 mr-2" />
                AI Search
              </Button>
            </div>

            {/* Search Input */}
            {!isAISearch ? (
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search transactions, customers, IDs, amounts..."
                  className="pl-10 h-12 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  Search
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="relative">
                  <Sparkles className="h-5 w-5 absolute left-3 top-4 text-accent" />
                  <Textarea
                    placeholder="Ask me anything about your payments... 
Examples:
• Show me all failed transactions from last week
• Which customers have the highest transaction volumes?
• What's my approval rate for ACH payments?
• Find transactions over $1000 from December"
                    className="pl-10 min-h-[120px] text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="bg-gradient-primary shadow-primary">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Search with AI
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Filters & Recent Searches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Filters */}
        <Card className="bg-gradient-card shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Quick Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickFilters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <Button
                    key={filter.label}
                    variant="outline"
                    className={`h-16 flex-col space-y-1 hover:border-primary/50 transition-smooth ${filter.color}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm">{filter.label}</span>
                    <Badge variant="secondary" className="text-xs">
                      {filter.count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Searches */}
        <Card className="bg-gradient-card shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Quick Searches</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto p-3 hover:bg-muted/50"
                  onClick={() => setSearchQuery(search)}
                >
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm truncate">{search}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Default Results - Unsettled/Pending and Last 24h */}
      {(showDefaultResults || searchQuery) && (
        <Card className="bg-gradient-card shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>
                {showDefaultResults ? "Recent Activity & Unsettled Transactions" : "Search Results"}
              </span>
              <Badge variant="secondary" className="ml-2">
                {showDefaultResults ? defaultResults.length : "3"} results
              </Badge>
            </CardTitle>
            {showDefaultResults && (
              <p className="text-sm text-muted-foreground">
                Showing all pending/unsettled transactions and settled transactions from the last 24 hours
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {(showDefaultResults ? defaultResults : []).map((result, index) => (
              <Card key={index} className="border border-border hover:border-primary/50 transition-smooth cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CreditCard className="h-4 w-4 text-primary" />
                        <Badge variant="outline" className="text-xs">
                          {result.type}
                        </Badge>
                        {result.status && getStatusBadge(result.status)}
                      </div>
                      <h3 className="font-medium text-sm mb-1">{result.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
                      <p className="text-xs text-muted-foreground">{result.metadata}</p>
                    </div>
                    <div className="text-right ml-4">
                      {result.status === "pending" || result.status === "processing" || result.status === "unsettled" ? (
                        <Badge variant="outline" className="text-xs text-yellow-600">
                          Action Required
                        </Badge>
                      ) : result.status === "failed" ? (
                        <Badge variant="outline" className="text-xs text-red-600">
                          Needs Review
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          Recent
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Search Results Summary */}
            {showDefaultResults && (
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">3</p>
                    <p className="text-muted-foreground">Pending/Unsettled</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">1</p>
                    <p className="text-muted-foreground">Failed (24h)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">2</p>
                    <p className="text-muted-foreground">Settled (24h)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">$4,162.49</p>
                    <p className="text-muted-foreground">Total Volume</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-center pt-4">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Results
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}