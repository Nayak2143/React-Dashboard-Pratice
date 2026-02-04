// src/routes/PublicRoute.tsx
import { useAuth } from "@/context/AuthContext";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user } = useAuth();

  // already logged in → redirect to dashboard
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
