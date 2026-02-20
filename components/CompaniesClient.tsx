"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CompanyTable, { SortKey } from "./CompanyTable";
import Filters from "./Filters";
import Pagination from "./Pagination";
import { companies, locations, sectors, stages } from "../lib/seed";
import { loadSavedSearches, saveSavedSearches } from "../lib/storage";
import { SavedSearch } from "../lib/types";

const PAGE_SIZE = 6;

function createSearchId(name: string) {
  return `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
}

export default function CompaniesClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("");
  const [stage, setStage] = useState("");
  const [location, setLocation] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [saveName, setSaveName] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const initialQuery = searchParams.get("q") ?? "";
    const initialSector = searchParams.get("sector") ?? "";
    const initialStage = searchParams.get("stage") ?? "";
    const initialLocation = searchParams.get("location") ?? "";
    setQuery(initialQuery);
    setSector(initialSector);
    setStage(initialStage);
    setLocation(initialLocation);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return companies.filter((company) => {
      const matchesQuery =
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        company.description.toLowerCase().includes(query.toLowerCase());
      const matchesSector = sector ? company.sector === sector : true;
      const matchesStage = stage ? company.stage === stage : true;
      const matchesLocation = location ? company.location === location : true;
      return matchesQuery && matchesSector && matchesStage && matchesLocation;
    });
  }, [query, sector, stage, location]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const valueA = a[sortKey].toLowerCase();
      const valueB = b[sortKey].toLowerCase();
      if (valueA === valueB) {
        return 0;
      }
      const comparison = valueA > valueB ? 1 : -1;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filtered, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSortChange = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (next: {
    sector: string;
    stage: string;
    location: string;
  }) => {
    setSector(next.sector);
    setStage(next.stage);
    setLocation(next.location);
    setPage(1);
  };

  const handleSaveSearch = () => {
    if (!saveName.trim()) {
      setSaveMessage("Name your search first.");
      return;
    }
    const newSearch: SavedSearch = {
      id: createSearchId(saveName.trim()),
      name: saveName.trim(),
      query,
      filters: { sector, stage, location },
      createdAt: new Date().toISOString(),
    };
    const current = loadSavedSearches();
    const next = [newSearch, ...current];
    saveSavedSearches(next);
    setSaveMessage("Search saved.");
    setSaveName("");
  };

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Company discovery</h1>
        <p className="mt-2 text-sm text-slate-500">
          Search, filter, and enrich across the seeded startup universe.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            className="flex-1 rounded-2xl border border-slate-200 px-4 py-2 text-sm"
            placeholder="Search by company name or description"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <input
            className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
            placeholder="Save search as"
            value={saveName}
            onChange={(event) => setSaveName(event.target.value)}
          />
          <button
            type="button"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
            onClick={handleSaveSearch}
          >
            Save search
          </button>
        </div>
        {saveMessage ? <p className="mt-2 text-xs text-slate-400">{saveMessage}</p> : null}
      </header>

      <Filters
        sector={sector}
        stage={stage}
        location={location}
        sectors={sectors}
        stages={stages}
        locations={locations}
        onChange={handleFilterChange}
      />

      <CompanyTable
        companies={paginated}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
