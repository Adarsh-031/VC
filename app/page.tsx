import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          VC Intelligence Interface
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">
          Source, enrich, and score venture opportunities in one console.
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-500">
          This MVP delivers a focused startup discovery workflow: curated dataset, live website enrichment,
          saved searches, and thesis scoring. Every enrichment runs server-side and caches results to keep
          diligence secure and fast.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/companies"
          >
            <button className="rounded-full border bg-slate-900 px-6 py-2 text-sm font-semibold text-white">
              Explore companies
            </button>

          </Link>
          <Link
            href="/lists"
          >
            <button className="rounded-full border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-900">
              Build lists
            </button>
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Live enrichment",
            body: "Fetch site content server-side, extract structured intelligence, and cache by company.",
          },
          {
            title: "Thesis scoring",
            body: "Score companies against a keyword thesis with explainable matches.",
          },
          {
            title: "Persistent workflows",
            body: "Lists, notes, and saved searches persist locally for ongoing diligence.",
          },
        ].map((card) => (
          <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{card.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
