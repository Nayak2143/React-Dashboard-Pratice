// src/components/layout/AuthLayout.tsx

import { ModeToggle } from "../mode-toggle";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* Auth content */}
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
