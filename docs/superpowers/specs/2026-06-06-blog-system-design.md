# Blog system for SEO — design

Date: 2026-06-06
Status: approved by user (in-chat), "Lees ook" (related posts) explicitly removed from scope

## Goal

AI-written (Claude-authored) blog posts on bodyflow-amsterdam to improve Google rankings
and visibility in Google's AI Overviews. Posts are written on request in Claude Code
sessions, shown to the user as a draft first, and only pushed after approval.

## Decisions

- **Languages:** every post in both NL and EN, with translated slugs and hreflang links.
- **Authoring:** Claude writes posts in-session; no bulk generation, no CMS.
- **Review gate:** draft shown in chat before pushing (medical/YMYL content — accuracy matters
  for both Google and NL health-advertising rules).
- **Storage (Option A):** one TypeScript content file per post + a central registry.
  No new dependencies. Routes, sitemap, overview page, and SEO meta all derive from the registry.

## URLs

| Page          | NL                   | EN                   |
| ------------- | -------------------- | -------------------- |
| Blog overview | `/nl/blog`           | `/en/blog`           |
| Post          | `/nl/blog/<nl-slug>` | `/en/blog/<en-slug>` |

## Architecture

- `client/src/content/blog/types.ts` — `BlogPost` type: per-language `{slug, seoTitle,
seoDescription, title, intro, sections[], faq?[]}` plus shared `datePublished`.
  Sections are `{title, paragraphs[], bullets?[]}` — same flavor as `focusedPages`.
- `client/src/content/blog/posts/<name>.ts` — one file per post, both languages inside.
- `client/src/content/blog/registry.ts` — `BLOG_POSTS` array; lookup helpers
  (`getBlogPostBySlug(lang, slug)`, path builders).
- **Routing:** blog index + post routes added to the wouter route table; blog paths
  integrated into `routes.ts` alternate-language resolution so the language switcher
  jumps NL post ↔ EN post.
- **SEO:** `routeSeo.ts` resolves blog paths to per-post title/description so the
  existing server-side meta injection (`server/seoHtml.ts`) works unchanged.
  Post pages render `Article` JSON-LD, `BreadcrumbList` JSON-LD, and `FAQPage`
  JSON-LD when a FAQ block exists.
- **Sitemap:** `generate-sitemap.mjs` additionally emits all blog URLs from the registry.

## Reader experience (post page)

Layout (per user request, modeled on hartkliniek.com news articles): the whole blog
(post + overview) sits on a `--lighter-blue` page background; the article is a single
centered white card (max-width 760px, border + soft shadow), text left-aligned. The
navbar always uses its dark (navy-on-white) state on blog pages.


- Site navbar (logo → homepage) and footer, same as other pages
- Breadcrumb: `Home › Blog › <title>` (clickable, plus BreadcrumbList schema)
- Body sections with headings, paragraphs, optional bullets, optional FAQ block
- In-text internal links to existing pages where natural
- Standard CTA block at the end: book-intake button + link to homepage
- No related-posts block (explicitly out of scope)

## Writing rules (enforced via CLAUDE.md checklist)

1. Both NL and EN versions, translated kebab-case slugs, keyword in slug
2. Register in `registry.ts`; verify the post shows up in generated `sitemap.xml`
3. SEO title ≤ 60 chars, meta description ≤ 155 chars, keyword first
4. First paragraph directly answers the search question (AI Overview optimization)
5. FAQ block with 2–4 questions where it fits
6. ≥ 2 internal links to existing pages + standard CTA at the end
7. Conservative, source-based medical claims; never promise cures
8. Show draft to user before pushing; all checks must pass
9. Real publish date; never backdate

## Testing

- Registry validation test: both languages present per post, unique slugs (per language),
  ISO date format, SEO title/description length limits.
- Existing route/SEO/sitemap tests extended where they enumerate routes.

## Out of scope

- Related posts ("Lees ook")
- Blog link in the main navigation (not requested; revisit later)
- Author profiles, comments, tags/categories, RSS
