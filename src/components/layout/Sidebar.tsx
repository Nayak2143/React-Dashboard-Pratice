import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

import { useAuth } from "@/context/AuthContext";
import Logo from "@/assets/Logo/LOGO4.webp";

import LogoutDialog from "../Dialog/LogoutDialog";

import {
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  ChevronDown,
} from "lucide-react";

/* -------------------------------- MENU CONFIG -------------------------------- */

const menu = [
  {
    label: "Dashboard",
    path: "/",
    permission: null,
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/users",
    permission: "users.view",
    icon: Users,
  },
  {
    label: "Blogs",
    permission: "users.view",
    icon: FileText,
    children: [
      {
        label: "All Blogs",
        path: "/blogs",
      }
    ],
  },
  {
    label: "Settings",
    permission: "settings.manage",
    icon: Settings,
    children: [
      {
        label: "General",
        path: "/settings",
      },
      {
        label: "Profile",
        path: "/settings/profile",
      },
    ],
  },
];

/* -------------------------------- COMPONENT -------------------------------- */

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState<string[]>([]);

  /* ---- auto expand parent when child active ---- */
  useEffect(() => {
    menu.forEach((item) => {
      if (item.children?.some((c) => location.pathname.startsWith(c.path))) {
        setOpenMenus((prev) =>
          prev.includes(item.label) ? prev : [...prev, item.label],
        );
      }
    });
  }, [location.pathname]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  return (
    <aside className="w-64 bg-slate-100 dark:bg-zinc-800 lg:ms-2 lg:my-2 lg:rounded-xl flex flex-col h-full lg:h-auto overflow-hidden">
      {/* -------------------- LOGO -------------------- */}
      <div className="h-24 flex items-center px-6 text-lg font-semibold dark:bg-gray-300/50">
        <img src={Logo} alt="Logo" className="w-full h-20 object-contain" />
      </div>

      {/* -------------------- NAV -------------------- */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menu.map((item) => {
          if (item?.permission && !user?.permissions?.includes(item?.permission)) {
            return null;
          }

          const Icon = item.icon;

          const isParentActive =
            item.children?.some((c) => location.pathname.startsWith(c.path)) ||
            location.pathname === item.path;

          /* ----------- SIMPLE LINK ----------- */
          if (!item.children) {
            return (
              <NavLink
                key={item.label}
                to={item.path!}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    "hover:bg-white dark:hover:bg-gray-100",
                    isActive
                      ? "bg-white dark:bg-gray-100 border-l-4 border-orange-500 text-orange-600"
                      : "text-muted-foreground",
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          }

          /* ----------- SUB MENU ----------- */
          return (
            <div key={item.label} className="space-y-1">
              <button
                onClick={() => toggleMenu(item.label)}
                className={clsx(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-white dark:hover:bg-gray-100",
                  isParentActive &&
                    "bg-white dark:bg-gray-100 border-l-4 border-orange-500 text-orange-600",
                )}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>

                <ChevronDown
                  className={clsx(
                    "h-4 w-4 transition-transform duration-200",
                    openMenus.includes(item.label) && "rotate-180",
                  )}
                />
              </button>

              {openMenus.includes(item.label) && (
                <div className="ml-6 space-y-1">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive }) =>
                        clsx(
                          "block rounded-md px-3 py-2 text-sm transition-colors",
                          "hover:bg-white dark:hover:bg-gray-100",
                          isActive
                            ? "bg-orange-50 text-orange-600 dark:bg-orange-100"
                            : "text-muted-foreground",
                        )
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* -------------------- LOGOUT -------------------- */}
      <div className="my-2 mx-2">
        <LogoutDialog
          onConfirm={() => {
            logout();
            navigate("/login");
          }}
        />
      </div>
    </aside>
  );
}
