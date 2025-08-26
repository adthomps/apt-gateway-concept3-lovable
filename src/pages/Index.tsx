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

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isAIOpen, setIsAIOpen] = useState(false);
  
  // Simulate user role - in real app this would come from auth/context
  const [userRole] = useState<"admin" | "operator" | "viewer" | "limited">("admin");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent userRole={userRole} />;
      case "transactions":
        return <TransactionsSection />;
      case "customers":
        return <CustomersSection />;
      case "links":
        return <LinksSection />;
      case "search":
        return <SearchSection />;
      case "payment-infrastructure":
        return <PaymentInfrastructure />;
      case "routing-engine":
        return <GlobalRoutingEngine />;
      case "analytics":
        return <OrchestrationAnalytics />;
      case "user-profile":
        return <UserProfile />;
      case "user-management":
        return <UserManagement />;
      case "account-settings":
        return <AccountSettings />;
      default:
        return <DashboardContent userRole={userRole} />;
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