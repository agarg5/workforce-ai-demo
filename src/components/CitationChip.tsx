import type { Citation } from "../data/mockData";

export default function CitationChip({
  citation,
  onClick,
}: {
  citation: Citation;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
      title="View source"
    >
      <svg
        className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-500"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4 4a2 2 0 0 1 2-2h5.586A2 2 0 0 1 13 2.586L16.414 6A2 2 0 0 1 17 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Z" />
      </svg>
      <span className="text-slate-700 group-hover:text-indigo-700">
        {citation.doc}
      </span>
      <span className="text-slate-400 group-hover:text-indigo-400">
        · p.{citation.page}
      </span>
    </button>
  );
}
