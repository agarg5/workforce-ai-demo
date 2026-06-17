import { useMemo, useRef, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import RoleBadge from "../components/RoleBadge";
import RoleToggle from "../components/RoleToggle";
import ChatMessage, { type Message } from "../components/ChatMessage";
import {
  DEMO_TOPICS,
  ROLES,
  genericReply,
  type RoleKey,
} from "../data/mockData";

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "U").concat(parts[1]?.[0] ?? "").toUpperCase();
}

const SUGGESTIONS = [
  ...DEMO_TOPICS.map((t) => t.question),
  "What's in the onboarding checklist?",
];

export default function Chat({
  company,
  initialRole,
  onSignOut,
}: {
  company: string;
  initialRole: RoleKey;
  onSignOut: () => void;
}) {
  const [role, setRole] = useState<RoleKey>(initialRole);
  // Messages the user adds after the pre-populated demo. Each remembers the
  // role it was sent under so it doesn't change when the role toggles.
  const [thread, setThread] = useState<
    { message: Message; roleKey: RoleKey }[]
  >([]);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeRole = ROLES[role];
  const userName = activeRole.sampleUser;
  const initials = initialsOf(userName);

  // The pre-populated, role-aware demo exchanges (always reflect current role).
  const demoExchange: Message[] = useMemo(
    () =>
      DEMO_TOPICS.flatMap((topic): Message[] => [
        { kind: "user", text: topic.question, author: userName },
        { kind: "assistant", response: topic.responses[role] },
      ]),
    [role, userName]
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [thread, role]);

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    const topic = DEMO_TOPICS.find((t) => t.match.test(q));
    const response = topic ? topic.responses[role] : genericReply(activeRole);
    setThread((prev) => [
      ...prev,
      { roleKey: role, message: { kind: "user", text: q, author: userName } },
      { roleKey: role, message: { kind: "assistant", response } },
    ]);
    setDraft("");
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-100">
      <Sidebar
        company={company}
        userName={userName}
        role={activeRole}
        initials={initials}
        onSignOut={onSignOut}
      />

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${activeRole.accent.badge} text-sm font-black`}
            >
              AI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold text-slate-900">
                  {activeRole.persona}
                </h1>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online
                </span>
              </div>
              <p className="text-xs text-slate-500">{activeRole.focus}</p>
            </div>
          </div>
          <RoleBadge role={activeRole} />
        </header>

        {/* Demo toggle banner */}
        <div className="border-b border-slate-200 bg-white/70 px-6 py-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="rounded bg-slate-900 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Demo
            </span>
            Switch roles and watch the same question get a different answer:
          </div>
          <RoleToggle active={role} onChange={setRole} />
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {demoExchange.map((m, i) => (
              <ChatMessage
                key={`demo-${i}`}
                message={m}
                role={activeRole}
                initials={initials}
              />
            ))}
            {thread.map((item, i) => (
              <ChatMessage
                key={`t-${i}`}
                message={item.message}
                role={ROLES[item.roleKey]}
                initials={initialsOf(ROLES[item.roleKey].sampleUser)}
              />
            ))}
          </div>
        </div>

        {/* Composer */}
        <div className="border-t border-slate-200 bg-white px-6 py-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-white"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-400/40"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`Ask the ${activeRole.persona} anything…`}
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white transition hover:bg-slate-800 disabled:opacity-40"
                disabled={!draft.trim()}
                aria-label="Send"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M3.105 2.289a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25H10a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.085l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.113A28.897 28.897 0 0 0 3.105 2.289Z" />
                </svg>
              </button>
            </form>
            <p className="mt-2 text-center text-xs text-slate-400">
              Prototype with mock data — responses are illustrative.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
