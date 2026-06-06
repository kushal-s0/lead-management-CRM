import { Router } from "express";
import {
  createLead,
  deleteLead,
  getLead,
  getLeads,
  getStats,
  searchLeads,
  updateLead
} from "../controllers/leadController";
import { validateRequest } from "../middleware/validateRequest";
import {
  createLeadSchema,
  leadIdSchema,
  leadQuerySchema,
  updateLeadSchema
} from "../validators/leadValidator";

const router = Router();

router.get("/stats", getStats);
router.post("/", validateRequest(createLeadSchema), createLead);
router.get("/", validateRequest(leadQuerySchema), getLeads);
router.get("/search", validateRequest(leadQuerySchema), searchLeads);
router.get("/:id", validateRequest(leadIdSchema), getLead);
router.put("/:id", validateRequest(updateLeadSchema), updateLead);
router.delete("/:id", validateRequest(leadIdSchema), deleteLead);

export default router;
