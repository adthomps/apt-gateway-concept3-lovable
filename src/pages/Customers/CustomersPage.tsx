import { CustomersSection } from "@/components/sections/CustomersSection";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function CustomersPage() {
  return (
    <ProtectedRoute requiredPermission="customers:view">
      <CustomersSection />
    </ProtectedRoute>
  );
}
