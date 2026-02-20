import Link from "next/link";
import { Company } from "../lib/types";

export type SortKey = "name" | "sector" | "stage" | "location";

interface CompanyTableProps {
  companies: Company[];
  sortKey: SortKey;
  sortDirection: "asc" | "desc";
  onSortChange: (key: SortKey) => void;
}

const headers: { key: SortKey; label: string }[] = [
  { key: "name", label: "Company" },
  { key: "sector", label: "Sector" },
  { key: "stage", label: "Stage" },
  { key: "location", label: "Location" },
];

export default function CompanyTable({
  companies,
  sortKey,
  sortDirection,
  onSortChange,
}: CompanyTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            {headers.map((header) => (
              <th key={header.key} className="px-6 py-4">
                <button
                  type="button"
                  className="flex items-center gap-2 font-semibold"
                  onClick={() => onSortChange(header.key)}
                >
                  {header.label}
                  {sortKey === header.key ? (
                    <span className="text-slate-400">
                      {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                  ) : null}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id} className="border-t border-slate-100">
              <td className="px-6 py-4">
                <Link
                  href={`/companies/${company.id}`}
                  className="text-base font-semibold text-slate-900 hover:text-slate-600"
                >
                  {company.name}
                </Link>
                <p className="text-xs text-slate-500">{company.description}</p>
              </td>
              <td className="px-6 py-4 text-slate-600">{company.sector}</td>
              <td className="px-6 py-4 text-slate-600">{company.stage}</td>
              <td className="px-6 py-4 text-slate-600">{company.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {companies.length === 0 ? (
        <div className="border-t border-slate-100 px-6 py-6 text-sm text-slate-500">
          No companies match the current filters.
        </div>
      ) : null}
    </div>
  );
}
