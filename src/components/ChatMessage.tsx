import type { Role, RoleResponse } from "../data/mockData";
import CitationChip from "./CitationChip";

export interface UserMessage {
  kind: "user";
  text: string;
  author: string;
}

export interface AssistantMessage {
  kind: "assistant";
  response: RoleResponse;
}

export type Message = UserMessage | AssistantMessage;

function Section({
  section,
  accentSoft,
}: {
  section: RoleResponse["sections"][number];
  accentSoft: string;
}) {
  return (
    <div className="space-y-1.5">
      {section.heading && (
        <div className="text-sm font-semibold text-slate-800">
          {section.heading}
        </div>
      )}
      {section.body.map((para, i) => {
        const isCode = para.startsWith("$");
        if (isCode) {
          return (
            <pre
              key={i}
              className="overflow-x-auto rounded-lg bg-slate-900 px-3.5 py-2.5 text-[13px] leading-relaxed text-slate-100"
            >
              <code>{para}</code>
            </pre>
          );
        }
        return (
          <p
            key={i}
            className={`text-[15px] leading-relaxed text-slate-700 ${
              section.heading ? "" : accentSoft
            }`}
          >
            {para}
          </p>
        );
      })}
    </div>
  );
}

export default function ChatMessage({
  message,
  role,
  initials,
}: {
  message: Message;
  role: Role;
  initials: string;
}) {
  if (message.kind === "user") {
    return (
      <div className="flex justify-end">
        <div className="flex max-w-[80%] items-start gap-3">
          <div className="rounded-2xl rounded-tr-sm bg-slate-900 px-4 py-2.5 text-[15px] leading-relaxed text-white">
            {message.text}
          </div>
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
            {initials}
          </div>
        </div>
      </div>
    );
  }

  const { response } = message;
  return (
    <div className="flex justify-start">
      <div className="flex max-w-[88%] items-start gap-3">
        <div
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${role.accent.badge} text-xs font-bold`}
        >
          AI
        </div>
        <div className="min-w-0 flex-1">
          <div
            className={`rounded-2xl rounded-tl-sm border bg-white px-4 py-3.5 shadow-sm ${role.accent.soft}`}
          >
            <div className="mb-2 text-xs font-medium italic text-slate-400">
              {response.lens}
            </div>
            <div className="space-y-3">
              {response.sections.map((s, i) => (
                <Section key={i} section={s} accentSoft="" />
              ))}
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-400">Sources:</span>
            {response.citations.map((c, i) => (
              <CitationChip key={i} citation={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
