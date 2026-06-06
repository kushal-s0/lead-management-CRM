import type { Request, Response } from "express";
import * as leadService from "../services/leadService";
import { asyncHandler } from "../utils/asyncHandler";

export const createLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.createLead(req.body);
  res.status(201).json({ data: lead });
});

export const getLeads = asyncHandler(async (req: Request, res: Response) => {
  const result = await leadService.listLeads(req.query as never);
  res.status(200).json(result);
});

export const searchLeads = asyncHandler(async (req: Request, res: Response) => {
  const result = await leadService.listLeads(req.query as never);
  res.status(200).json(result);
});

export const getLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.getLeadById(req.params.id);
  res.status(200).json({ data: lead });
});

export const updateLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.updateLead(req.params.id, req.body);
  res.status(200).json({ data: lead });
});

export const deleteLead = asyncHandler(async (req: Request, res: Response) => {
  await leadService.deleteLead(req.params.id);
  res.status(200).json({ message: "Lead deleted successfully" });
});

export const getStats = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await leadService.getLeadStats();
  res.status(200).json({ data: stats });
});
