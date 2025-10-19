import { DisputesSection } from "@/components/sections/DisputesSection";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DisputesPage() {
  return (
    <ProtectedRoute requiredPermission="transactions:view">
      <DisputesSection />
    </ProtectedRoute>
  );
}
