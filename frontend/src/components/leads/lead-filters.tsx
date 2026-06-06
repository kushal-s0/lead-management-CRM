"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { leadStatuses, type LeadStatus } from "@/types/lead";

export type LeadFiltersState = {
  search: string;
  status: LeadStatus | "All";
  sortBy: "name" | "createdAt" | "status";
  order: "asc" | "desc";
};

type LeadFiltersProps = {
  filters: LeadFiltersState;
  onChange: (filters: LeadFiltersState) => void;
};

export const LeadFilters = ({ filters, onChange }: LeadFiltersProps) => (
  <div className="grid gap-3 lg:grid-cols-[minmax(220px,1fr)_180px_180px_130px_auto]">
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={filters.search}
        onChange={(event) => onChange({ ...filters, search: event.target.value })}
        placeholder="Search name, email, company"
        className="pl-9"
      />
    </div>
    <Select
      value={filters.status}
      onChange={(event) => onChange({ ...filters, status: event.target.value as LeadStatus | "All" })}
      aria-label="Filter by status"
    >
      <option value="All">All statuses</option>
      {leadStatuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </Select>
    <Select
      value={filters.sortBy}
      onChange={(event) => onChange({ ...filters, sortBy: event.target.value as LeadFiltersState["sortBy"] })}
      aria-label="Sort leads"
    >
      <option value="createdAt">Created Date</option>
      <option value="name">Name</option>
      <option value="status">Status</option>
    </Select>
    <Select
      value={filters.order}
      onChange={(event) => onChange({ ...filters, order: event.target.value as "asc" | "desc" })}
      aria-label="Sort order"
    >
      <option value="desc">Descending</option>
      <option value="asc">Ascending</option>
    </Select>
    <Button
      variant="outline"
      onClick={() => onChange({ search: "", status: "All", sortBy: "createdAt", order: "desc" })}
    >
      <SlidersHorizontal className="h-4 w-4" />
      Reset
    </Button>
  </div>
);
