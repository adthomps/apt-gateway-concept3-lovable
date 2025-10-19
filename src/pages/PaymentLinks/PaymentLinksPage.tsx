import { LinksSection } from "@/components/sections/LinksSection";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function PaymentLinksPage() {
  return (
    <ProtectedRoute requiredPermission="links:view">
      <LinksSection />
    </ProtectedRoute>
  );
}
