import { UserManagement } from "@/components/sections/UserManagement";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function UserManagementPage() {
  return (
    <ProtectedRoute requiredPermission="user-management:view">
      <UserManagement />
    </ProtectedRoute>
  );
}
