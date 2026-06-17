import { PRODUCT_NAME } from "../constants";
import type { Role } from "../data/mockData";
import DocumentList from "./DocumentList";
import RoleBadge from "./RoleBadge";

export default function Sidebar({
  company,
  userName,
  role,
  initials,
  onSignOut,
}: {
  company: string;
  userName: string;
  role: Role;
  initials: string;
  onSignOut: () => void;
}) {
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col bg-slate-900 text-slate-200">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-sky-500 text-sm font-black text-white">
          {PRODUCT_NAME.charAt(0)}
        </div>
        <span className="text-lg font-bold tracking-tight text-white">
          {PRODUCT_NAME}
        </span>
      </div>

      {/* Company + user card */}
      <div className="mx-3 rounded-xl bg-white/5 p-3.5">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Workspace
        </div>
        <div className="mt-1 text-sm font-semibold text-white">{company}</div>

        <div className="mt-3 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-white">
              {userName}
            </div>
            <div className="truncate text-xs text-slate-400">{role.label}</div>
          </div>
        </div>

        <div className="mt-3">
          <RoleBadge role={role} size="sm" />
          <div className="mt-1.5 text-xs text-slate-500">{role.focus}</div>
        </div>
      </div>

      {/* Documents */}
      <div className="mt-5 flex-1 overflow-y-auto">
        <DocumentList />
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={onSignOut}
          className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z"
              clipRule="evenodd"
            />
          </svg>
          Sign out
        </button>
      </div>
    </aside>
  );
}
