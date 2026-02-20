"use client";

import { useState } from "react";
import { EnrichmentResult } from "../lib/types";
import { scoreEnrichment } from "../lib/scoring";
import { loadEnrichmentCache, saveEnrichmentCache } from "../lib/storage";

interface EnrichmentPanelProps {
  companyId: string;
  website: string;
}

export default function EnrichmentPanel({ companyId, website }: EnrichmentPanelProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EnrichmentResult | null>(null);

  const handleEnrich = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId, website }),
      });
      if (!response.ok) {
        throw new Error("Enrichment failed. Check server logs.");
      }
      const data = (await response.json()) as EnrichmentResult;
      setResult(data);
      const cache = loadEnrichmentCache<EnrichmentResult>();
      cache[companyId] = data;
      saveEnrichmentCache(cache);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const score = scoreEnrichment(result);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Live enrichment</h3>
        <button
          type="button"
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
          onClick={handleEnrich}
          disabled={loading}
        >
          {loading ? "Enriching..." : "Run enrichment"}
        </button>
      </div>
      <p className="mt-2 text-sm text-slate-500">
        Server-side fetch with structured extraction. Cached per company.
      </p>
      {error ? <p className="mt-4 text-sm text-rose-500">{error}</p> : null}

      <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-wide text-slate-400">Thesis score</p>
        <p className="mt-2 text-3xl font-semibold text-slate-900">{score.score}</p>
        <ul className="mt-3 space-y-1 text-xs text-slate-500">
          {score.explanations.map((explanation) => (
            <li key={explanation}>{explanation}</li>
          ))}
        </ul>
      </div>

      {result ? (
        <div className="mt-6 space-y-4 text-sm text-slate-600">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Summary</p>
            <p className="mt-2 text-sm text-slate-700">{result.summary}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">What they do</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {result.whatTheyDo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Keywords</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {result.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Derived signals</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {result.derivedSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Sources</p>
            <ul className="mt-2 space-y-1 text-xs text-slate-500">
              {result.sources.map((source) => (
                <li key={source.url}>
                  {source.url} · {new Date(source.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-sm text-slate-500">
          Run enrichment to populate summary, keywords, and signals.
        </p>
      )}
    </section>
  );
}
