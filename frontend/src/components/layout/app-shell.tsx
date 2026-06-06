import type { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export const AppShell = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen bg-background">
    <Sidebar />
    <div className="flex min-w-0 flex-1 flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
    </div>
  </div>
);
