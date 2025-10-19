import { TaskCenterSection } from "@/components/sections/TaskCenterSection";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function TaskCenterPage() {
  return (
    <ProtectedRoute requiredPermission="dashboard:view">
      <TaskCenterSection />
    </ProtectedRoute>
  );
}
