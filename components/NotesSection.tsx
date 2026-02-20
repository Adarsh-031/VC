"use client";

import { useEffect, useState } from "react";
import { loadNotes, saveNotes } from "../lib/storage";

interface NotesSectionProps {
  companyId: string;
}

export default function NotesSection({ companyId }: NotesSectionProps) {
  const [note, setNote] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    const notes = loadNotes();
    setNote(notes[companyId] ?? "");
  }, [companyId]);

  const handleSave = () => {
    const notes = loadNotes();
    const nextNotes = { ...notes, [companyId]: note };
    saveNotes(nextNotes);
    setSavedAt(new Date().toLocaleString());
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Notes</h3>
        {savedAt ? (
          <span className="text-xs text-slate-400">Saved {savedAt}</span>
        ) : null}
      </div>
      <textarea
        className="mt-4 min-h-[160px] w-full rounded-2xl border border-slate-200 p-4 text-sm text-slate-700"
        placeholder="Capture diligence notes, calls, and next steps..."
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
      <button
        type="button"
        className="mt-4 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
        onClick={handleSave}
      >
        Save notes
      </button>
    </section>
  );
}
