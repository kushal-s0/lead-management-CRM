import * as React from "react";
import { cn } from "@/lib/utils";
import type { LeadStatus } from "@/types/lead";

const statusClasses: Record<LeadStatus, string> = {
  New: "bg-sky-50 text-sky-700 ring-sky-200",
  Contacted: "bg-amber-50 text-amber-700 ring-amber-200",
  Qualified: "bg-teal-50 text-teal-700 ring-teal-200",
  Converted: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Lost: "bg-rose-50 text-rose-700 ring-rose-200"
};

export const StatusBadge = ({ status, className }: { status: LeadStatus; className?: string }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
      statusClasses[status],
      className
    )}
  >
    {status}
  </span>
);
