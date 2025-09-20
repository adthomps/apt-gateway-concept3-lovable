import { useAuth } from '@/contexts/AuthContext';
import { Permission, UserRole } from '@/types/auth';

export function usePermissions() {
  const { user, hasPermission, hasRole } = useAuth();

  const checkPermissions = {
    // Dashboard permissions
    canViewDashboard: () => hasPermission('dashboard:view'),
    
    // Transaction permissions
    canViewTransactions: () => hasPermission('transactions:view'),
    canCreateTransactions: () => hasPermission('transactions:create'),
    canEditTransactions: () => hasPermission('transactions:edit'),
    canDeleteTransactions: () => hasPermission('transactions:delete'),
    
    // Customer permissions
    canViewCustomers: () => hasPermission('customers:view'),
    canCreateCustomers: () => hasPermission('customers:create'),
    canEditCustomers: () => hasPermission('customers:edit'),
    canDeleteCustomers: () => hasPermission('customers:delete'),
    
    // Links permissions
    canViewLinks: () => hasPermission('links:view'),
    canCreateLinks: () => hasPermission('links:create'),
    canEditLinks: () => hasPermission('links:edit'),
    canDeleteLinks: () => hasPermission('links:delete'),
    
    // Search permissions
    canAccessSearch: () => hasPermission('search:access'),
    
    // Payment infrastructure permissions
    canViewPaymentInfrastructure: () => hasPermission('payment-infrastructure:view'),
    canManagePaymentInfrastructure: () => hasPermission('payment-infrastructure:manage'),
    
    // Routing engine permissions
    canViewRoutingEngine: () => hasPermission('routing-engine:view'),
    canManageRoutingEngine: () => hasPermission('routing-engine:manage'),
    
    // Analytics permissions
    canViewAnalytics: () => hasPermission('analytics:view'),
    canExportAnalytics: () => hasPermission('analytics:export'),
    
    // User management permissions
    canViewUserManagement: () => hasPermission('user-management:view'),
    canCreateUsers: () => hasPermission('user-management:create'),
    canEditUsers: () => hasPermission('user-management:edit'),
    canDeleteUsers: () => hasPermission('user-management:delete'),
    
    // Account settings permissions
    canViewAccountSettings: () => hasPermission('account-settings:view'),
    canEditAccountSettings: () => hasPermission('account-settings:edit'),
    
    // System permissions
    canAccessSystemAdmin: () => hasPermission('system:admin'),
    
    // Role checks
    isOwner: () => hasRole('owner'),
    isAdmin: () => hasRole('admin'),
    isTransactionManager: () => hasRole('transaction-manager'),
    
    // Combined permission checks
    canManageUsers: () => hasPermission('user-management:create') || 
                        hasPermission('user-management:edit') || 
                        hasPermission('user-management:delete'),
    
    canManageTransactions: () => hasPermission('transactions:create') || 
                              hasPermission('transactions:edit') || 
                              hasPermission('transactions:delete'),
    
    canManageCustomers: () => hasPermission('customers:create') || 
                           hasPermission('customers:edit') || 
                           hasPermission('customers:delete'),
    
    canManageSystem: () => hasPermission('payment-infrastructure:manage') || 
                          hasPermission('routing-engine:manage') || 
                          hasPermission('system:admin')
  };

  const getNavSections = () => {
    const sections = [];
    
    if (checkPermissions.canViewDashboard()) {
      sections.push({ id: 'dashboard', label: 'Dashboard' });
    }
    
    if (checkPermissions.canViewTransactions()) {
      sections.push({ id: 'transactions', label: 'Transactions' });
    }
    
    if (checkPermissions.canViewCustomers()) {
      sections.push({ id: 'customers', label: 'Customers' });
    }
    
    if (checkPermissions.canViewLinks()) {
      sections.push({ id: 'links', label: 'Links' });
    }
    
    if (checkPermissions.canAccessSearch()) {
      sections.push({ id: 'search', label: 'Search' });
    }
    
    if (checkPermissions.canViewPaymentInfrastructure()) {
      sections.push({ id: 'payment-infrastructure', label: 'Payment Infrastructure' });
    }
    
    if (checkPermissions.canViewRoutingEngine()) {
      sections.push({ id: 'routing-engine', label: 'Routing Engine' });
    }
    
    if (checkPermissions.canViewAnalytics()) {
      sections.push({ id: 'analytics', label: 'Analytics' });
    }
    
    if (checkPermissions.canViewUserManagement()) {
      sections.push({ id: 'user-management', label: 'User Management' });
    }
    
    if (checkPermissions.canViewAccountSettings()) {
      sections.push({ id: 'account-settings', label: 'Account Settings' });
    }
    
    return sections;
  };

  return {
    user,
    ...checkPermissions,
    getNavSections,
    hasPermission,
    hasRole
  };
}