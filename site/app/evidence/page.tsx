import { EvidenceDashboardView } from "@/components/evidence-dashboard-view";
import { getEvidenceDashboard } from "@/lib/evidence/dashboard";

export default async function EvidencePage() {
  return <EvidenceDashboardView dashboard={await getEvidenceDashboard()} />;
}
