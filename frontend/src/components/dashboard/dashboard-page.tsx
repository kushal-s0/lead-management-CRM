"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { leadApi } from "@/lib/api";
import type { LeadStats } from "@/types/lead";
import { StatCards } from "./stat-cards";
import { StatusCharts } from "./status-charts";

const emptyStats: LeadStats = {
  total: 0,
  byStatus: { New: 0, Contacted: 0, Qualified: 0, Converted: 0, Lost: 0 }
};

export const DashboardPage = () => {
  const [stats, setStats] = useState<LeadStats>(emptyStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = async () => {
    setLoading(true);
    setError("");
    try {
      setStats(await leadApi.stats());
    } catch {
      setError("Could not load dashboard metrics.");
      toast.error("Dashboard metrics failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Monitor lead volume and pipeline health.</p>
        </div>
        <Button asChild>
          <Link href="/leads/new">
            <Plus className="h-4 w-4" />
            New Lead
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-28 animate-pulse rounded-lg border bg-card" />
          ))}
        </div>
      ) : error ? (
        <Card>
          <CardContent className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button variant="outline" onClick={loadStats}>
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <StatCards stats={stats} />
          <StatusCharts stats={stats} />
        </>
      )}
    </div>
  );
};
