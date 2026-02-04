// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import User from "@/pages/User";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Forbidden from "@/pages/Forbidden";
import Login from "@/pages/Auth/Login";
import AuthLayout from "@/components/layout/AuthLayout";
import PermissionRoute from "./PermissionRoute";
import Blogs from "@/pages/Blogs/Blogs";
import AddNewBlog from "@/pages/Blogs/AddNewBlog";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthLayout>
              <Login />
            </AuthLayout>
          </PublicRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          </PublicRoute>
        }
      />

            <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <AuthLayout>
              <ResetPassword />
            </AuthLayout>
          </PublicRoute>
        }
      />

      {/* PRIVATE */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/users"
        element={
          <PrivateRoute>
            <PermissionRoute permission="users.view">
              <AppLayout>
                <User />
              </AppLayout>
            </PermissionRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/blogs"
        element={
          <PrivateRoute>
            <PermissionRoute permission="users.view">
              <AppLayout>
                <Blogs />
              </AppLayout>
            </PermissionRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/blogs/add"
        element={
          <PrivateRoute>
            <PermissionRoute permission="users.view">
              <AppLayout>
                <AddNewBlog />
              </AppLayout>
            </PermissionRoute>
          </PrivateRoute>
        }
      />

      <Route path="/403" element={<Forbidden />} />
    </Routes>
  );
}
