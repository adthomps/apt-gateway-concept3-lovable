import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, Permission, UserRole, ROLE_PERMISSIONS } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - replace with Supabase integration
const mockUsers: User[] = [
  {
    id: 'user-owner-001',
    email: 'owner@company.com',
    name: 'Alex Thompson',
    role: 'owner',
    avatar: '',
    department: 'Executive',
    status: 'active',
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'user-admin-001',
    email: 'admin@company.com',
    name: 'Sarah Johnson',
    role: 'admin',
    avatar: '',
    department: 'Finance',
    status: 'active',
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'user-tm-001',
    email: 'manager@company.com',
    name: 'Mike Chen',
    role: 'transaction-manager',
    avatar: '',
    department: 'Operations',
    status: 'active',
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date().toISOString()
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Simulate checking for existing session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('currentUser');
        }
      }
      setIsLoading(false);
    };

    // Simulate API call delay
    setTimeout(checkAuthStatus, 500);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - replace with Supabase auth
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // In real implementation, password would be verified on backend
      if (password !== 'demo123') {
        throw new Error('Invalid email or password');
      }
      
      // Update last login
      const updatedUser = {
        ...foundUser,
        lastLogin: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      toast({
        title: "Welcome back!",
        description: `Logged in as ${updatedUser.name}`,
      });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    const rolePermissions = ROLE_PERMISSIONS[user.role];
    return rolePermissions.includes(permission);
  };

  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    return user.role === role;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    hasPermission,
    hasRole,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}