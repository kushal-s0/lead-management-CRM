"use client";

import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import type { Lead } from "@/types/lead";

type DeleteLeadDialogProps = {
  lead: Lead | null;
  open: boolean;
  deleting: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export const DeleteLeadDialog = ({ lead, open, deleting, onOpenChange, onConfirm }: DeleteLeadDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete lead</DialogTitle>
        <DialogDescription>
          {lead ? `This will permanently remove ${lead.name} from the pipeline.` : "This lead will be removed."}
        </DialogDescription>
      </DialogHeader>
      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <DialogClose asChild>
          <Button variant="outline" disabled={deleting}>
            Cancel
          </Button>
        </DialogClose>
        <Button variant="destructive" onClick={onConfirm} disabled={deleting}>
          {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          Delete
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
