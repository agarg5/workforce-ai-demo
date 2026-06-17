import { useEffect, useRef } from "react";
import { getDocPages } from "../data/mockData";

export interface DocTarget {
  doc: string;
  page?: number;
}

export default function DocumentPreview({
  target,
  onClose,
}: {
  target: DocTarget;
  onClose: () => void;
}) {
  const pages = getDocPages(target.doc);
  const activeRef = useRef<HTMLDivElement>(null);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Scroll the cited page into view when opened.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "center" });
  }, [target.doc, target.page]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-rose-500/15 text-rose-500">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 0 1 2-2h5.586A2 2 0 0 1 13 2.586L16.414 6A2 2 0 0 1 17 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Z" />
              </svg>
            </span>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                {target.doc}
              </div>
              <div className="text-xs text-slate-500">
                Company knowledge · {pages.length} page
                {pages.length === 1 ? "" : "s"} shown
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        {/* Pages */}
        <div className="overflow-y-auto bg-slate-100 px-5 py-5">
          {pages.length === 0 && (
            <p className="py-10 text-center text-sm text-slate-500">
              Preview not available for this document.
            </p>
          )}
          <div className="space-y-4">
            {pages.map((p) => {
              const isCited = p.page === target.page;
              return (
                <div
                  key={p.page}
                  ref={isCited ? activeRef : undefined}
                  className={`rounded-lg border bg-white p-5 shadow-sm transition ${
                    isCited
                      ? "border-indigo-300 ring-2 ring-indigo-300/60"
                      : "border-slate-200"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Page {p.page}
                    </span>
                    {isCited && (
                      <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">
                        Cited here
                      </span>
                    )}
                  </div>
                  <h3 className="mb-1.5 text-base font-semibold text-slate-900">
                    {p.heading}
                  </h3>
                  <div className="space-y-1.5">
                    {p.body.map((line, i) => (
                      <p
                        key={i}
                        className="text-sm leading-relaxed text-slate-600"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
