// src/routes/PermissionRoute.tsx
import { useAuth } from "@/context/AuthContext";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  permission: string;
}

export default function PermissionRoute({ children, permission }: Props) {
  const { user } = useAuth();

  if (!user || !user.permissions.includes(permission)) {
    return <Navigate to="/403" replace />;
  }

  return children;
}
