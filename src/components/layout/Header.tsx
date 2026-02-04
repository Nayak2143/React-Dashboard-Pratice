import { Button } from "@/components/ui/button";
import { Bell, Globe, Menu } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <header className="h-14 flex items-center justify-between px-4 mx-2 bg-slate-100 dark:bg-zinc-800 my-2 rounded-xl">
      <div className="flex items-center gap-2">
        {/* Mobile menu button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-64 sm:w-72 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* View Live Website */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open("https://vedaskinandhair.com/", "_blank")}
          className="relative"
        >
          {/* Ripple Dot */}
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>

          <Globe className="h-10 w-10"/>
        </Button>

        <ModeToggle />

        <Button size="icon" variant="ghost">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
