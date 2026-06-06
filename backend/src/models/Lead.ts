import { Schema, model, type InferSchemaType } from "mongoose";

export const leadStatuses = ["New", "Contacted", "Qualified", "Converted", "Lost"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

const leadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true, index: true },
    status: { type: String, enum: leadStatuses, required: true, default: "New", index: true },
    notes: { type: String, trim: true, default: "" }
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    versionKey: false
  }
);

leadSchema.index({ name: "text", email: "text", company: "text" });

export type LeadDocument = InferSchemaType<typeof leadSchema> & { _id: string };
export const Lead = model("Lead", leadSchema);
