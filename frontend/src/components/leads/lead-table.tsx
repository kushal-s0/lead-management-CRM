"use client";

import Link from "next/link";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/badge";
import { leadStatuses, type Lead, type LeadStatus } from "@/types/lead";

type LeadTableProps = {
  leads: Lead[];
  loading: boolean;
  onDelete: (lead: Lead) => void;
  onStatusChange: (lead: Lead, status: LeadStatus) => void;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(new Date(value));

export const LeadTable = ({ leads, loading, onDelete, onStatusChange }: LeadTableProps) => {
  if (loading) {
    return (
      <div className="space-y-3 p-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-14 animate-pulse rounded-md bg-muted" />
        ))}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center gap-3 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
          <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">No leads found</p>
          <p className="mt-1 text-sm text-muted-foreground">Create a new lead or adjust the current filters.</p>
        </div>
        <Button asChild>
          <Link href="/leads/new">Create Lead</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[920px] text-left text-sm">
        <thead className="border-b bg-muted/60 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-5 py-3 font-medium">Lead</th>
            <th className="px-5 py-3 font-medium">Company</th>
            <th className="px-5 py-3 font-medium">Phone</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Created</th>
            <th className="px-5 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {leads.map((lead) => (
            <tr key={lead._id} className="bg-card transition-colors hover:bg-muted/40">
              <td className="px-5 py-4">
                <div className="font-medium">{lead.name}</div>
                <div className="text-muted-foreground">{lead.email}</div>
              </td>
              <td className="px-5 py-4">{lead.company}</td>
              <td className="px-5 py-4">{lead.phone}</td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <StatusBadge status={lead.status} />
                  <Select
                    value={lead.status}
                    onChange={(event) => onStatusChange(lead, event.target.value as LeadStatus)}
                    className="h-8 w-32 text-xs"
                    aria-label={`Update status for ${lead.name}`}
                  >
                    {leadStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Select>
                </div>
              </td>
              <td className="px-5 py-4 text-muted-foreground">{formatDate(lead.createdAt)}</td>
              <td className="px-5 py-4">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/leads/${lead._id}/edit`} aria-label={`Edit ${lead.name}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => onDelete(lead)} aria-label={`Delete ${lead.name}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
