import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { usePermissions } from "@/hooks/usePermissions";

export default function DashboardPage() {
  const { user } = usePermissions();

  return <DashboardContent userRole={user?.role || 'transaction-manager'} />;
}
