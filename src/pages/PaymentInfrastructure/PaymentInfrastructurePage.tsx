import { PaymentInfrastructure } from "@/components/sections/PaymentInfrastructure";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function PaymentInfrastructurePage() {
  return (
    <ProtectedRoute requiredPermission="payment-infrastructure:view">
      <PaymentInfrastructure />
    </ProtectedRoute>
  );
}
