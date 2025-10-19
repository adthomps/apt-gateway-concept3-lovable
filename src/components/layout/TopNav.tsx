import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import { 
  Bot,
  Menu,
  Bell,
  ListTodo,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Shield,
  Building2,
  CreditCard
} from "lucide-react";
import { AISearch } from "@/components/search/AISearch";

interface TopNavProps {
  onToggleAI: () => void;
}

export function TopNav({ onToggleAI }: TopNavProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Product Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hidden lg:flex items-center space-x-2">
                <div className="bg-gradient-primary p-1.5 rounded">
                  <CreditCard className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold">APT Gateway</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                Gateway
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Building2 className="mr-2 h-4 w-4" />
                Connect (Coming Soon)
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Shield className="mr-2 h-4 w-4" />
                Terminal (Coming Soon)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Center - AI Search */}
        <div className="flex-1 max-w-2xl mx-4 hidden md:block">
          <AISearch />
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* AI Copilot Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleAI}
            className="hidden sm:flex items-center space-x-2 bg-accent/10 border-accent/20 hover:bg-accent/20"
          >
            <Bot className="h-4 w-4" />
            <span className="hidden lg:inline">AI Copilot</span>
          </Button>

          {/* Mobile AI Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleAI}
            className="sm:hidden"
          >
            <Bot className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-4 space-y-3">
                <div className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-md cursor-pointer">
                  <Shield className="h-4 w-4 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New Dispute Filed</p>
                    <p className="text-xs text-muted-foreground">Customer disputed transaction #TXN001</p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-md cursor-pointer">
                  <ListTodo className="h-4 w-4 text-accent mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">3 Tasks Pending</p>
                    <p className="text-xs text-muted-foreground">Review high-risk transactions</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2">
                <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate('/task-center')}>
                  View All Notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Task Center Badge */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hidden sm:flex"
            onClick={() => navigate('/task-center')}
          >
            <ListTodo className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
              3
            </Badge>
          </Button>

          {/* Organization Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden lg:flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span className="text-sm">Acme Corp</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Organizations</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Building2 className="mr-2 h-4 w-4" />
                Acme Corp
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                + Create Organization
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <ThemeToggle />

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
              <DropdownMenuItem onClick={() => navigate('/user-profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/account-settings')}>
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
        </div>
      </div>
    </div>
  );
}
