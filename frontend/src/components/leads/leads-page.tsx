"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { leadApi } from "@/lib/api";
import type { Lead, Pagination as PaginationType, LeadStatus } from "@/types/lead";
import { DeleteLeadDialog } from "./delete-lead-dialog";
import { LeadFilters, type LeadFiltersState } from "./lead-filters";
import { LeadTable } from "./lead-table";
import { Pagination } from "./pagination";

const defaultFilters: LeadFiltersState = {
  search: "",
  status: "All",
  sortBy: "createdAt",
  order: "desc"
};

const defaultPagination: PaginationType = {
  page: 1,
  limit: 10,
  total: 0,
  pages: 1
};

export const LeadsPage = ({ initialFilters = defaultFilters }: { initialFilters?: LeadFiltersState }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filters, setFilters] = useState({ ...defaultFilters, ...initialFilters });
  const [pagination, setPagination] = useState(defaultPagination);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null);
  const [deleting, setDeleting] = useState(false);

  const query = useMemo(
    () => ({ ...filters, page: pagination.page, limit: pagination.limit }),
    [filters, pagination.page, pagination.limit]
  );

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await leadApi.list(query);
      setLeads(result.data);
      setPagination(result.pagination);
    } catch {
      setError("Could not load leads.");
      toast.error("Leads failed to load");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadLeads();
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [loadLeads]);

  const updateFilters = (nextFilters: LeadFiltersState) => {
    setFilters(nextFilters);
    setPagination((current) => ({ ...current, page: 1 }));
  };

  const handleStatusChange = async (lead: Lead, status: LeadStatus) => {
    if (lead.status === status) {
      return;
    }
    const previous = leads;
    setLeads((current) => current.map((item) => (item._id === lead._id ? { ...item, status } : item)));
    try {
      await leadApi.update(lead._id, { status });
      toast.success("Lead status updated");
    } catch {
      setLeads(previous);
      toast.error("Could not update status");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }
    setDeleting(true);
    try {
      await leadApi.remove(deleteTarget._id);
      toast.success("Lead deleted");
      setDeleteTarget(null);
      await loadLeads();
    } catch {
      toast.error("Could not delete lead");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Leads</h1>
          <p className="mt-1 text-sm text-muted-foreground">Search, sort, filter, and update your active pipeline.</p>
        </div>
        <Button asChild>
          <Link href="/leads/new">
            <Plus className="h-4 w-4" />
            New Lead
          </Link>
        </Button>
      </div>

      <Card className="p-4">
        <LeadFilters filters={filters} onChange={updateFilters} />
      </Card>

      <Card className="overflow-hidden">
        {error ? (
          <div className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button variant="outline" onClick={loadLeads}>
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        ) : (
          <>
            <LeadTable leads={leads} loading={loading} onDelete={setDeleteTarget} onStatusChange={handleStatusChange} />
            <Pagination
              pagination={pagination}
              onPageChange={(page) => setPagination((current) => ({ ...current, page }))}
            />
          </>
        )}
      </Card>

      <DeleteLeadDialog
        lead={deleteTarget}
        open={Boolean(deleteTarget)}
        deleting={deleting}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};
