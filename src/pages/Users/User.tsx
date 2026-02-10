import AppBreadcrumb from "@/components/BreadCrumb/AppBreadcrumb";
import FormSheet from "@/components/Sheets/FormSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";

import { api } from "@/Instance/Instance";
import { Edit, Plus } from "lucide-react";
import { useEffect, useState } from "react";

/* ---------- TYPES ---------- */

interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role?: Role;
}

/* ---------- COMPONENT ---------- */

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState<string>("");
  const { user } = useAuth();

  const hasPermission = (perm: string) => {
    if (!user) return false;

    // Admin bypass
    if (user.role?.name === "admin") return true;

    return user.role?.permissions?.some((p: any) => p.key === perm);
  };

  /* ---------- FETCH USERS ---------- */

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res?.data?.users ?? []);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- FETCH ROLES ---------- */

  const fetchRoles = async () => {
    const res = await api.get("/roles");
    setRoles(res?.data?.roles ?? []);
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  /* ---------- CREATE USER ---------- */

  const handleAddUser = async () => {
    try {
      setSaving(true);

      await api.post("/users", {
        name: userName,
        email,
        roleId,
      });

      resetForm();
      fetchUsers();
    } finally {
      setSaving(false);
    }
  };

  /* ---------- UPDATE USER ---------- */

  const handleUpdateUser = async () => {
    try {
      setSaving(true);

      await api.put(`/users/${editUserId}`, {
        name: userName,
        email,
        roleId,
      });

      resetForm();
      fetchUsers();
    } finally {
      setSaving(false);
    }
  };

  /* ---------- EDIT CLICK ---------- */

  const openEdit = (u: User) => {
    setEditUserId(u.id);
    setUserName(u.name);
    setEmail(u.email);
    setRoleId(String(u.role?.id || ""));
    setSheetOpen(true);
  };

  /* ---------- RESET ---------- */

  const resetForm = () => {
    setSheetOpen(false);
    setEditUserId(null);
    setUserName("");
    setEmail("");
    setRoleId("");
  };

  /* ---------- UI ---------- */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">All Users</h1>
          <AppBreadcrumb />
        </div>

        {hasPermission("users.create") && (
          <FormSheet
            open={sheetOpen}
            onOpenChange={setSheetOpen}
            title={editUserId ? "Update User" : "Add User"}
            description="Create or edit user account"
            trigger={
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            }
          >
            <div className="space-y-4">
              <Label className="mb-2">Name</Label>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />

              <Label className="mb-2">Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />

              <Label className="mb-2">Role</Label>
              <Select value={roleId} onValueChange={setRoleId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>

                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r.id} value={String(r.id)}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                className="w-full"
                disabled={saving}
                onClick={editUserId ? handleUpdateUser : handleAddUser}
              >
                {saving
                  ? "Saving..."
                  : editUserId
                    ? "Update User"
                    : "Create User"}
              </Button>
            </div>
          </FormSheet>
        )}
      </div>

      {/* TABLE */}
      <div className="p-4 border rounded-lg bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role?.name}</TableCell>

                  {hasPermission("users.edit") && (
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(u)}
                      >
                        <Edit size={14} />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
