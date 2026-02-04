import AppBreadcrumb from "@/components/BreadCrumb/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Users() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">All Users</h1>
          <AppBreadcrumb />
        </div>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"></div>
    </div>
  );
}
