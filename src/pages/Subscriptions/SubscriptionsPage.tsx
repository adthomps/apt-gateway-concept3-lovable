import { SubscriptionsSection } from "@/components/sections/SubscriptionsSection";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function SubscriptionsPage() {
  return (
    <ProtectedRoute requiredPermission="transactions:view">
      <SubscriptionsSection />
    </ProtectedRoute>
  );
}
