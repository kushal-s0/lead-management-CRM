import { z } from "zod";
import { leadStatuses } from "../models/Lead";

const hasAtLeastTenDigits = (value: string) => value.replace(/\D/g, "").length >= 10;

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().email("A valid email is required"),
    phone: z.string().trim().refine(hasAtLeastTenDigits, "Phone number must contain at least 10 digits"),
    company: z.string().trim().min(1, "Company is required"),
    status: z.enum(leadStatuses),
    notes: z.string().trim().optional().default("")
  })
});

export const updateLeadSchema = z.object({
  body: createLeadSchema.shape.body.partial().refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required"
  }),
  params: z.object({
    id: z.string().min(1, "Lead id is required")
  })
});

export const leadIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Lead id is required")
  })
});

export const leadQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(10),
    status: z.enum(leadStatuses).optional(),
    search: z.string().trim().optional(),
    q: z.string().trim().optional(),
    sortBy: z.enum(["name", "createdAt", "status"]).optional().default("createdAt"),
    order: z.enum(["asc", "desc"]).optional().default("desc")
  })
});
