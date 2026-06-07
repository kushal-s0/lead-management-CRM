import type { ElementType } from "react";
import Link from "next/link";
import { CheckCircle2, CircleAlert, CircleDot, PhoneCall, Trophy, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { LeadStats, LeadStatus } from "@/types/lead";

const statsMeta: Array<{ key: "total" | LeadStatus; label: string; icon: ElementType; tone: string; href: string }> = [
  { key: "total", label: "Total Leads", icon: Users, tone: "bg-slate-900 text-white", href: "/leads" },
  { key: "New", label: "New Leads", icon: CircleDot, tone: "bg-sky-600 text-white", href: "/leads?status=New" },
  {
    key: "Contacted",
    label: "Contacted",
    icon: PhoneCall,
    tone: "bg-amber-500 text-white",
    href: "/leads?status=Contacted"
  },
  {
    key: "Qualified",
    label: "Qualified",
    icon: Trophy,
    tone: "bg-teal-600 text-white",
    href: "/leads?status=Qualified"
  },
  {
    key: "Converted",
    label: "Converted",
    icon: CheckCircle2,
    tone: "bg-emerald-600 text-white",
    href: "/leads?status=Converted"
  },
  { key: "Lost", label: "Lost", icon: CircleAlert, tone: "bg-rose-600 text-white", href: "/leads?status=Lost" }
];

export const StatCards = ({ stats }: { stats: LeadStats }) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
    {statsMeta.map((item) => {
      const Icon = item.icon;
      const value = item.key === "total" ? stats.total : stats.byStatus[item.key];

      return (
        <Link key={item.key} href={item.href} aria-label={`View ${item.label.toLowerCase()}`}>
          <Card className="transition-colors hover:border-ring hover:bg-muted/30">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-normal">{value}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-md ${item.tone}`}>
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </Link>
      );
    })}
  </div>
);
