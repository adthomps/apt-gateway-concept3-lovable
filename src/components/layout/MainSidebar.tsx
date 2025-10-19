import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Sparkles } from "lucide-react";
import { navigationSections } from "@/config/routes";
import { usePermissions } from "@/hooks/usePermissions";
import { cn } from "@/lib/utils";

export function MainSidebar() {
  const location = useLocation();
  const { hasPermission } = usePermissions();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border p-4">
        <Link to="/" className="flex items-center space-x-3">
          <div className="bg-gradient-primary p-2 rounded-lg shadow-primary">
            <CreditCard className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              APT Gateway
            </h1>
            <p className="text-xs text-muted-foreground">Payment Intelligence</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {navigationSections.map((section) => {
          const visibleItems = section.items.filter(item =>
            !item.permission || hasPermission(item.permission)
          );

          if (visibleItems.length === 0) return null;

          return (
            <SidebarGroup key={section.id}>
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {visibleItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    const showAIBadge = item.id === "dashboard" || item.id === "ai-insights";

                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link 
                            to={item.path}
                            className={cn(
                              "flex items-center space-x-3 px-3 py-2 rounded-md transition-smooth",
                              isActive 
                                ? "bg-primary text-primary-foreground shadow-sm" 
                                : "hover:bg-muted"
                            )}
                          >
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            <span className="flex-1">{item.label}</span>
                            {showAIBadge && (
                              <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0">
                                <Sparkles className="h-2.5 w-2.5" />
                              </Badge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className="text-xs text-muted-foreground">
          <p>© 2025 APT Payments</p>
          <p className="mt-1">v2.0.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
