import { COMPANY_DOCS } from "../data/mockData";

export default function DocumentList({
  onOpenDoc,
  onUpload,
}: {
  onOpenDoc: (name: string) => void;
  onUpload: () => void;
}) {
  return (
    <div className="px-3">
      <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Company Knowledge
      </div>
      <ul className="space-y-1">
        {COMPANY_DOCS.map((doc) => (
          <li key={doc.name}>
            <button
              onClick={() => onOpenDoc(doc.name)}
              className="group flex w-full items-start gap-2.5 rounded-lg px-2 py-2 text-left transition hover:bg-white/5"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-rose-500/15 text-rose-300">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4 4a2 2 0 0 1 2-2h5.586A2 2 0 0 1 13 2.586L16.414 6A2 2 0 0 1 17 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Z" />
                </svg>
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-slate-200 group-hover:text-white">
                  {doc.name}
                </div>
                <div className="truncate text-xs text-slate-500">
                  {doc.meta}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={onUpload}
        className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-white/15 px-2 py-2 text-xs font-medium text-slate-400 transition hover:border-white/30 hover:text-slate-200"
      >
        <span className="text-base leading-none">+</span> Upload document
      </button>
    </div>
  );
}
