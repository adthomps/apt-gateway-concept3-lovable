// Authentication and authorization types

export type UserRole = 'owner' | 'admin' | 'transaction-manager';

export type Permission = 
  | 'dashboard:view'
  | 'transactions:view' 
  | 'transactions:create'
  | 'transactions:edit'
  | 'transactions:delete'
  | 'transactions:void'
  | 'transactions:refund'
  | 'customers:view'
  | 'customers:create'
  | 'customers:edit'
  | 'customers:delete'
  | 'links:view'
  | 'links:create'
  | 'links:edit'
  | 'links:delete'
  | 'search:access'
  | 'payment-infrastructure:view'
  | 'payment-infrastructure:manage'
  | 'routing-engine:view'
  | 'routing-engine:manage'
  | 'risk-management:view'
  | 'risk-management:manage'
  | 'risk-management:approve'
  | 'risk-management:decline'
  | 'analytics:view'
  | 'analytics:export'
  | 'user-management:view'
  | 'user-management:create'
  | 'user-management:edit'
  | 'user-management:delete'
  | 'account-settings:view'
  | 'account-settings:edit'
  | 'system:admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: UserRole) => boolean;
  isLoading: boolean;
}

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  owner: [
    'dashboard:view',
    'transactions:view', 'transactions:create', 'transactions:edit', 'transactions:delete', 'transactions:void', 'transactions:refund',
    'customers:view', 'customers:create', 'customers:edit', 'customers:delete',
    'links:view', 'links:create', 'links:edit', 'links:delete',
    'search:access',
    'payment-infrastructure:view', 'payment-infrastructure:manage',
    'routing-engine:view', 'routing-engine:manage',
    'risk-management:view', 'risk-management:manage', 'risk-management:approve', 'risk-management:decline',
    'analytics:view', 'analytics:export',
    'user-management:view', 'user-management:create', 'user-management:edit', 'user-management:delete',
    'account-settings:view', 'account-settings:edit',
    'system:admin'
  ],
  admin: [
    'dashboard:view',
    'transactions:view', 'transactions:create', 'transactions:edit', 'transactions:delete', 'transactions:void', 'transactions:refund',
    'customers:view', 'customers:create', 'customers:edit', 'customers:delete',
    'links:view', 'links:create', 'links:edit', 'links:delete',
    'search:access',
    'payment-infrastructure:view', 'payment-infrastructure:manage',
    'routing-engine:view', 'routing-engine:manage',
    'risk-management:view', 'risk-management:manage', 'risk-management:approve', 'risk-management:decline',
    'analytics:view', 'analytics:export',
    'user-management:view', 'user-management:create', 'user-management:edit',
    'account-settings:view', 'account-settings:edit'
  ],
  'transaction-manager': [
    'dashboard:view',
    'transactions:view', 'transactions:create', 'transactions:edit', 'transactions:void',
    'customers:view', 'customers:edit',
    'links:view',
    'search:access',
    'payment-infrastructure:view',
    'routing-engine:view',
    'risk-management:view',
    'analytics:view',
    'account-settings:view'
  ]
};