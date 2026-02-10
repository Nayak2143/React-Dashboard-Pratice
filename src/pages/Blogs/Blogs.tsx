import AppBreadcrumb from "@/components/BreadCrumb/AppBreadcrumb";
import { BlogCard } from "@/pages/Blogs/components/Cards/BlogCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Blogs() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const hasPermission = (perm: string) => {
    if (!user) return false;

    if (user.role?.name === "admin") return true;

    return user.role?.permissions?.some((p: any) => p.key === perm);
  };
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl tracking-tight font-bold">All Blogs</h1>
          <AppBreadcrumb />
        </div>

        {hasPermission("blogs.create") && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 self-start sm:self-auto"
            onClick={() => navigate("/blogs/add")}
          >
            <Plus className="h-4 w-4" />
            Add New
          </Button>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <BlogCard
          imageUrl="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
          imageAlt="Misty mountains over a serene lake"
          title="Manhattan Green Camp"
          location="Cloud City, Atmosphere 78910, Planet Earth"
          overview="Discover nature where spacious campsites, scenic trails, and cozy campfires await. Perfect for families, friends, and solo adventurers."
          price={120}
          pricePeriod="Per Night"
          onBookNow={() => {}}
          aria-label="Travel card for Manhattan Green Camp"
        />
      </div>
    </div>
  );
}
