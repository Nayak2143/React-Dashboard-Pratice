// src/types/auth.ts
export type Role = "admin" | "manager" | "user";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  permissions: string[];
}
