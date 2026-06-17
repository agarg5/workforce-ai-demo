import { useState } from "react";
import { PRODUCT_NAME, PRODUCT_TAGLINE } from "../constants";
import {
  DEFAULT_COMPANY,
  ROLE_ORDER,
  ROLES,
  type RoleKey,
} from "../data/mockData";

export interface LoginPayload {
  company: string;
  email: string;
  role: RoleKey;
}

export default function Login({
  onLogin,
}: {
  onLogin: (payload: LoginPayload) => void;
}) {
  const [company, setCompany] = useState(DEFAULT_COMPANY);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<RoleKey>("engineer");

  const activeRole = ROLES[role];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onLogin({
      company: company.trim() || DEFAULT_COMPANY,
      email: email.trim() || "demo@company.com",
      role,
    });
  }

  return (
    <div className="flex min-h-full w-full">
      {/* Left brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-900 p-12 text-white lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(60% 60% at 20% 20%, rgba(99,102,241,0.5), transparent), radial-gradient(50% 50% at 80% 70%, rgba(14,165,233,0.45), transparent)",
          }}
        />
        <div className="relative flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-sky-500 text-base font-black">
            {PRODUCT_NAME.charAt(0)}
          </div>
          <span className="text-xl font-bold tracking-tight">
            {PRODUCT_NAME}
          </span>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-4xl font-extrabold leading-tight">
            The same company knowledge.
            <br />
            <span className="text-sky-300">Answered for your role.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">
            {PRODUCT_TAGLINE}. Every employee gets an assistant that already
            understands both their profession and how your company operates.
          </p>
          <ul className="mt-8 space-y-3 text-slate-300">
            {[
              "Universal knowledge from the model",
              "Role intelligence for each profession",
              "Company intelligence from your docs",
            ].map((t, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative text-sm text-slate-500">
          Demo prototype · mock data · no real account needed
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full items-center justify-center bg-slate-50 p-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-sky-500 text-base font-black text-white">
                {PRODUCT_NAME.charAt(0)}
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                {PRODUCT_NAME}
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Sign in to your workspace
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Pick a role to experience the role-aware assistant.
          </p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <Field label="Company name">
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="ABC Consulting"
                className="input"
              />
            </Field>
            <Field label="Work email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="input"
              />
            </Field>
            <Field label="Password">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input"
              />
            </Field>
            <Field label="Select your role">
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as RoleKey)}
                  className="input appearance-none pr-10"
                >
                  {ROLE_ORDER.map((key) => (
                    <option key={key} value={key}>
                      {ROLES[key].label}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                  ▾
                </span>
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                You'll talk to the{" "}
                <span className="font-semibold text-slate-700">
                  {activeRole.persona}
                </span>{" "}
                — {activeRole.focus.toLowerCase()}.
              </p>
            </Field>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>

      {/* Local input styling */}
      <style>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgb(226 232 240);
          background: white;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          color: rgb(15 23 42);
          outline: none;
          transition: box-shadow .15s, border-color .15s;
        }
        .input:focus {
          border-color: rgb(99 102 241);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}
