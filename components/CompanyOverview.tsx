import { Company } from "../lib/types";

interface CompanyOverviewProps {
  company: Company;
}

export default function CompanyOverview({ company }: CompanyOverviewProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Company Snapshot
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            {company.name}
          </h2>
          <p className="mt-2 text-sm text-slate-500">{company.description}</p>
        </div>
        <a
          href={company.website}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-300"
          target="_blank"
          rel="noreferrer"
        >
          Visit website
        </a>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Sector</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">{company.sector}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Stage</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">{company.stage}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Location</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">{company.location}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {company.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
