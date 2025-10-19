import { PayoutsSection } from "@/components/sections/PayoutsSection";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function PayoutsPage() {
  return (
    <ProtectedRoute requiredPermission="analytics:view">
      <PayoutsSection />
    </ProtectedRoute>
  );
}
