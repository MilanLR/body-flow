# CLAUDE.md

Guidance for Claude Code when working in this repository.

**Important context: the user is not technical.** Pushing to `main` automatically deploys the live website. Your job is to make changes safely and explain things in plain language.

## Workflow rules

### Before working

- **Always `git pull` first** to get the latest changes before doing anything.
- If the pull causes conflicts, or there are uncommitted local changes you didn't make, **stop and explain the situation in plain language** — don't guess or overwrite anything.

### After working

- Stage all changes and push them as **one single commit** with a clear, descriptive message.
- Never leave work uncommitted at the end of a task.

### Never push broken code (main = live website)

Before every push, ALL of these must pass:

```bash
pnpm check   # TypeScript type check
pnpm test    # unit tests
pnpm build   # production build
```

- If any of them fail: **do not push.** Fix the problem, or explain simply what's wrong and ask how to proceed.
- For visible changes (text, layout, styling, pages), run `pnpm dev` and verify the page actually works before pushing.

## Safety rules

- **Keep changes small and focused.** Only touch files the request actually needs. Don't update dependencies, change config files, or restructure code unless explicitly asked.
- **Never do destructive git operations:** no force-push, no history rewriting, no deleting branches, no `git reset --hard` on work you didn't create.
- **Ask before risky changes.** If a request could break something (deleting pages, changing forms, touching the server), explain what could go wrong in simple terms and confirm first.
- **If something is already broken** when you start (failing build, weird git state), report it before doing the requested work.

## How to communicate

- Explain what you changed and why in **plain, non-technical language**. Avoid jargon; if a technical term is unavoidable, briefly explain it.
- After pushing, summarize: what changed, where to see it on the website, and confirm the checks passed.

## Project quick-facts

- **Stack:** React + Vite frontend, Express backend, TypeScript, Tailwind CSS, Radix UI components. Package manager: **pnpm** (not npm).
- **Key folders:**
  - `client/` — the website frontend (pages, components, styling)
  - `server/` — the backend (Express)
  - `shared/` — code shared between client and server
  - `scripts/` — utility scripts (e.g., sitemap generation)
- **Commands:**
  - `pnpm dev` — run the site locally for development
  - `pnpm check` — TypeScript type check
  - `pnpm test` — run tests
  - `pnpm build` — production build
  - `pnpm format` — format code with Prettier
- The sitemap is auto-generated (`pnpm generate:sitemap`) as part of dev/build — don't edit it by hand.
