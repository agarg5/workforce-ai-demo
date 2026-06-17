# Assembl — Role-Aware AI Workforce (Demo Prototype)

A clickable, **frontend-only** React prototype that demonstrates the core insight
behind a role-aware AI workforce platform:

> The **same** company knowledge produces a **different** answer depending on the
> employee's role.

There is no backend and no real API calls — everything is hardcoded mock data.
It exists to make the product idea immediately obvious to an advisor/investor.

## The demo in 30 seconds

1. **Login** — enter any company/email/password and pick a role.
2. **Chat** — a dark sidebar shows the workspace, the logged-in user, and a
   prominent role badge (e.g. _Engineering Assistant_). A company document list
   sits alongside the chat.
3. **The "aha"** — the conversation is pre-loaded with the question
   _"How do I deploy the application?"_. Use the **role toggle** at the top to
   switch between Software Engineer, QA, Project Manager, Executive, and HR and
   watch the answer (and its citations) change in place.

## Tech

- Vite + React + TypeScript
- Tailwind CSS
- Deployed via GitHub Actions to GitHub Pages

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build
```

## Deployment

Pushed to `main`, GitHub Actions builds and publishes to GitHub Pages.
Live at: **https://agarg5.github.io/workforce-ai-demo/**

The Vite `base` is set to `/workforce-ai-demo/` in `vite.config.ts`. If you rename
the repo, update `base` to match.

## Where to edit

- `src/data/mockData.ts` — roles, personas, documents, and the role-specific
  answers (this is the substance of the demo).
- `src/constants.ts` — product name and the demo question.
