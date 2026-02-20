import ListManager from "../../components/ListManager";

export default function ListsPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Lists</h1>
        <p className="mt-2 text-sm text-slate-500">
          Create and manage curated company lists. Export to CSV or JSON.
        </p>
      </header>
      <ListManager />
    </div>
  );
}
