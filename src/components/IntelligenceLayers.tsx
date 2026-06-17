import type { Role } from "../data/mockData";

// The three-layer "moat" framing surfaced under each answer:
// Universal knowledge × Role intelligence × Company intelligence.
export default function IntelligenceLayers({
  role,
  docCount,
}: {
  role: Role;
  docCount: number;
}) {
  const layers = [
    { tag: "U", label: "Universal knowledge", cls: "bg-slate-100 text-slate-600" },
    {
      tag: "R",
      label: `Role intelligence · ${role.label}`,
      cls: role.accent.badge,
    },
    {
      tag: "C",
      label: `Company intelligence · ${docCount} docs`,
      cls: "bg-emerald-100 text-emerald-700",
    },
  ];
  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5">
      <span className="text-[11px] font-medium text-slate-400">
        Why this answer:
      </span>
      {layers.map((l, i) => (
        <span key={i} className="flex items-center">
          {i > 0 && <span className="mr-1.5 text-slate-300">×</span>}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${l.cls}`}
          >
            <span className="font-bold">{l.tag}</span>
            {l.label}
          </span>
        </span>
      ))}
    </div>
  );
}
