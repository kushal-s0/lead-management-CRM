"use client";

import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sidebar } from "./sidebar";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-4 w-4" />
        </Button>
        <div>
          <p className="text-sm font-semibold text-foreground">Lead workspace</p>
          <p className="hidden text-xs text-muted-foreground sm:block">Track prospects from first touch to close</p>
        </div>
      </div>
      <div className="hidden h-9 min-w-72 items-center gap-2 rounded-md border bg-card px-3 text-sm text-muted-foreground md:flex">
        <Search className="h-4 w-4" />
        Search from the Leads page
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="left-0 top-0 h-full w-72 max-w-none translate-x-0 translate-y-0 rounded-none p-0">
          <Sidebar mobile onNavigate={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </header>
  );
};
