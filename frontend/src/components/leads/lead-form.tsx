"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { leadApi } from "@/lib/api";
import { leadFormSchema, type LeadFormValues } from "@/lib/validators";
import { leadStatuses, type Lead } from "@/types/lead";

type LeadFormProps = {
  mode: "create" | "edit";
  lead?: Lead;
};

const fieldClass = "space-y-2";
const labelClass = "text-sm font-medium";
const errorClass = "text-xs text-destructive";

export const LeadForm = ({ mode, lead }: LeadFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: lead?.name ?? "",
      email: lead?.email ?? "",
      phone: lead?.phone ?? "",
      company: lead?.company ?? "",
      status: lead?.status ?? "New",
      notes: lead?.notes ?? ""
    }
  });

  const onSubmit = async (values: LeadFormValues) => {
    try {
      if (mode === "create") {
        await leadApi.create(values);
        toast.success("Lead created");
      } else if (lead) {
        await leadApi.update(lead._id, values);
        toast.success("Lead updated");
      }
      router.push("/leads");
      router.refresh();
    } catch {
      toast.error(mode === "create" ? "Could not create lead" : "Could not update lead");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" asChild>
          <Link href="/leads" aria-label="Back to leads">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">{mode === "create" ? "Create Lead" : "Edit Lead"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "create" ? "Add a new prospect to the pipeline." : "Update contact and pipeline details."}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Details</CardTitle>
          <CardDescription>Keep contact data accurate so follow-ups stay simple.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-5 md:grid-cols-2">
              <div className={fieldClass}>
                <label className={labelClass} htmlFor="name">
                  Name
                </label>
                <Input id="name" placeholder="Jane Cooper" {...register("name")} />
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
              </div>
              <div className={fieldClass}>
                <label className={labelClass} htmlFor="email">
                  Email
                </label>
                <Input id="email" type="email" placeholder="jane@company.com" {...register("email")} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>
              <div className={fieldClass}>
                <label className={labelClass} htmlFor="phone">
                  Phone Number
                </label>
                <Input id="phone" placeholder="+1 555 012 4570" {...register("phone")} />
                {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
              </div>
              <div className={fieldClass}>
                <label className={labelClass} htmlFor="company">
                  Company
                </label>
                <Input id="company" placeholder="Acme Inc." {...register("company")} />
                {errors.company && <p className={errorClass}>{errors.company.message}</p>}
              </div>
              <div className={fieldClass}>
                <label className={labelClass} htmlFor="status">
                  Lead Status
                </label>
                <Select id="status" {...register("status")}>
                  {leadStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Select>
                {errors.status && <p className={errorClass}>{errors.status.message}</p>}
              </div>
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="notes">
                Notes
              </label>
              <Textarea id="notes" placeholder="Context, requirements, last conversation..." {...register("notes")} />
              {errors.notes && <p className={errorClass}>{errors.notes.message}</p>}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" asChild>
                <Link href="/leads">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {mode === "create" ? "Create Lead" : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
