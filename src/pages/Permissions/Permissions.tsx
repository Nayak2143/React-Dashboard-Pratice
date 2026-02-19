import AppBreadcrumb from "@/components/BreadCrumb/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { api } from "@/Instance/Instance";
import FormSheet from "@/components/Sheets/FormSheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import AppPagination from "@/components/Pagination/AppPagination";

interface Permission {
  id: number;
  key: string;
  label: string;
}

export default function Permissions() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [sheetOpen, setSheetOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [key, setKey] = useState("");
  const [editPermissionId, setEditPermissionId] = useState<number | null>(null);

  const fetchPermissions = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await api.get(
        `/permissions?page=${pageNumber}&limit=${limit}`,
      );

      setPermissions(res?.data?.permissions ?? []);

      // backend should send pagination object
      setTotalPages(res?.data?.pagination?.totalPages || 1);

      setPage(pageNumber);
    } catch (err) {
      console.error("Failed to fetch permissions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions(1);
  }, []);

  const handleAddPermission = async () => {
    try {
      const res = await api.post("/permissions/create", { label, key });
      toast.success(res.data.message);
      setSheetOpen(false);
      setLabel("");
      setKey("");
      fetchPermissions();
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.error(err);
    }
  };

  const handleUpdatePermission = (permission: Permission) => {
    setEditPermissionId(permission.id);
    setLabel(permission.label);
    setKey(permission.key);
    setSheetOpen(true);
  };
  const resetForm = () => {
    setSheetOpen(false);
    setLabel("");
    setKey("");
    setEditPermissionId(null);
  };

  const updatePermissionAPI = async () => {
    try {
      const res = await api.put(`/permissions/update/${editPermissionId}`, {
        label,
        key,
      });

      toast.success(res.data.message);

      resetForm();
      fetchPermissions(page);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleDeletePermission = async (id: number) => {
    try {
      if (!confirm("Are you sure you want to delete this permission?")) return;

      const res = await api.delete(`/permissions/delete/${id}`);

      toast.success(res.data.message);

      fetchPermissions(page);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">All Users</h1>
          <AppBreadcrumb />
        </div>

        <FormSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          title={editPermissionId ? "Update Permission" : "Add Permission"}
          description="Create or update permission"
          trigger={
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 self-start sm:self-auto"
            >
              <Plus className="h-4 w-4" />
              Add New Permission
            </Button>
          }
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="mb-2">Permission Label</Label>
              <Input value={label} onChange={(e) => setLabel(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label className="mb-2">Permission Key</Label>
              <Input value={key} onChange={(e) => setKey(e.target.value)} />
            </div>

            <Button
              className="w-full"
              onClick={
                editPermissionId ? updatePermissionAPI : handleAddPermission
              }
            >
              {editPermissionId ? "Update Permission" : "Save Permission"}
            </Button>
          </div>
        </FormSheet>
      </div>

      {/* TABLE */}
      <div className="container-md p-4 border border-border rounded-lg bg-background overflow-x-auto">
        <Table>
          <TableHeader className="border-b dark:bg-muted">
            <TableRow className="hover:bg-transparent text-xl">
              <TableHead>Permission Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Loading */}
            {loading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6">
                  Loading roles...
                </TableCell>
              </TableRow>
            )}

            {/* Empty */}
            {!loading && permissions.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6">
                  No roles found
                </TableCell>
              </TableRow>
            )}

            {/* Data */}
            {!loading &&
              permissions?.map((per: any) => (
                <TableRow key={per.id}>
                  <TableCell>{per.label}</TableCell>
                  {/* Actions */}
                  <TableCell className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer border-0 shadow-none hover:text-yellow-700 hover:bg-yellow-50"
                      onClick={() => handleUpdatePermission(per)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer border-0 shadow-none hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeletePermission(per.id)}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <AppPagination
          page={page}
          totalPages={totalPages}
          onPageChange={fetchPermissions}
        />
      </div>
    </div>
  );
}
