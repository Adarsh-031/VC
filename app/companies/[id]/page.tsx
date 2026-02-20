import { notFound } from "next/navigation";
import CompanyOverview from "../../../components/CompanyOverview";
import EnrichmentPanel from "../../../components/EnrichmentPanel";
import NotesSection from "../../../components/NotesSection";
import SaveToListButton from "../../../components/SaveToListButton";
import SignalsTimeline from "../../../components/SignalsTimeline";
import { companies } from "../../../lib/seed";

interface CompanyPageProps {
  params: Promise<{ id: string }>;
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { id } = await params;
  const company = companies.find((item) => item.id === id);
  if (!company) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <CompanyOverview company={company} />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <EnrichmentPanel companyId={company.id} website={company.website} />
          <SignalsTimeline companyId={company.id} />
        </div>
        <div className="space-y-6">
          <SaveToListButton companyId={company.id} />
          <NotesSection companyId={company.id} />
        </div>
      </div>
    </div>
  );
}
