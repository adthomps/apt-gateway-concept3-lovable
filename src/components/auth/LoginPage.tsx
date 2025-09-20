import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Lock, Mail, User, Shield, Briefcase } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const demoAccounts = [
    {
      email: 'owner@company.com',
      password: 'demo123',
      role: 'Owner',
      name: 'Alex Thompson',
      description: 'Full system access and user management',
      icon: <Shield className="w-4 h-4" />,
      variant: 'default' as const
    },
    {
      email: 'admin@company.com', 
      password: 'demo123',
      role: 'Admin',
      name: 'Sarah Johnson',
      description: 'Administrative access with user management',
      icon: <User className="w-4 h-4" />,
      variant: 'secondary' as const
    },
    {
      email: 'manager@company.com',
      password: 'demo123', 
      role: 'Transaction Manager',
      name: 'Mike Chen',
      description: 'Transaction and customer management access',
      icon: <Briefcase className="w-4 h-4" />,
      variant: 'outline' as const
    }
  ];

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <Card className="border-border/50 bg-background/80 backdrop-blur-sm shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription>
              Sign in to access your AuthorizeAI dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="border-border/50 bg-background/80 backdrop-blur-sm shadow-elegant">
          <CardHeader>
            <CardTitle className="text-xl">Demo Accounts</CardTitle>
            <CardDescription>
              Try different role access levels with these demo accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {demoAccounts.map((account, index) => (
              <div key={index} className="p-4 border border-border/50 rounded-lg bg-background/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {account.icon}
                    <span className="font-medium">{account.name}</span>
                    <Badge variant={account.variant}>{account.role}</Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin(account.email, account.password)}
                    disabled={isLoading}
                  >
                    Use Account
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {account.description}
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div><strong>Email:</strong> {account.email}</div>
                  <div><strong>Password:</strong> {account.password}</div>
                </div>
              </div>
            ))}
            
            <Separator />
            
            <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <p className="font-medium mb-2">Note:</p>
              <p>
                These are demo accounts for testing role-based access control. 
                In production, connect to Supabase for secure authentication.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}