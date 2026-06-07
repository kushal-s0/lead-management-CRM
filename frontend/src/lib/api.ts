import axios from "axios";
import type { Lead, LeadStats, LeadsResponse, LeadStatus } from "@/types/lead";
import type { LeadFormValues } from "./validators";

const normalizeApiBaseUrl = (url?: string) => {
  const fallback = "http://localhost:5000/api";

  if (!url || !url.trim()) {
    return fallback;
  }

  const normalized = url.trim().replace(/\/+$/, "");
  return normalized.endsWith("/api") ? normalized : `${normalized}/api`;
};

const api = axios.create({
  baseURL: normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_URL),
  timeout: 15000
});

type LeadQuery = {
  page?: number;
  limit?: number;
  search?: string;
  status?: LeadStatus | "All";
  sortBy?: "name" | "createdAt" | "status";
  order?: "asc" | "desc";
};

const cleanParams = (params: LeadQuery) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== "" && value !== "All")
  );

export const leadApi = {
  async list(params: LeadQuery) {
    const { data } = await api.get<LeadsResponse>("/leads", { params: cleanParams(params) });
    return data;
  },
  async get(id: string) {
    const { data } = await api.get<{ data: Lead }>(`/leads/${id}`);
    return data.data;
  },
  async create(payload: LeadFormValues) {
    const { data } = await api.post<{ data: Lead }>("/leads", payload);
    return data.data;
  },
  async update(id: string, payload: Partial<LeadFormValues>) {
    const { data } = await api.put<{ data: Lead }>(`/leads/${id}`, payload);
    return data.data;
  },
  async remove(id: string) {
    const { data } = await api.delete<{ message: string }>(`/leads/${id}`);
    return data;
  },
  async stats() {
    const { data } = await api.get<{ data: LeadStats }>("/leads/stats");
    return data.data;
  }
};
