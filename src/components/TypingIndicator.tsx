import type { Role } from "../data/mockData";

export default function TypingIndicator({ role }: { role: Role }) {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${role.accent.badge} text-xs font-bold`}
        >
          AI
        </div>
        <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-blink-1" />
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-blink-2" />
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-blink-3" />
        </div>
      </div>
    </div>
  );
}
