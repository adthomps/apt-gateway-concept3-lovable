import { CatalogSection } from "@/components/sections/CatalogSection";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function CatalogPage() {
  return (
    <ProtectedRoute requiredPermission="payment-infrastructure:view">
      <CatalogSection />
    </ProtectedRoute>
  );
}
