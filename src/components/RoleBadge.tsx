import type { Role } from "../data/mockData";

export default function RoleBadge({
  role,
  size = "md",
}: {
  role: Role;
  size?: "sm" | "md";
}) {
  const pad = size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${pad} ${role.accent.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${role.accent.dot}`} />
      {role.persona}
    </span>
  );
}
