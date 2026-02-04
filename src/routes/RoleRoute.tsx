// src/routes/RoleRoute.tsx
import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/types/auth";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function RoleRoute({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: Role[];
}) {
  const { user } = useAuth();

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
}
