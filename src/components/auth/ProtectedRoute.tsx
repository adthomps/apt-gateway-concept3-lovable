import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Permission, UserRole } from '@/types/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: Permission;
  requiredRole?: UserRole;
  fallback?: ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredPermission, 
  requiredRole, 
  fallback 
}: ProtectedRouteProps) {
  const { user, hasPermission, hasRole, logout } = useAuth();

  // If no specific requirements, just check if authenticated
  if (!requiredPermission && !requiredRole) {
    return <>{children}</>;
  }

  // Check permission if required
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return fallback || <AccessDenied 
      type="permission" 
      required={requiredPermission}
      userRole={user?.role}
      onLogout={logout}
    />;
  }

  // Check role if required
  if (requiredRole && !hasRole(requiredRole)) {
    return fallback || <AccessDenied 
      type="role" 
      required={requiredRole}
      userRole={user?.role}
      onLogout={logout}
    />;
  }

  return <>{children}</>;
}

interface AccessDeniedProps {
  type: 'permission' | 'role';
  required: Permission | UserRole;
  userRole?: UserRole;
  onLogout: () => void;
}

function AccessDenied({ type, required, userRole, onLogout }: AccessDeniedProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <Card className="max-w-md mx-auto border-destructive/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-destructive" />
          </div>
          <CardTitle className="text-destructive">Access Denied</CardTitle>
          <CardDescription>
            You don't have the required {type} to access this section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-3 rounded-lg space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Your role:</span>
              {userRole && (
                <Badge variant="outline" className="capitalize">
                  <Shield className="w-3 h-3 mr-1" />
                  {userRole.replace('-', ' ')}
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Required {type}:</span>
              <Badge variant="destructive" className="capitalize">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {required.replace('-', ' ').replace(':', ': ')}
              </Badge>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Contact your administrator to request access to this feature.</p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={onLogout}
            className="w-full"
          >
            Switch Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}