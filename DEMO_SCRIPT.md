# Assecla — Demo Script

A ~4-minute walkthrough for showing the prototype to an advisor/investor. The
goal is to make one idea undeniable: **the same company knowledge produces a
different, role-appropriate answer for each employee.**

Live demo: **https://agarg5.github.io/workforce-ai-demo/**

> Note: this is a clickable prototype with mock data — no backend, no real LLM
> calls. It exists to convey the product concept, not the implementation.

---

## 0. One-line framing (before you click anything)

> "Generic AI knows the world but not your company. Internal chatbots know your
> company but not the person asking. Assecla combines three layers — universal
> knowledge, the employee's role, and the company's own knowledge — so every
> employee gets an answer shaped for how *they* work."

---

## 1. Login (15 sec)

- Open the app. Point out the **role dropdown**: "An admin assigns each employee
  a role — Engineer, QA, PM, Executive, HR."
- Pick **Software Engineer** and sign in.
- "Any credentials work — this is a prototype."

## 2. Orient them on the workspace (20 sec)

- Left sidebar: **company (Northwind Cloud)**, the logged-in user, and a
  prominent **role badge** ("Engineering Assistant").
- Document panel: "This is the company's uploaded knowledge — deployment guide,
  incident runbook, architecture, release process, onboarding."
- Header: the active **assistant persona** for this role.

## 3. The core moment — same question, different answers (90 sec)

- The chat is pre-loaded with **"How do I deploy the application?"**
- As the **Engineer**, read the answer: concrete commands, testing gates,
  rollback. "This is what an engineer needs."
- Now use the **role toggle** at the top. Click **Executive**.
  - Same question, but the answer is now **status, business risk, SLA, customer
    impact** — no commands. "Same company knowledge. Completely different
    answer."
- Click through **QA**, **Project Manager**, **HR** quickly to show each lens.
- Scroll to the second pre-loaded question, **"How do we handle a production
  incident?"**, and toggle roles again — the divergence is even sharper
  (on-call commands vs. SLA exposure vs. comms cadence vs. escalation contacts).

> Key line: *"We didn't write five chatbots. It's one knowledge base, re-framed
> by role."*

## 4. Trust / citations (30 sec)

- Click a **citation chip** (e.g. "Deployment Guide.pdf · p.3").
- The **source document opens** with the cited page highlighted. "Every answer
  is grounded and verifiable — this is what makes it trustworthy enough to
  replace asking a senior engineer."
- Optionally click a document in the sidebar to browse it directly.

## 5. The moat slide, in the UI (20 sec)

- Point to the **"Why this answer"** chips under any response:
  **Universal knowledge × Role intelligence × Company intelligence.**
- "Models commoditize. Our defensibility is the role layer plus the company
  layer — and the company only has to bring their documents."

## 6. Close (15 sec)

- "The MVP is the single-assistant CompanyGPT. This role-aware layer is the
  wedge that turns it into an AI workforce platform — and it's the same
  retrieval engine underneath, so it's an incremental build, not a rewrite."

---

## Anticipated questions & answers

- **"Isn't this just RAG / a system prompt per role?"**
  Today, yes — and that's deliberate. The point of the demo is the *product
  shape*: one knowledge base, role-scoped retrieval and framing, with citations.
  The defensibility comes from packaging role intelligence (and eventually
  industry packs) so a customer only has to bring their documents.

- **"How is this different from Glean / Copilot / Dust?"**
  They sell role agents into the enterprise at high seat minimums. Our wedge is
  a simpler upload-and-go CompanyGPT that *grows into* role awareness, aimed at
  teams those products don't serve cheaply yet.

- **"What's real vs. mocked here?"**
  Everything on screen is mock data to convey the experience. The real build is
  retrieval over uploaded docs with role-conditioned prompting and citations.
