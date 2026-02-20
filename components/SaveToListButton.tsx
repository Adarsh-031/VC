"use client";

import { useEffect, useState } from "react";
import { loadLists, saveLists } from "../lib/storage";
import { SavedList } from "../lib/types";

interface SaveToListButtonProps {
  companyId: string;
}

export default function SaveToListButton({ companyId }: SaveToListButtonProps) {
  const [lists, setLists] = useState<SavedList[]>([]);
  const [selectedListId, setSelectedListId] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setLists(loadLists());
  }, []);

  const handleSave = () => {
    if (!selectedListId) {
      setMessage("Select a list first.");
      return;
    }
    const nextLists = lists.map((list) =>
      list.id === selectedListId
        ? {
            ...list,
            companyIds: Array.from(new Set([...list.companyIds, companyId])),
          }
        : list
    );
    saveLists(nextLists);
    setLists(nextLists);
    setMessage("Added to list.");
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-slate-900">Save to list</h3>
      <p className="mt-2 text-sm text-slate-500">
        Add this company to a curated list for follow-up.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        <select
          className="rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
          value={selectedListId}
          onChange={(event) => setSelectedListId(event.target.value)}
        >
          <option value="">Select list</option>
          {lists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
          onClick={handleSave}
        >
          Add to list
        </button>
        {message ? <p className="text-xs text-slate-500">{message}</p> : null}
      </div>
    </section>
  );
}
