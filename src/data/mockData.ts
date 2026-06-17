// All mock data for the prototype. No backend / no API calls.

export type RoleKey = "engineer" | "qa" | "pm" | "executive" | "hr";

export interface Citation {
  doc: string;
  page: number;
}

export interface Role {
  key: RoleKey;
  /** Label shown in the login dropdown */
  label: string;
  /** Assistant persona shown in the chat header / badge */
  persona: string;
  /** Short descriptor under the persona */
  focus: string;
  /** Tailwind accent classes for the role badge */
  accent: {
    badge: string; // background + text for the role badge chip
    ring: string; // ring/border accent
    dot: string; // small status dot
    soft: string; // soft tinted background for highlights
  };
  /** A believable demo user for this role */
  sampleUser: string;
}

export interface RoleResponse {
  /** One-line summary of how this role's answer is framed */
  lens: string;
  /** The assistant's answer, as an ordered list of sections */
  sections: { heading?: string; body: string[] }[];
  citations: Citation[];
}

export const ROLES: Record<RoleKey, Role> = {
  engineer: {
    key: "engineer",
    label: "Software Engineer",
    persona: "Engineering Assistant",
    focus: "Technical depth · code · testing",
    accent: {
      badge: "bg-sky-500/15 text-sky-300",
      ring: "ring-sky-400/40",
      dot: "bg-sky-400",
      soft: "bg-sky-50 border-sky-100",
    },
    sampleUser: "Alan Zhang",
  },
  qa: {
    key: "qa",
    label: "QA Engineer",
    persona: "QA Assistant",
    focus: "Test strategy · validation · risk",
    accent: {
      badge: "bg-violet-500/15 text-violet-300",
      ring: "ring-violet-400/40",
      dot: "bg-violet-400",
      soft: "bg-violet-50 border-violet-100",
    },
    sampleUser: "Priya Natarajan",
  },
  pm: {
    key: "pm",
    label: "Project Manager",
    persona: "Project Assistant",
    focus: "Timeline · dependencies · status",
    accent: {
      badge: "bg-amber-500/15 text-amber-300",
      ring: "ring-amber-400/40",
      dot: "bg-amber-400",
      soft: "bg-amber-50 border-amber-100",
    },
    sampleUser: "Marcus Bell",
  },
  executive: {
    key: "executive",
    label: "Executive",
    persona: "Executive Assistant",
    focus: "Business impact · risk · outcomes",
    accent: {
      badge: "bg-emerald-500/15 text-emerald-300",
      ring: "ring-emerald-400/40",
      dot: "bg-emerald-400",
      soft: "bg-emerald-50 border-emerald-100",
    },
    sampleUser: "Wen Carter",
  },
  hr: {
    key: "hr",
    label: "HR",
    persona: "People Assistant",
    focus: "Process · policy · who to ask",
    accent: {
      badge: "bg-rose-500/15 text-rose-300",
      ring: "ring-rose-400/40",
      dot: "bg-rose-400",
      soft: "bg-rose-50 border-rose-100",
    },
    sampleUser: "Dana Okafor",
  },
};

export const ROLE_ORDER: RoleKey[] = [
  "engineer",
  "qa",
  "pm",
  "executive",
  "hr",
];

export interface CompanyDoc {
  name: string;
  meta: string;
}

export const COMPANY_DOCS: CompanyDoc[] = [
  { name: "Deployment Guide.pdf", meta: "Updated 4 days ago · 12 pages" },
  { name: "Architecture Overview.pdf", meta: "Updated 2 weeks ago · 28 pages" },
  { name: "Onboarding Checklist.pdf", meta: "Updated 1 month ago · 6 pages" },
  { name: "Release Process.pdf", meta: "Updated 3 days ago · 9 pages" },
];

