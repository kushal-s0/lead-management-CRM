import type { FilterQuery, SortOrder } from "mongoose";
import { Lead, type LeadDocument, type LeadStatus } from "../models/Lead";
import { AppError } from "../utils/AppError";

type LeadPayload = Pick<LeadDocument, "name" | "email" | "phone" | "company" | "status" | "notes">;

type ListLeadsQuery = {
  page: number;
  limit: number;
  status?: LeadStatus;
  search?: string;
  q?: string;
  sortBy: "name" | "createdAt" | "status";
  order: "asc" | "desc";
};

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const createLead = async (payload: LeadPayload) => Lead.create(payload);

export const getLeadById = async (id: string) => {
  const lead = await Lead.findById(id);
  if (!lead) {
    throw new AppError("Lead not found", 404);
  }
  return lead;
};

export const listLeads = async (query: ListLeadsQuery) => {
  const page = query.page;
  const limit = query.limit;
  const skip = (page - 1) * limit;
  const filter: FilterQuery<LeadDocument> = {};
  const searchTerm = query.search || query.q;

  if (query.status) {
    filter.status = query.status;
  }

  if (searchTerm) {
    const regex = new RegExp(escapeRegex(searchTerm), "i");
    filter.$or = [{ name: regex }, { email: regex }, { company: regex }];
  }

  const sort: Record<string, SortOrder> = {
    [query.sortBy]: query.order === "asc" ? 1 : -1
  };

  const [data, total] = await Promise.all([
    Lead.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Lead.countDocuments(filter)
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit) || 1
    }
  };
};

export const updateLead = async (id: string, payload: Partial<LeadPayload>) => {
  const lead = await Lead.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  if (!lead) {
    throw new AppError("Lead not found", 404);
  }
  return lead;
};

export const deleteLead = async (id: string) => {
  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) {
    throw new AppError("Lead not found", 404);
  }
  return lead;
};

export const getLeadStats = async () => {
  const distribution = await Lead.aggregate<{ _id: LeadStatus; count: number }>([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);

  const statusCounts = {
    New: 0,
    Contacted: 0,
    Qualified: 0,
    Converted: 0,
    Lost: 0
  };

  distribution.forEach((item) => {
    statusCounts[item._id] = item.count;
  });

  return {
    total: Object.values(statusCounts).reduce((sum, count) => sum + count, 0),
    byStatus: statusCounts
  };
};
