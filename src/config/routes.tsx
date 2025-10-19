import { ReactNode } from "react";
import { 
  LayoutDashboard,
  CreditCard,
  Users,
  Link2,
  FileText,
  Repeat,
  Package,
  Terminal as TerminalIcon,
  AlertTriangle,
  DollarSign,
  RotateCcw,
  Webhook,
  BarChart3,
  Settings,
  UserCog,
  ListTodo,
  Globe,
  Shield,
  TrendingUp,
  Search,
  Sparkles
} from "lucide-react";
import { Permission } from "@/types/auth";

export interface RouteConfig {
  id: string;
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
  permission?: Permission;
  component: () => Promise<{ default: React.ComponentType<any> }>;
}

export interface NavigationSection {
  id: string;
  label: string;
  items: RouteConfig[];
}

// Route definitions with lazy loading
export const routes: RouteConfig[] = [
  {
    id: "dashboard",
    path: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    permission: "dashboard:view",
    component: () => import("@/pages/Dashboard/DashboardPage")
  },
  {
    id: "transactions",
    path: "/transactions",
    label: "Transactions",
    icon: CreditCard,
    permission: "transactions:view",
    component: () => import("@/pages/Transactions/TransactionsPage")
  },
  {
    id: "customers",
    path: "/customers",
    label: "Customers / Vault",
    icon: Users,
    permission: "customers:view",
    component: () => import("@/pages/Customers/CustomersPage")
  },
  {
    id: "invoices",
    path: "/invoices",
    label: "Invoices",
    icon: FileText,
    permission: "transactions:view",
    component: () => import("@/pages/Invoices/InvoicesPage")
  },
  {
    id: "subscriptions",
    path: "/subscriptions",
    label: "Subscriptions",
    icon: Repeat,
    permission: "transactions:view",
    component: () => import("@/pages/Subscriptions/SubscriptionsPage")
  },
  {
    id: "payment-links",
    path: "/payment-links",
    label: "Payment Links",
    icon: Link2,
    permission: "links:view",
    component: () => import("@/pages/PaymentLinks/PaymentLinksPage")
  },
  {
    id: "catalog",
    path: "/catalog",
    label: "Catalog",
    icon: Package,
    permission: "payment-infrastructure:view",
    component: () => import("@/pages/Catalog/CatalogPage")
  },
  {
    id: "virtual-terminal",
    path: "/virtual-terminal",
    label: "Virtual Terminal",
    icon: TerminalIcon,
    permission: "transactions:create",
    component: () => import("@/pages/VirtualTerminal/VirtualTerminalPage")
  },
  {
    id: "disputes",
    path: "/disputes",
    label: "Disputes",
    icon: AlertTriangle,
    permission: "transactions:view",
    component: () => import("@/pages/Disputes/DisputesPage")
  },
  {
    id: "payouts",
    path: "/payouts",
    label: "Payouts / Settlements",
    icon: DollarSign,
    permission: "analytics:view",
    component: () => import("@/pages/Payouts/PayoutsPage")
  },
  {
    id: "routing-engine",
    path: "/routing-engine",
    label: "Routing & Retry",
    icon: Globe,
    permission: "routing-engine:view",
    component: () => import("@/pages/RoutingEngine/RoutingEnginePage")
  },
  {
    id: "payment-infrastructure",
    path: "/payment-infrastructure",
    label: "Payment Setup",
    icon: Settings,
    permission: "payment-infrastructure:view",
    component: () => import("@/pages/PaymentInfrastructure/PaymentInfrastructurePage")
  },
  {
    id: "risk-management",
    path: "/risk-management",
    label: "Risk Management",
    icon: Shield,
    permission: "risk-management:view",
    component: () => import("@/pages/RiskManagement/RiskManagementPage")
  },
  {
    id: "webhooks",
    path: "/webhooks",
    label: "Webhooks",
    icon: Webhook,
    permission: "payment-infrastructure:view",
    component: () => import("@/pages/Webhooks/WebhooksPage")
  },
  {
    id: "reports",
    path: "/reports",
    label: "Reports",
    icon: BarChart3,
    permission: "analytics:view",
    component: () => import("@/pages/Reports/ReportsPage")
  },
  {
    id: "analytics",
    path: "/analytics",
    label: "Analytics",
    icon: TrendingUp,
    permission: "analytics:view",
    component: () => import("@/pages/Analytics/AnalyticsPage")
  },
  {
    id: "ai-insights",
    path: "/ai-insights",
    label: "AI Insights",
    icon: Sparkles,
    permission: "dashboard:view",
    component: () => import("@/pages/AIInsights/AIInsightsPage")
  },
  {
    id: "task-center",
    path: "/task-center",
    label: "Task Center",
    icon: ListTodo,
    permission: "dashboard:view",
    component: () => import("@/pages/TaskCenter/TaskCenterPage")
  },
  {
    id: "user-management",
    path: "/user-management",
    label: "Users & Roles",
    icon: UserCog,
    permission: "user-management:view",
    component: () => import("@/pages/UserManagement/UserManagementPage")
  },
  {
    id: "account-settings",
    path: "/account-settings",
    label: "Account Settings",
    icon: Settings,
    permission: "account-settings:view",
    component: () => import("@/pages/AccountSettings/AccountSettingsPage")
  }
];

// Grouped navigation for sidebar
export const navigationSections: NavigationSection[] = [
  {
    id: "operations",
    label: "Operations",
    items: routes.filter(r => ["dashboard", "transactions", "virtual-terminal"].includes(r.id))
  },
  {
    id: "customer-management",
    label: "Customer Management",
    items: routes.filter(r => ["customers", "subscriptions"].includes(r.id))
  },
  {
    id: "commerce",
    label: "Commerce",
    items: routes.filter(r => ["invoices", "payment-links", "catalog"].includes(r.id))
  },
  {
    id: "financial",
    label: "Financial",
    items: routes.filter(r => ["payouts", "disputes"].includes(r.id))
  },
  {
    id: "configuration",
    label: "Configuration",
    items: routes.filter(r => ["routing-engine", "payment-infrastructure", "risk-management", "webhooks"].includes(r.id))
  },
  {
    id: "insights",
    label: "Insights",
    items: routes.filter(r => ["reports", "analytics", "ai-insights"].includes(r.id))
  },
  {
    id: "administration",
    label: "Administration",
    items: routes.filter(r => ["task-center", "user-management", "account-settings"].includes(r.id))
  }
];
