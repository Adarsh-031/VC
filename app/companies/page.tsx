import { Suspense } from "react";
import CompaniesClient from "../../components/CompaniesClient";

export default function CompaniesPage() {
  return (
    <Suspense fallback={<div className="text-sm text-slate-500">Loading companies...</div>}>
      <CompaniesClient />
    </Suspense>
  );
}
