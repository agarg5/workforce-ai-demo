import { useEffect } from "react";

// A lightweight simulated upload dialog so the "Upload document" button does
// something believable in the demo without a real backend.
export default function UploadModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

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
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-fade-in">
        <h3 className="text-lg font-semibold text-slate-900">
          Add company knowledge
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          In the full product, admins drag in PDFs and the platform extracts,
          chunks, and indexes them so every role-aware assistant can cite them.
        </p>

        <div className="mt-5 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3a.75.75 0 0 1 .75.75v6.69l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l1.72 1.72V3.75A.75.75 0 0 1 10 3Z" />
              <path d="M3.5 13a.75.75 0 0 1 .75.75v1.5c0 .14.11.25.25.25h11a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 15.5 17h-11A1.75 1.75 0 0 1 2.75 15.25v-1.5A.75.75 0 0 1 3.5 13Z" />
            </svg>
          </span>
          <p className="mt-3 text-sm font-medium text-slate-700">
            Drag &amp; drop PDFs here
          </p>
          <p className="text-xs text-slate-400">Disabled in this demo</p>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