// The same question, answered through five different role lenses,
// grounded in the SAME company documents.
export const DEPLOY_RESPONSES: Record<RoleKey, RoleResponse> = {
  engineer: {
    lens: "Technical, step-by-step, with commands and testing gates.",
    sections: [
      {
        body: [
          "Deployments to production go through our Jenkins pipeline. Here's the full path from a green build to live:",
        ],
      },
      {
        heading: "1. Pre-flight checks",
        body: [
          "Make sure your branch is rebased on `main` and CI is green:",
          "$ git fetch origin && git rebase origin/main\n$ npm run test && npm run lint",
        ],
      },
      {
        heading: "2. Cut a release build",
        body: [
          "Tag the release and let Jenkins build the artifact:",
          "$ git tag -a v1.x.0 -m \"release v1.x.0\"\n$ git push origin v1.x.0",
        ],
      },
      {
        heading: "3. Promote through environments",
        body: [
          "The pipeline auto-deploys the tag to `staging`. Run the smoke suite, then approve the manual promotion gate to ship to `prod`.",
          "$ npm run smoke -- --env=staging",
        ],
      },
      {
        heading: "Testing requirements",
        body: [
          "Production promotion is blocked unless unit + integration suites pass and the staging smoke test is green. Roll back with the `deploy:rollback` job if error rate exceeds 2%.",
        ],
      },
    ],
    citations: [
      { doc: "Deployment Guide.pdf", page: 3 },
      { doc: "Release Process.pdf", page: 5 },
    ],
  },
  qa: {
    lens: "Frames deployment as a quality gate: what to validate and where risk hides.",
    sections: [
      {
        body: [
          "From a QA standpoint, deployment is a sequence of quality gates. Here's what needs to pass and what to watch:",
        ],
      },
      {
        heading: "Validation gates before promotion",
        body: [
          "Regression suite green on staging, smoke tests passing, and no open Sev-1/Sev-2 defects on the release tag. The staging smoke run is the hard gate before the prod promotion is unlocked.",
        ],
      },
      {
        heading: "High-risk areas to verify post-deploy",
        body: [
          "Auth flows, the payment path, and any data-migration steps in the release. Run the post-deploy checklist within 15 minutes of promotion and confirm error rate stays under the 2% rollback threshold.",
        ],
      },
      {
        heading: "If something fails",
        body: [
          "File the defect against the release tag and trigger the `deploy:rollback` job — don't hotfix forward unless the release manager signs off.",
        ],
      },
    ],
    citations: [
      { doc: "Deployment Guide.pdf", page: 3 },
      { doc: "Release Process.pdf", page: 7 },
    ],
  },
  pm: {
    lens: "Frames deployment as a timeline with owners, dependencies, and status.",
    sections: [
      {
        body: [
          "Here's the deployment as a delivery flow — who does what, in what order, and where it can slip:",
        ],
      },
      {
        heading: "Sequence & owners",
        body: [
          "1. Engineering tags the release (Eng lead) → 2. Auto-deploy to staging → 3. QA sign-off on smoke + regression (QA) → 4. Manual prod promotion gate (Release manager) → 5. Post-deploy verification.",
        ],
      },
      {
        heading: "Dependencies to track",
        body: [
          "The prod promotion gate requires QA sign-off, so a slipped regression pass pushes the release window. Data-migration releases need a coordinated maintenance window.",
        ],
      },
      {
        heading: "Typical timeline",
        body: [
          "Tag → staging is automated (~15 min). The QA gate is the variable: budget half a day to a day. Production promotion itself is minutes once approved.",
        ],
      },
    ],
    citations: [
      { doc: "Release Process.pdf", page: 2 },
      { doc: "Deployment Guide.pdf", page: 3 },
    ],
  },
  executive: {
    lens: "Concise business framing: status, risk, timeline, customer impact.",
    sections: [
      {
        heading: "Deployment status",
        body: [
          "Releases ship through an automated pipeline with a manual approval gate before production. The current release is staged and awaiting QA sign-off.",
        ],
      },
      {
        heading: "Business risk",
        body: [
          "Low. An automated rollback triggers if production error rate exceeds 2%, limiting customer-facing exposure. The manual approval gate ensures no release reaches customers without sign-off.",
        ],
      },
      {
        heading: "Release timeline",
        body: [
          "Staging-to-production typically completes within one business day, gated primarily by quality validation. No scheduled downtime for standard releases.",
        ],
      },
      {
        heading: "Customer impact",
        body: [
          "None expected for standard releases. Database-migration releases use a planned maintenance window, communicated to customers in advance.",
        ],
      },
    ],
    citations: [
      { doc: "Deployment Guide.pdf", page: 3 },
      { doc: "Release Process.pdf", page: 1 },
    ],
  },
  hr: {
    lens: "Frames deployment around access, process ownership, and who to contact.",
    sections: [
      {
        body: [
          "Deployments are owned by the Engineering team and follow a documented release process. Here's what's useful to know from a people & process angle:",
        ],
      },
      {
        heading: "Who owns it",
        body: [
          "The Engineering lead cuts releases and the Release Manager approves the production promotion. New engineers are granted pipeline access as part of onboarding.",
        ],
      },
      {
        heading: "Access & onboarding",
        body: [
          "Pipeline and environment access is provisioned during onboarding — see the Onboarding Checklist. If a new hire needs deploy permissions, route the request to their Engineering lead.",
        ],
      },
      {
        heading: "Who to contact",
        body: [
          "For deployment questions, reach the Engineering lead or the Release Manager. For access issues, contact IT through the onboarding workflow.",
        ],
      },
    ],
    citations: [
      { doc: "Onboarding Checklist.pdf", page: 2 },
      { doc: "Deployment Guide.pdf", page: 1 },
    ],
  },
};

// Generic fallback used when the user types a free-form question, so the
// chat still feels role-aware and "live".
export function genericReply(role: Role): RoleResponse {
  return {
    lens: `Answered through the ${role.persona} lens.`,
    sections: [
      {
        body: [
          `As your ${role.persona}, I'd ground that answer in your company's knowledge base (${COMPANY_DOCS.length} documents connected) and frame it for a ${role.label}.`,
          "Try the suggested question below to see how the same company knowledge produces a different answer for each role.",
        ],
      },
    ],
    citations: [{ doc: "Architecture Overview.pdf", page: 4 }],
  };
}

export const DEFAULT_COMPANY = "ABC Consulting";
