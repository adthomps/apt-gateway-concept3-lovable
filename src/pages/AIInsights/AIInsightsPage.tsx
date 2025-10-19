import { AIInsightsSection } from "@/components/sections/AIInsightsSection";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AIInsightsPage() {
  return (
    <ProtectedRoute requiredPermission="dashboard:view">
      <AIInsightsSection />
    </ProtectedRoute>
  );
}
