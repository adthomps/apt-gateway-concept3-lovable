import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockData = [
  { date: 'Mar 1', revenue: 4200, transactions: 87, successRate: 92 },
  { date: 'Mar 3', revenue: 5800, transactions: 112, successRate: 94 },
  { date: 'Mar 5', revenue: 4900, transactions: 98, successRate: 93 },
  { date: 'Mar 7', revenue: 7100, transactions: 143, successRate: 95 },
  { date: 'Mar 9', revenue: 6200, transactions: 124, successRate: 94 },
  { date: 'Mar 11', revenue: 8400, transactions: 167, successRate: 96 },
  { date: 'Mar 13', revenue: 7800, transactions: 154, successRate: 94 },
  { date: 'Mar 15', revenue: 9200, transactions: 189, successRate: 95 },
];

export function RevenueChart() {
  return (
    <Card className="bg-gradient-card shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span>Revenue Trends</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
              formatter={(value: number, name: string) => {
                if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Revenue'];
                if (name === 'transactions') return [value, 'Transactions'];
                if (name === 'successRate') return [`${value}%`, 'Success Rate'];
                return [value, name];
              }}
            />
            <Legend 
              wrapperStyle={{ 
                paddingTop: '20px',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name="Revenue"
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">$48.7k</p>
            <p className="text-xs text-muted-foreground mt-1">Total Revenue</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">1,074</p>
            <p className="text-xs text-muted-foreground mt-1">Transactions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">94.1%</p>
            <p className="text-xs text-muted-foreground mt-1">Success Rate</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
