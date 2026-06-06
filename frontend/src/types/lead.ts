export const leadStatuses = ["New", "Contacted", "Qualified", "Converted", "Lost"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export type Lead = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  updatedAt?: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

export type LeadsResponse = {
  data: Lead[];
  pagination: Pagination;
};

export type LeadStats = {
  total: number;
  byStatus: Record<LeadStatus, number>;
};
