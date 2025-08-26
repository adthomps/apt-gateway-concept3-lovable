import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  UserPlus, 
  Filter,
  Users,
  Shield,
  Eye,
  EyeOff,
  Check,
  X
} from "lucide-react";

// Mock users data
const mockUsers = [
  {
    id: "user-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Admin",
    department: "Finance",
    status: "active",
    lastLogin: "2024-01-20T14:30:00Z",
    avatar: "",
    permissions: ["all"]
  },
  {
    id: "user-002", 
    name: "Mike Chen",
    email: "mike.chen@company.com",
    role: "Operator",
    department: "Operations",
    status: "active",
    lastLogin: "2024-01-19T09:15:00Z",
    avatar: "",
    permissions: ["transactions", "customers", "analytics"]
  },
  {
    id: "user-003",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com", 
    role: "Viewer",
    department: "Compliance",
    status: "active",
    lastLogin: "2024-01-18T16:45:00Z",
    avatar: "",
    permissions: ["analytics", "reports"]
  },
  {
    id: "user-004",
    name: "David Kim",
    email: "david.kim@company.com",
    role: "Limited",
    department: "Support",
    status: "inactive",
    lastLogin: "2024-01-10T11:20:00Z",
    avatar: "",
    permissions: ["basic"]
  },
  {
    id: "user-005",
    name: "Lisa Wang",
    email: "lisa.wang@company.com",
    role: "Operator",
    department: "Finance",
    status: "active",
    lastLogin: "2024-01-20T08:30:00Z",
    avatar: "",
    permissions: ["transactions", "customers"]
  }
];

const roleOptions = ["Admin", "Operator", "Viewer", "Limited"];
const departmentOptions = ["Finance", "Operations", "Compliance", "Support", "IT", "Sales"];
const permissionOptions = [
  { id: "dashboard", label: "Dashboard Access" },
  { id: "transactions", label: "Transaction Management" },
  { id: "customers", label: "Customer Management" },
  { id: "analytics", label: "Analytics & Reports" },
  { id: "payment-infrastructure", label: "Payment Infrastructure" },
  { id: "routing-engine", label: "Routing Engine" },
  { id: "user-management", label: "User Management" },
  { id: "settings", label: "System Settings" }
];

export function UserManagement() {
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<typeof mockUsers[0] | null>(null);
  
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    permissions: [] as string[]
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge variant="secondary" className="bg-success/10 text-success">
        <Check className="w-3 h-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-muted text-muted-foreground">
        <X className="w-3 h-3 mr-1" />
        Inactive
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      Admin: "default",
      Operator: "secondary", 
      Viewer: "outline",
      Limited: "secondary"
    } as const;

    return (
      <Badge variant={variants[role as keyof typeof variants] || "outline"}>
        {role}
      </Badge>
    );
  };

  const handleAddUser = () => {
    console.log("Adding user:", newUser);
    setIsAddUserOpen(false);
    setNewUser({ name: "", email: "", role: "", department: "", permissions: [] });
  };

  const handleEditUser = (user: typeof mockUsers[0]) => {
    setEditingUser(user);
  };

  const handleUpdateUser = () => {
    console.log("Updating user:", editingUser);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    console.log("Deleting user:", userId);
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (editingUser) {
      const newPermissions = checked 
        ? [...editingUser.permissions, permissionId]
        : editingUser.permissions.filter(p => p !== permissionId);
      setEditingUser({ ...editingUser, permissions: newPermissions });
    } else {
      const newPermissions = checked 
        ? [...newUser.permissions, permissionId]
        : newUser.permissions.filter(p => p !== permissionId);
      setNewUser({ ...newUser, permissions: newPermissions });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage user accounts, roles, and permissions</p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account with appropriate permissions</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-name">Full Name</Label>
                  <Input
                    id="new-name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-email">Email</Label>
                  <Input
                    id="new-email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-role">Role</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-department">Department</Label>
                  <Select value={newUser.department} onValueChange={(value) => setNewUser({ ...newUser, department: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentOptions.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-3">
                  {permissionOptions.map(permission => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`new-${permission.id}`}
                        checked={newUser.permissions.includes(permission.id)}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, !!checked)}
                      />
                      <Label htmlFor={`new-${permission.id}`} className="text-sm">
                        {permission.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
                <Button onClick={handleAddUser}>Add User</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-8 h-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.role === 'Admin').length}</p>
                <p className="text-sm text-muted-foreground">Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <EyeOff className="w-8 h-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.status === 'inactive').length}</p>
                <p className="text-sm text-muted-foreground">Inactive Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roleOptions.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(user.lastLogin).toLocaleDateString()}
                      <br />
                      <span className="text-muted-foreground">
                        {new Date(user.lastLogin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and permissions</DialogDescription>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select 
                    value={editingUser.role} 
                    onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Select 
                    value={editingUser.department} 
                    onValueChange={(value) => setEditingUser({ ...editingUser, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentOptions.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-3">
                  {permissionOptions.map(permission => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-${permission.id}`}
                        checked={editingUser.permissions.includes(permission.id)}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, !!checked)}
                      />
                      <Label htmlFor={`edit-${permission.id}`} className="text-sm">
                        {permission.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setEditingUser(null)}>Cancel</Button>
                <Button onClick={handleUpdateUser}>Update User</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}