import SavedSearchManager from "../../components/SavedSearchManager";

export default function SavedPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Saved searches</h1>
        <p className="mt-2 text-sm text-slate-500">
          Access your stored queries and filters.
        </p>
      </header>
      <SavedSearchManager />
    </div>
  );
}
