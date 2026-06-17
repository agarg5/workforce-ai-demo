import { ROLE_ORDER, ROLES, type RoleKey } from "../data/mockData";

export default function RoleToggle({
  active,
  onChange,
}: {
  active: RoleKey;
  onChange: (key: RoleKey) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
      {ROLE_ORDER.map((key) => {
        const role = ROLES[key];
        const isActive = key === active;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              isActive
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {role.label}
          </button>
        );
      })}
    </div>
  );
}
