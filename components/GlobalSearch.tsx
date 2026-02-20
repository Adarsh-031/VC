"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) {
      params.set("q", query.trim());
    }
    router.push(`/companies?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600"
        placeholder="Global search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button
        type="submit"
        className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
      >
        Go
      </button>
    </form>
  );
}
