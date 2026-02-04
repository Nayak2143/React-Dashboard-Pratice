// src/constants/dummyUser.ts

import type { AuthUser } from "@/types/auth";

export const DUMMY_USER: AuthUser = {
  id: 1,
  name: "Admin User",
  email: "admin@example.com",
  role: "admin",
  permissions: [
    "users.view",
    "settings.manage",
  ],
};
