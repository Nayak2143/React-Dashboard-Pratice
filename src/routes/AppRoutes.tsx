import { Routes, Route } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import PermissionRoute from "./PermissionRoute";

import AuthLayout from "@/components/layout/AuthLayout";
import AppLayout from "@/components/layout/AppLayout";

import Login from "@/pages/Auth/Login";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";
import Forbidden from "@/pages/Forbidden";
import { privateRoutes } from "./RouteConfig";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}

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

      {/* ================= PRIVATE AUTO ================= */}

      {privateRoutes.map((route) => {
        const Page = route.component;

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PrivateRoute>
                {route.permission ? (
                  <PermissionRoute permission={route.permission}>
                    <AppLayout>
                      <Page />
                    </AppLayout>
                  </PermissionRoute>
                ) : (
                  <AppLayout>
                    <Page />
                  </AppLayout>
                )}
              </PrivateRoute>
            }
          />
        );
      })}

      {/* ================= FORBIDDEN ================= */}

      <Route path="/403" element={<Forbidden />} />
    </Routes>
  );
}
