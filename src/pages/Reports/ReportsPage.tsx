import { ReportsSection } from "@/components/sections/ReportsSection";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function ReportsPage() {
  return (
    <ProtectedRoute requiredPermission="analytics:view">
      <ReportsSection />
    </ProtectedRoute>
  );
}
