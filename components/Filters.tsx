interface FiltersProps {
  sector: string;
  stage: string;
  location: string;
  sectors: string[];
  stages: string[];
  locations: string[];
  onChange: (next: { sector: string; stage: string; location: string }) => void;
}

export default function Filters({
  sector,
  stage,
  location,
  sectors,
  stages,
  locations,
  onChange,
}: FiltersProps) {
  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-3">
      <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Sector
        <select
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
          value={sector}
          onChange={(event) =>
            onChange({ sector: event.target.value, stage, location })
          }
        >
          <option value="">All sectors</option>
          {sectors.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Stage
        <select
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
          value={stage}
          onChange={(event) =>
            onChange({ sector, stage: event.target.value, location })
          }
        >
          <option value="">All stages</option>
          {stages.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Location
        <select
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
          value={location}
          onChange={(event) =>
            onChange({ sector, stage, location: event.target.value })
          }
        >
          <option value="">All locations</option>
          {locations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
