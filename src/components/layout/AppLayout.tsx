// src/components/layout/AppLayout.tsx
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex">
        <Sidebar />
      </aside>

      {/* Main Section */}
      <div className="flex flex-col flex-1">
        <Header />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-slate-100 dark:bg-zinc-800 mx-2 mb-2 rounded-xl">
          {children}
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
