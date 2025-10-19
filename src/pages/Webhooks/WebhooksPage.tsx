import { WebhooksSection } from "@/components/sections/WebhooksSection";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function WebhooksPage() {
  return (
    <ProtectedRoute requiredPermission="payment-infrastructure:view">
      <WebhooksSection />
    </ProtectedRoute>
  );
}
