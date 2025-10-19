import { VirtualTerminalSection } from "@/components/sections/VirtualTerminalSection";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function VirtualTerminalPage() {
  return (
    <ProtectedRoute requiredPermission="transactions:create">
      <VirtualTerminalSection />
    </ProtectedRoute>
  );
}
