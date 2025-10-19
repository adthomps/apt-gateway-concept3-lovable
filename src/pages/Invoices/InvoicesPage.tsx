import { InvoicesSection } from "@/components/sections/InvoicesSection";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function InvoicesPage() {
  return (
    <ProtectedRoute requiredPermission="transactions:view">
      <InvoicesSection />
    </ProtectedRoute>
  );
}
