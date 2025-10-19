import { TransactionsSection } from "@/components/sections/TransactionsSection";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function TransactionsPage() {
  return (
    <ProtectedRoute requiredPermission="transactions:view">
      <TransactionsSection />
    </ProtectedRoute>
  );
}
