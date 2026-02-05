import AppBreadcrumb from "@/components/BreadCrumb/AppBreadcrumb";
import FormSheet from "@/components/Sheets/FormSheet";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/Instance/Instance";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

/* ---------------- TYPES ---------------- */

interface Permission {
  id: number;
  key: string;
  label: string;
}

interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

/* ---------------- PAGE ---------------- */

export default function RolePage() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);

  /* -------- Sheet State -------- */

  const [sheetOpen, setSheetOpen] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [selectedPerms, setSelectedPerms] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);

  /* -------- FETCH DATA -------- */

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const res = await api.get("/roles");
      setRoles(res?.data?.roles ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      const res = await api.get("/permissions");
      setPermissions(res?.data?.permissions ?? []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  /* -------- CHECKBOX TOGGLE -------- */

  const togglePermission = (id: number) => {
    setSelectedPerms((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  /* -------- CREATE ROLE -------- */

  const handleAddRole = async () => {
    if (!roleName) return;

    try {
      setSaving(true);

      await api.post("/roles", {
        name: roleName,
        permissions: selectedPerms,
      });

      // Reset
      setRoleName("");
      setSelectedPerms([]);
      setSheetOpen(false);

      fetchRoles();
    } catch (err) {
      console.error("Role creation failed:", err);
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">All Roles</h1>
          <AppBreadcrumb />
        </div>

        {/* SHEET */}
        <FormSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          title="Add Role"
          description="Create role and assign permissions"
          trigger={
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Role
            </Button>
          }
        >
          <div className="space-y-5">
            {/* Role Name */}
            <div>
              <Label className="mb-2">Role Name</Label>
              <Input
                placeholder="ex: Admin"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
            </div>

            {/* Permissions */}
            <div>
              <Label className="mb-2 block">Permissions</Label>

              <div className="max-h-56 overflow-y-auto border rounded-md p-3 space-y-3">
                {permissions.map((perm) => (
                  <div
                    key={perm.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      checked={selectedPerms.includes(perm.id)}
                      onCheckedChange={() =>
                        togglePermission(perm.id)
                      }
                    />
                    <label className="text-sm cursor-pointer">
                      {perm.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Save */}
            <Button
              className="w-full"
              onClick={handleAddRole}
              disabled={saving}
            >
              {saving ? "Saving..." : "Create Role"}
            </Button>
          </div>
        </FormSheet>
      </div>

      {/* TABLE */}
      <div className="p-4 border rounded-lg bg-background overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6">
                  Loading roles...
                </TableCell>
              </TableRow>
            )}

            {!loading && roles.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6">
                  No roles found
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">
                    {role.name}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((perm) => (
                        <span
                          key={perm.id}
                          className="px-2 py-1 text-xs bg-gray-200 rounded-md"
                        >
                          {perm.label}
                        </span>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        navigate(`/roles/edit/${role.id}`)
                      }
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
