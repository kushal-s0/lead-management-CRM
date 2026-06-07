import { LeadsPage } from "@/components/leads/leads-page";
import { leadStatuses, type LeadStatus } from "@/types/lead";

type LeadsSearchParams = Promise<Record<string, string | string[] | undefined>>;

const getParam = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

const getStatus = (value: string | undefined): LeadStatus | "All" => {
  if (value && leadStatuses.includes(value as LeadStatus)) {
    return value as LeadStatus;
  }

  return "All";
};

const getSortBy = (value: string | undefined) => {
  if (value === "name" || value === "status" || value === "createdAt") {
    return value;
  }

  return "createdAt";
};

const getOrder = (value: string | undefined) => (value === "asc" ? "asc" : "desc");

export default async function Leads({ searchParams }: { searchParams: LeadsSearchParams }) {
  const params = await searchParams;
  const search = getParam(params.search) || getParam(params.q) || "";
  const status = getStatus(getParam(params.status));
  const sortBy = getSortBy(getParam(params.sortBy));
  const order = getOrder(getParam(params.order));

  return (
    <LeadsPage
      key={`${search}-${status}-${sortBy}-${order}`}
      initialFilters={{
        search,
        status,
        sortBy,
        order
      }}
    />
  );
}
