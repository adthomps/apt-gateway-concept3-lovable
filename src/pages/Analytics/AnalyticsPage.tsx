import { OrchestrationAnalytics } from "@/components/analytics/OrchestrationAnalytics";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AnalyticsPage() {
  return (
    <ProtectedRoute requiredPermission="analytics:view">
      <OrchestrationAnalytics />
    </ProtectedRoute>
  );
}
