import AddNewBlog from "@/pages/Blogs/AddNewBlog";
import Blogs from "@/pages/Blogs/Blogs";
import Dashboard from "@/pages/Dashboard";
import AddPermission from "@/pages/Permissions/AddPermission";
import Permissions from "@/pages/Permissions/Permissions";
import AddRole from "@/pages/Roles/AddRole";
import Role from "@/pages/Roles/Role";
import User from "@/pages/Users/User";

export const privateRoutes = [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/users",
    component: User,
    permission: "users.view",
  },
  {
    path: "/blogs",
    component: Blogs,
    permission: "blogs.view",
  },
  {
    path: "/blogs/add",
    component: AddNewBlog,
    permission: "blogs.create",
  },
  {
    path: "/roles",
    component: Role,
    permission: "roles.view",
  },
  {
    path: "/roles/add",
    component: AddRole,
    permission: "roles.create",
  },
  {
    path: "/permissions",
    component: Permissions,
    permission: "permission.view",
  },
  {
    path: "/permissions/add",
    component: AddPermission,
    permission: "permission.create",
  },
];
