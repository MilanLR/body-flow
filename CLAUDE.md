# CLAUDE.md

Guidance for Claude Code when working in this repository.

**Important context: the user is not technical.** Pushing to `main` automatically deploys the live website. Your job is to make changes safely and explain things in plain language.

## Workflow rules

### Before working

- **Always `git pull` first** to get the latest changes before doing anything.
- If the pull causes conflicts, or there are uncommitted local changes you didn't make, **stop and explain the situation in plain language** — don't guess or overwrite anything.

### After working

- Stage all changes and push them as **one single commit** with a clear, descriptive message.
- **Follow-up fixes during review stay in the same commit.** When the user reviews the work and asks for tweaks before anything is pushed, fold them into the one commit (or `git commit --amend` if already committed locally). Never amend or force-push a commit that is already on GitHub — pushed history is immutable.
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
- **Never run `pnpm format` on the whole repo** — it reformats dozens of unrelated files and pollutes the commit. Format only the files you changed (`pnpm prettier --write <files>`), or rely on matching the existing style by hand.
- **Never do destructive git operations:** no force-push, no history rewriting, no deleting branches, no `git reset --hard` on work you didn't create.
- **Ask before risky changes.** If a request could break something (deleting pages, changing forms, touching the server), explain what could go wrong in simple terms and confirm first.
- **If something is already broken** when you start (failing build, weird git state), report it before doing the requested work.

## How to communicate

- Explain what you changed and why in **plain, non-technical language**. Avoid jargon; if a technical term is unavoidable, briefly explain it.
- After pushing, summarize: what changed, where to see it on the website, and confirm the checks passed.

## Writing a new blog post

Blog posts live in `client/src/content/blog/posts/` (one TypeScript file per post, both languages inside) and are registered in `client/src/content/blog/registry.ts`. Routes, the blog overview page, SEO meta tags, hreflang links, and the sitemap all derive from the registry automatically.

Checklist for every new post:

1. Write **both NL and EN** versions in the post file, with translated kebab-case slugs (keyword in the slug, e.g. `eecp-therapie-bij-vermoeidheid` / `eecp-therapy-for-fatigue`).
2. Add the post to `BLOG_POSTS` in `registry.ts` — this is the only registration step.
3. SEO title ≤ 60 characters, meta description ≤ 155 characters, per language, main keyword near the front. (The registry test enforces the limits.)
4. The intro paragraph must **directly answer the search question** — this is what Google's AI Overviews quote.
5. Include a `faq` block with 2–4 questions where it fits (rendered with FAQPage schema).
6. Include `internalLinks` (≥ 2) to existing pages (`treatment`, `costs`, `whoItsFor`, ...). The book-intake CTA is added automatically.
7. **Medical claims must be conservative and source-based.** Never promise cures or guaranteed results — this is both a Google E-E-A-T issue and a Dutch health-advertising rule. When in doubt, write "kan ondersteunen" not "geneest", and recommend consulting a GP for medical complaints.
8. Use the real publish date (today) in `datePublished`; never backdate.
9. Run `pnpm test` (registry validation), `pnpm check`, and `pnpm build`; verify the new URLs appear in `client/public/sitemap.xml` after the build.
10. **Show the full draft text to the user in chat and wait for approval before pushing.** This is mandatory — blog posts make health claims under the business name.

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
