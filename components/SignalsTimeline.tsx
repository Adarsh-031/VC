"use client";

import { useEffect, useMemo, useState } from "react";
import { EnrichmentResult } from "../lib/types";
import { loadEnrichmentCache } from "../lib/storage";

interface SignalsTimelineProps {
  companyId: string;
}

const baselineSignals = [
  {
    title: "Initial sourcing entry",
    detail: "Added to the seed dataset for evaluation.",
  },
  {
    title: "Profile viewed",
    detail: "Team opened this company profile for review.",
  },
];

export default function SignalsTimeline({ companyId }: SignalsTimelineProps) {
  const [enrichment, setEnrichment] = useState<EnrichmentResult | null>(null);

  useEffect(() => {
    const cache = loadEnrichmentCache<EnrichmentResult>();
    setEnrichment(cache[companyId] ?? null);
  }, [companyId]);

  const items = useMemo(() => {
    const derived = enrichment?.derivedSignals ?? [];
    const derivedItems = derived.map((signal, index) => ({
      title: signal,
      detail: `Derived from enrichment signal ${index + 1}.`,
    }));
    return [...baselineSignals, ...derivedItems];
  }, [enrichment]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-slate-900">Signals timeline</h3>
      <p className="mt-2 text-sm text-slate-500">
        Track notable signals and enrichment insights over time.
      </p>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">{item.title}</p>
            <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
          </div>
        ))}
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">No signals yet.</p>
        ) : null}
      </div>
    </section>
  );
}
