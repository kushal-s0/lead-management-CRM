"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { leadApi } from "@/lib/api";
import type { Lead } from "@/types/lead";
import { LeadForm } from "./lead-form";

export const EditLeadPage = ({ leadId }: { leadId: string }) => {
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLead = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setLead(await leadApi.get(leadId));
    } catch {
      setError("Could not load this lead.");
      toast.error("Lead failed to load");
    } finally {
      setLoading(false);
    }
  }, [leadId]);

  useEffect(() => {
    void loadLead();
  }, [loadLead]);

  if (loading) {
    return <div className="mx-auto h-[520px] max-w-3xl animate-pulse rounded-lg border bg-card" />;
  }

  if (error || !lead) {
    return (
      <Card className="mx-auto max-w-3xl">
        <CardContent className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">{error || "Lead not found."}</p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadLead}>
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
            <Button asChild>
              <Link href="/leads">Back to Leads</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <LeadForm mode="edit" lead={lead} />;
};
