import { EditLeadPage } from "@/components/leads/edit-lead-page";

export default async function EditLead({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditLeadPage leadId={id} />;
}
