import AppBreadcrumb from "@/components/BreadCrumb/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
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

interface Permission {
  id: number;
  key: string;
  label: string;
}

export default function Permissions() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [key, setKey] = useState("");

  const fetchPermissions = async () => {
    try {
      const res = await api.get("/permissions");
      console.log("all permissions res", res?.data.permissions);
      setPermissions(res?.data?.permissions);
    } catch (err) {
      console.error("Failed to fetch roles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleAddPermission = async () => {
    try {
      const res = await api.post("/permissions/create", { label, key });
      console.log("add permission res", res?.data);

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
          title="Add Permission"
          description="Create a new permission"
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

            <Button className="w-full" onClick={handleAddPermission}>
              Save Permission
            </Button>
          </div>
        </FormSheet>
      </div>

      {/* TABLE */}
      <div className="container-md p-4 border border-border rounded-lg bg-background overflow-x-auto">
        <Table>
          <TableHeader className="border-b bg-slate-50">
            <TableRow className="hover:bg-transparent">
              <TableHead>Permission Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
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
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => navigate(`/roles/edit/${per.id}`)}
                    >
                      <Edit />
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
