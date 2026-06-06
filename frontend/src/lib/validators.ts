import { z } from "zod";
import { leadStatuses } from "@/types/lead";

export const leadFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .refine((value) => value.replace(/\D/g, "").length >= 10, "Phone must have at least 10 digits"),
  company: z.string().trim().min(1, "Company is required"),
  status: z.enum(leadStatuses, { required_error: "Status is required" }),
  notes: z.string().trim().optional().default("")
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
