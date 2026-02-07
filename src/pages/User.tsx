import AppBreadcrumb from "@/components/BreadCrumb/AppBreadcrumb";
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
import { Edit, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/users");

      setUsers(res?.data?.users ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            All Users
          </h1>
          <AppBreadcrumb />
        </div>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => navigate("/users/create")}
        >
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* TABLE */}
      <div className="p-4 border rounded-lg bg-background overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Loading */}
            {loading && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  Loading users...
                </TableCell>
              </TableRow>
            )}

            {/* Empty */}
            {!loading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No users found
                </TableCell>
              </TableRow>
            )}

            {/* Data */}
            {!loading &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.name}
                  </TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell>
                    {user.role?.name ?? "-"}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        navigate(`/users/edit/${user.id}`)
                      }
                    >
                      <Edit size={16} />
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
