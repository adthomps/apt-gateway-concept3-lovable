import { GlobalRoutingEngine } from "@/components/sections/GlobalRoutingEngine";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function RoutingEnginePage() {
  return (
    <ProtectedRoute requiredPermission="routing-engine:view">
      <GlobalRoutingEngine />
    </ProtectedRoute>
  );
}
