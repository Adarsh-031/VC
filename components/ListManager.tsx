"use client";

import { useEffect, useMemo, useState } from "react";
import { companies } from "../lib/seed";
import { loadLists, saveLists } from "../lib/storage";
import { SavedList } from "../lib/types";

function createId(name: string) {
  return `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
}

export default function ListManager() {
  const [lists, setLists] = useState<SavedList[]>([]);
  const [name, setName] = useState("");
  const [selectedListId, setSelectedListId] = useState<string>("");
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");

  useEffect(() => {
    setLists(loadLists());
  }, []);

  const activeList = useMemo(
    () => lists.find((list) => list.id === selectedListId) ?? null,
    [lists, selectedListId]
  );

  const handleCreate = () => {
    if (!name.trim()) {
      return;
    }
    const newList: SavedList = {
      id: createId(name.trim()),
      name: name.trim(),
      companyIds: [],
      createdAt: new Date().toISOString(),
    };
    const nextLists = [...lists, newList];
    setLists(nextLists);
    saveLists(nextLists);
    setName("");
    setSelectedListId(newList.id);
  };

  const handleAddCompany = () => {
    if (!activeList || !selectedCompanyId) {
      return;
    }
    const nextLists = lists.map((list) =>
      list.id === activeList.id
        ? {
            ...list,
            companyIds: Array.from(new Set([...list.companyIds, selectedCompanyId])),
          }
        : list
    );
    setLists(nextLists);
    saveLists(nextLists);
  };

  const handleRemoveCompany = (companyId: string) => {
    if (!activeList) {
      return;
    }
    const nextLists = lists.map((list) =>
      list.id === activeList.id
        ? {
            ...list,
            companyIds: list.companyIds.filter((id) => id !== companyId),
          }
        : list
    );
    setLists(nextLists);
    saveLists(nextLists);
  };

  const handleDeleteList = (listId: string) => {
    const nextLists = lists.filter((list) => list.id !== listId);
    setLists(nextLists);
    saveLists(nextLists);
    if (selectedListId === listId) {
      setSelectedListId("");
    }
  };

  const exportList = (list: SavedList, format: "json" | "csv") => {
    const rows = list.companyIds
      .map((id) => companies.find((company) => company.id === id))
      .filter(Boolean);
    if (format === "json") {
      const blob = new Blob([JSON.stringify(rows, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${list.name.replace(/\s+/g, "-")}.json`;
      link.click();
      URL.revokeObjectURL(url);
      return;
    }

    const header = "name,sector,stage,location,website\n";
    const body = rows
      .map((company) =>
        [
          company?.name,
          company?.sector,
          company?.stage,
          company?.location,
          company?.website,
        ]
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${list.name.replace(/\s+/g, "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Create a list</h2>
        <p className="mt-2 text-sm text-slate-500">
          Organize targets by thesis, partner, or theme.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            className="flex-1 rounded-2xl border border-slate-200 px-4 py-2 text-sm"
            placeholder="List name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button
            type="button"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
            onClick={handleCreate}
          >
            Create list
          </button>
        </div>
        <div className="mt-6">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Active list
          </label>
          <select
            className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
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
          {activeList ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
                onClick={() => exportList(activeList, "csv")}
              >
                Export CSV
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
                onClick={() => exportList(activeList, "json")}
              >
                Export JSON
              </button>
              <button
                type="button"
                className="rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-500"
                onClick={() => handleDeleteList(activeList.id)}
              >
                Delete list
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Add companies</h2>
        <p className="mt-2 text-sm text-slate-500">
          Curate a list from the master dataset.
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <select
            className="rounded-2xl border border-slate-200 px-3 py-2 text-sm"
            value={selectedCompanyId}
            onChange={(event) => setSelectedCompanyId(event.target.value)}
          >
            <option value="">Select company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
            onClick={handleAddCompany}
            disabled={!activeList}
          >
            Add to active list
          </button>
        </div>
        {activeList ? (
          <div className="mt-6 space-y-3">
            {activeList.companyIds.length === 0 ? (
              <p className="text-sm text-slate-500">No companies yet.</p>
            ) : (
              activeList.companyIds.map((id) => {
                const company = companies.find((item) => item.id === id);
                if (!company) {
                  return null;
                }
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {company.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {company.sector} · {company.stage}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-xs font-semibold text-rose-500"
                      onClick={() => handleRemoveCompany(id)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <p className="mt-6 text-sm text-slate-500">
            Select a list to view its companies.
          </p>
        )}
      </section>
    </div>
  );
}
