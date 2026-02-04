// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import AppRoutes from "@/routes/AppRoutes";

import "./index.css";
import { Authprovider } from "./context/AuthContext";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Authprovider>
          <AppRoutes />
          <Toaster position="top-center" />
        </Authprovider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
