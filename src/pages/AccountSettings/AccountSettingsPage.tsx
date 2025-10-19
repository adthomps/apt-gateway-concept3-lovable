import { AccountSettings } from "@/components/sections/AccountSettings";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AccountSettingsPage() {
  return (
    <ProtectedRoute requiredPermission="account-settings:view">
      <AccountSettings />
    </ProtectedRoute>
  );
}
