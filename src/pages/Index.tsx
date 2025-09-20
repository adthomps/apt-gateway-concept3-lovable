import { useState } from "react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { TransactionsSection } from "@/components/sections/TransactionsSection";
import { CustomersSection } from "@/components/sections/CustomersSection";
import { LinksSection } from "@/components/sections/LinksSection";
import { SearchSection } from "@/components/sections/SearchSection";
import { PaymentInfrastructure } from "@/components/sections/PaymentInfrastructure";
import { GlobalRoutingEngine } from "@/components/sections/GlobalRoutingEngine";
import { OrchestrationAnalytics } from "@/components/analytics/OrchestrationAnalytics";
import { AccountSettings } from "@/components/sections/AccountSettings";
import { UserProfile } from "@/components/sections/UserProfile";
import { UserManagement } from "@/components/sections/UserManagement";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { usePermissions } from "@/hooks/usePermissions";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isAIOpen, setIsAIOpen] = useState(false);
  const { user } = usePermissions();

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <ProtectedRoute requiredPermission="dashboard:view">
            <DashboardContent userRole={user?.role || 'transaction-manager'} />
          </ProtectedRoute>
        );
      case "transactions":
        return (
          <ProtectedRoute requiredPermission="transactions:view">
            <TransactionsSection />
          </ProtectedRoute>
        );
      case "customers":
        return (
          <ProtectedRoute requiredPermission="customers:view">
            <CustomersSection />
          </ProtectedRoute>
        );
      case "links":
        return (
          <ProtectedRoute requiredPermission="links:view">
            <LinksSection />
          </ProtectedRoute>
        );
      case "search":
        return (
          <ProtectedRoute requiredPermission="search:access">
            <SearchSection />
          </ProtectedRoute>
        );
      case "payment-infrastructure":
        return (
          <ProtectedRoute requiredPermission="payment-infrastructure:view">
            <PaymentInfrastructure />
          </ProtectedRoute>
        );
      case "routing-engine":
        return (
          <ProtectedRoute requiredPermission="routing-engine:view">
            <GlobalRoutingEngine />
          </ProtectedRoute>
        );
      case "analytics":
        return (
          <ProtectedRoute requiredPermission="analytics:view">
            <OrchestrationAnalytics />
          </ProtectedRoute>
        );
      case "user-profile":
        return <UserProfile />;
      case "user-management":
        return (
          <ProtectedRoute requiredPermission="user-management:view">
            <UserManagement />
          </ProtectedRoute>
        );
      case "account-settings":
        return (
          <ProtectedRoute requiredPermission="account-settings:view">
            <AccountSettings />
          </ProtectedRoute>
        );
      default:
        return (
          <ProtectedRoute requiredPermission="dashboard:view">
            <DashboardContent userRole={user?.role || 'transaction-manager'} />
          </ProtectedRoute>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <DashboardHeader 
        onToggleAI={() => setIsAIOpen(!isAIOpen)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>

      <AIAssistant 
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2024 AuthorizeAI. Enhanced payment intelligence.</p>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <span>Powered by AI</span>
              <span>•</span>
              <span>Authorize.net Integration</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;