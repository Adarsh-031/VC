import Link from "next/link";
import GlobalSearch from "./GlobalSearch";

const navItems = [
  { label: "Overview", href: "/" },
  { label: "Companies", href: "/companies" },
  { label: "Lists", href: "/lists" },
  { label: "Saved Searches", href: "/saved" },
];

export default function Sidebar() {
  return (
    <aside className="flex h-full flex-col gap-8 border-r border-slate-200 bg-white/70 p-6 backdrop-blur">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          VC Intelligence
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">
          Pipeline Console
        </h1>
      </div>
      <nav className="flex flex-col gap-3 text-sm font-medium text-slate-600">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:border-slate-300 hover:text-slate-900"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <GlobalSearch />
      </div>
      <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-semibold text-slate-700">Live Enrichment</p>
        <p className="mt-2">Server-side fetch + optional LLM extraction.</p>
      </div>
    </aside>
  );
}
