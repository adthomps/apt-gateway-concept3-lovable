import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";
import { 
  BarChart3, 
  CreditCard, 
  Search, 
  Settings, 
  Users, 
  Link2, 
  Bot,
  Menu,
  X,
  Globe,
  User,
  UserCog,
  LogOut,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  onToggleAI: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "transactions", label: "Transactions", icon: CreditCard },
  { id: "customers", label: "Customers", icon: Users },
  { id: "links", label: "Links & Forms", icon: Link2 },
  { id: "payment-infrastructure", label: "Payment Setup", icon: Settings },
  { id: "routing-engine", label: "Routing Engine", icon: Globe },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "search", label: "Search", icon: Search },
  { id: "user-profile", label: "Profile", icon: User },
  { id: "user-management", label: "Users", icon: UserCog },
  { id: "account-settings", label: "Account", icon: Settings },
];

export function DashboardHeader({ onToggleAI, activeSection, onSectionChange }: DashboardHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getNavSections } = usePermissions();
  
  const allowedSections = getNavSections();
  const visibleNavItems = navigationItems.filter(item => 
    allowedSections.some(section => section.id === item.id)
  );

  return (
    <div className="sticky top-0 z-50 bg-gradient-subtle border-b border-border backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-primary">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AuthorizeAI
              </h1>
              <p className="text-xs text-muted-foreground">Payment Intelligence</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onSectionChange(item.id)}
                  className="flex items-center space-x-2 transition-smooth"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleAI}
              className="bg-accent/10 border-accent/20 hover:bg-accent/20 transition-smooth"
            >
              <Bot className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">AI Assistant</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    <div className="flex items-center pt-1">
                      <Badge variant="secondary" className="text-xs capitalize">
                        <Shield className="w-3 h-3 mr-1" />
                        {user?.role?.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onSectionChange('user-profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSectionChange('account-settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="grid grid-cols-2 gap-2">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-start space-x-2 w-full"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{item.label}</span>
                  </Button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}