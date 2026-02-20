"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadSavedSearches, saveSavedSearches } from "../lib/storage";
import { SavedSearch } from "../lib/types";

export default function SavedSearchManager() {
  const [searches, setSearches] = useState<SavedSearch[]>([]);

  useEffect(() => {
    setSearches(loadSavedSearches());
  }, []);

  const handleDelete = (id: string) => {
    const next = searches.filter((search) => search.id !== id);
    setSearches(next);
    saveSavedSearches(next);
  };

  const buildHref = (search: SavedSearch) => {
    const params = new URLSearchParams();
    if (search.query) params.set("q", search.query);
    if (search.filters.sector) params.set("sector", search.filters.sector);
    if (search.filters.stage) params.set("stage", search.filters.stage);
    if (search.filters.location) params.set("location", search.filters.location);
    return `/companies?${params.toString()}`;
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-slate-900">Saved searches</h2>
      <p className="mt-2 text-sm text-slate-500">
        Re-run saved filters and notes from prior diligence work.
      </p>
      <div className="mt-6 space-y-4">
        {searches.length === 0 ? (
          <p className="text-sm text-slate-500">No saved searches yet.</p>
        ) : (
          searches.map((search) => (
            <div
              key={search.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  {search.name}
                </p>
                <p className="text-xs text-slate-400">
                  Query: {search.query || "(none)"} · Sector: {search.filters.sector || "All"}
                </p>
                <p className="text-xs text-slate-400">
                  Stage: {search.filters.stage || "All"} · Location: {search.filters.location || "All"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={buildHref(search)}
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Re-run
                </Link>
                <button
                  type="button"
                  className="rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-500"
                  onClick={() => handleDelete(search.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
