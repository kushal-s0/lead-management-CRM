"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sidebar } from "./sidebar";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const search = query.trim();
    router.push(search ? `/leads?search=${encodeURIComponent(search)}` : "/leads");
  };

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
      <form className="relative hidden min-w-72 md:block" onSubmit={handleSearch}>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search leads"
          className="h-9 pl-9"
          aria-label="Search leads by name, email, or company"
        />
      </form>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="left-0 top-0 h-full w-72 max-w-none translate-x-0 translate-y-0 rounded-none p-0">
          <Sidebar mobile onNavigate={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </header>
  );
};
