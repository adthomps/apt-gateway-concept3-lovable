import { RiskManagement } from "@/components/sections/RiskManagement";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function RiskManagementPage() {
  return (
    <ProtectedRoute requiredPermission="risk-management:view">
      <RiskManagement />
    </ProtectedRoute>
  );
}
