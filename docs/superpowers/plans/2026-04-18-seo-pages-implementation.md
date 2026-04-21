# SEO Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build dedicated Dutch and English SEO landing pages for BodyFlow Amsterdam, add route-aware language switching and metadata, and strengthen crawl/index/image signals without introducing duplicate content or client-side redirect-only pages.

**Architecture:** The app will move from a single in-memory language toggle to route-derived localization built on top of `wouter`, with a centralized localized route map and per-page metadata. Shared page sections will be refactored into reusable content blocks so focused SEO pages can reuse the current design language while remaining standalone, indexable documents.

**Tech Stack:** React 19, TypeScript, Vite, Wouter, Express, Vitest

---

## File Structure

### Existing files to modify

- `client/src/App.tsx`
  - Replace the single-route setup with localized SEO page routes and a smarter root strategy.
- `client/src/i18n/LangContext.tsx`
  - Refactor from mutable local state to route-derived language and page metadata access.
- `client/src/i18n/nl.json`
  - Extend with SEO page copy, route labels, metadata, CTA labels, and localized slugs.
- `client/src/i18n/en.json`
  - Extend with English SEO page copy, route labels, metadata, CTA labels, and localized slugs.
- `client/src/pages/Home.tsx`
  - Convert into a route-aware homepage variant that can render by page/language config.
- `client/src/pages/NotFound.tsx`
  - Make the “go home” action route-aware so it does not always send users to `/`.
- `client/src/sections/Navbar.tsx`
  - Replace anchor-only navigation with route-aware links and language switching.
- `client/src/sections/FloatingLangSwitcher.tsx`
  - Replace state-based language changes with current-route language mapping.
- `client/src/sections/Footer.tsx`
  - Replace anchor links with localized route links and make the logo clickable.
- `client/src/sections/BodyFlowLogo.tsx`
  - Keep the asset source stable and reusable across linked logo placements.
- `client/index.html`
  - Reduce hardcoded homepage-only metadata to safe defaults and add crawl/share baseline tags.
- `server/index.ts`
  - Implement the `/` root behavior and direct route serving for localized pages and crawl files.
- `package.json`
  - Add explicit test command if needed and any metadata/asset generation script if implementation chooses a small helper script.

### New files to create

- `client/src/lib/site.ts`
  - Production origin, site name, and default image constants.
- `client/src/lib/routes.ts`
  - Central page key definitions, localized slug map, and helper functions.
- `client/src/lib/seo.ts`
  - Canonical URL builders, alternate URL builders, and schema helpers.
- `client/src/hooks/useLocalizedPage.ts`
  - Read the current route and derive `{ lang, pageKey, pagePath, alternatePath }`.
- `client/src/hooks/usePageSeo.ts`
  - Apply route-level `<title>`, meta tags, canonical, `hreflang`, OG, and Twitter tags.
- `client/src/components/SeoHead.tsx`
  - Small head management component driven by `usePageSeo`.
- `client/src/components/SeoCta.tsx`
  - Bottom CTA block using i18n labels and route-aware destination helpers.
- `client/src/components/RouteLink.tsx`
  - Shared wrapper around `wouter` navigation for localized links.
- `client/src/pages/SeoPage.tsx`
  - Shared page shell for all indexable routes.
- `client/src/pages/LocalizedHomePage.tsx`
  - Homepage route wrapper using existing sections plus route-aware SEO setup.
- `client/src/pages/TreatmentPage.tsx`
- `client/src/pages/CostsPage.tsx`
- `client/src/pages/WhoItsForPage.tsx`
- `client/src/pages/AmsterdamPage.tsx`
- `client/src/pages/ContactPage.tsx`
  - Focused SEO landing pages for each intent.
- `client/src/content/pageContent.ts`
  - Small content selectors or block assemblers that map i18n content to page sections.
- `client/src/lib/routes.test.ts`
  - Unit tests for localized slug mapping and alternate-language URLs.
- `client/src/lib/seo.test.ts`
  - Unit tests for canonical URLs, alternates, and image metadata config.
- `client/src/components/SeoHead.test.ts`
  - Unit tests for document head mutation behavior.
- `client/src/sections/Navbar.test.tsx`
  - Tests for logo link and route-aware nav.
- `client/src/sections/FloatingLangSwitcher.test.tsx`
  - Tests for same-page language swapping.
- `client/public/robots.txt`
  - Crawl directives.
- `client/public/site.webmanifest`
  - Manifest and icon references.
- `client/public/apple-touch-icon.png`
  - Apple icon.
- `client/public/og-image.jpg`
  - Stable branded search/share image.
- `scripts/generate-sitemap.mjs`
  - Generate `dist/public/sitemap.xml` from the centralized route map after build.

## Task 1: Define Localized Routes And Route-Derived Language State

**Files:**
- Create: `client/src/lib/routes.ts`
- Create: `client/src/lib/routes.test.ts`
- Create: `client/src/hooks/useLocalizedPage.ts`
- Modify: `client/src/i18n/LangContext.tsx`
- Modify: `client/src/App.tsx`

- [ ] **Step 1: Write the failing route-map tests**

```ts
import { describe, expect, it } from "vitest";

import {
  DEFAULT_LANG,
  PAGE_KEYS,
  getLocalizedPath,
  getPageFromPath,
  getAlternateLanguagePath,
} from "./routes";

describe("localized routes", () => {
  it("maps Dutch and English page keys to stable SEO paths", () => {
    expect(getLocalizedPath("nl", "home")).toBe("/nl/");
    expect(getLocalizedPath("nl", "costs")).toBe("/nl/kosten");
    expect(getLocalizedPath("en", "costs")).toBe("/en/costs");
    expect(getLocalizedPath("en", "treatment")).toBe("/en/eecp-therapy");
  });

  it("derives page identity from route paths", () => {
    expect(getPageFromPath("/nl/voor-wie")).toEqual({ lang: "nl", pageKey: "whoItsFor" });
    expect(getPageFromPath("/en/contact")).toEqual({ lang: "en", pageKey: "contact" });
  });

  it("swaps to the equivalent page in the other language", () => {
    expect(getAlternateLanguagePath("/nl/kosten", "en")).toBe("/en/costs");
    expect(getAlternateLanguagePath("/en/eecp-therapy", "nl")).toBe("/nl/eecp-therapie");
  });

  it("exposes the Dutch default language for root routing", () => {
    expect(DEFAULT_LANG).toBe("nl");
    expect(PAGE_KEYS).toContain("home");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run client/src/lib/routes.test.ts`
Expected: FAIL with module-not-found errors for `./routes`

- [ ] **Step 3: Implement the localized route map and helpers**

```ts
import type { Lang } from "@/i18n/LangContext";

export const DEFAULT_LANG: Lang = "nl";

export const PAGE_KEYS = [
  "home",
  "treatment",
  "costs",
  "whoItsFor",
  "amsterdam",
  "contact",
] as const;

export type PageKey = (typeof PAGE_KEYS)[number];

const localizedSlugs: Record<Lang, Record<PageKey, string>> = {
  nl: {
    home: "",
    treatment: "eecp-therapie",
    costs: "kosten",
    whoItsFor: "voor-wie",
    amsterdam: "amsterdam",
    contact: "contact",
  },
  en: {
    home: "",
    treatment: "eecp-therapy",
    costs: "costs",
    whoItsFor: "who-its-for",
    amsterdam: "amsterdam",
    contact: "contact",
  },
};

export function getLocalizedPath(lang: Lang, pageKey: PageKey) {
  const slug = localizedSlugs[lang][pageKey];
  return slug ? `/${lang}/${slug}` : `/${lang}/`;
}

export function getPageFromPath(pathname: string): { lang: Lang; pageKey: PageKey } | null {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  for (const lang of ["nl", "en"] as const) {
    for (const pageKey of PAGE_KEYS) {
      if (getLocalizedPath(lang, pageKey).replace(/\/+$/, "") === normalized.replace(/\/+$/, "")) {
        return { lang, pageKey };
      }
    }
  }
  return null;
}

export function getAlternateLanguagePath(pathname: string, nextLang: Lang) {
  const current = getPageFromPath(pathname);
  return getLocalizedPath(nextLang, current?.pageKey ?? "home");
}
```

- [ ] **Step 4: Refactor language context to derive language from the current URL**

```tsx
import { createContext, useContext, type ReactNode } from "react";
import { useLocation } from "wouter";
import en from "./en.json";
import nl from "./nl.json";
import { getPageFromPath, type PageKey } from "@/lib/routes";

export type Lang = "nl" | "en";

type Translations = typeof nl;
const translations: Record<Lang, Translations> = { nl, en };

interface LangContextValue {
  lang: Lang;
  pageKey: PageKey;
  t: Translations;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const current = getPageFromPath(location) ?? { lang: "nl" as const, pageKey: "home" as const };

  return (
    <LangContext.Provider value={{ lang: current.lang, pageKey: current.pageKey, t: translations[current.lang] }}>
      {children}
    </LangContext.Provider>
  );
}
```

- [ ] **Step 5: Replace the router with localized page routes**

```tsx
function Router() {
  return (
    <Switch>
      <Route path="/" component={RootRedirect} />
      <Route path="/nl/" component={LocalizedHomePage} />
      <Route path="/nl/eecp-therapie" component={TreatmentPage} />
      <Route path="/nl/kosten" component={CostsPage} />
      <Route path="/nl/voor-wie" component={WhoItsForPage} />
      <Route path="/nl/amsterdam" component={AmsterdamPage} />
      <Route path="/nl/contact" component={ContactPage} />
      <Route path="/en/" component={LocalizedHomePage} />
      <Route path="/en/eecp-therapy" component={TreatmentPage} />
      <Route path="/en/costs" component={CostsPage} />
      <Route path="/en/who-its-for" component={WhoItsForPage} />
      <Route path="/en/amsterdam" component={AmsterdamPage} />
      <Route path="/en/contact" component={ContactPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}
```

- [ ] **Step 6: Run tests to verify the route model passes**

Run: `pnpm vitest run client/src/lib/routes.test.ts`
Expected: PASS

## Task 2: Add Route-Level SEO Metadata Utilities

**Files:**
- Create: `client/src/lib/site.ts`
- Create: `client/src/lib/seo.ts`
- Create: `client/src/lib/seo.test.ts`
- Create: `client/src/hooks/usePageSeo.ts`
- Create: `client/src/components/SeoHead.tsx`
- Create: `client/src/components/SeoHead.test.ts`
- Modify: `client/index.html`

- [ ] **Step 1: Write the failing SEO utility tests**

```ts
import { describe, expect, it } from "vitest";

import { buildAlternates, buildCanonicalUrl, getPrimaryImageUrl } from "./seo";

describe("seo helpers", () => {
  it("builds canonical URLs on the production origin", () => {
    expect(buildCanonicalUrl("/nl/kosten")).toBe("https://body-flow.nl/nl/kosten");
  });

  it("builds alternate language links for equivalent pages", () => {
    expect(buildAlternates("/nl/kosten")).toEqual([
      { hrefLang: "nl", href: "https://body-flow.nl/nl/kosten" },
      { hrefLang: "en", href: "https://body-flow.nl/en/costs" },
      { hrefLang: "x-default", href: "https://body-flow.nl/nl/" },
    ]);
  });

  it("uses a stable branded OG image", () => {
    expect(getPrimaryImageUrl()).toBe("https://body-flow.nl/og-image.jpg");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run client/src/lib/seo.test.ts`
Expected: FAIL with module-not-found errors for `./seo`

- [ ] **Step 3: Implement site constants and SEO builders**

```ts
import { getAlternateLanguagePath } from "./routes";

export const SITE_URL = "https://body-flow.nl";
export const SITE_NAME = "BodyFlow Amsterdam";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export function buildCanonicalUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

export function getPrimaryImageUrl() {
  return DEFAULT_OG_IMAGE;
}

export function buildAlternates(pathname: string) {
  return [
    { hrefLang: "nl", href: buildCanonicalUrl(getAlternateLanguagePath(pathname, "nl")) },
    { hrefLang: "en", href: buildCanonicalUrl(getAlternateLanguagePath(pathname, "en")) },
    { hrefLang: "x-default", href: buildCanonicalUrl("/nl/") },
  ];
}
```

- [ ] **Step 4: Implement head management and verify tags mutate correctly**

```tsx
export function SeoHead({
  title,
  description,
  pathname,
}: {
  title: string;
  description: string;
  pathname: string;
}) {
  usePageSeo({ title, description, pathname });
  return null;
}
```

```ts
import { render } from "react-dom/client";
import { act } from "react";
import { describe, expect, it } from "vitest";

import { SeoHead } from "./SeoHead";

describe("SeoHead", () => {
  it("sets title, canonical, and og:image", async () => {
    const root = document.createElement("div");
    document.body.append(root);

    await act(async () => {
      render(<SeoHead title="Kosten | BodyFlow Amsterdam" description="..." pathname="/nl/kosten" />, root);
    });

    expect(document.title).toBe("Kosten | BodyFlow Amsterdam");
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://body-flow.nl/nl/kosten");
    expect(document.head.querySelector('meta[property="og:image"]')?.getAttribute("content")).toBe("https://body-flow.nl/og-image.jpg");
  });
});
```

- [ ] **Step 5: Replace homepage-specific hardcoded head tags with neutral defaults**

```html
<meta name="description" content="BodyFlow Amsterdam biedt EECP-therapie in Amsterdam en Amstelveen." />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="BodyFlow Amsterdam" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="robots" content="index,follow" />
```

- [ ] **Step 6: Run SEO utility tests**

Run: `pnpm vitest run client/src/lib/seo.test.ts client/src/components/SeoHead.test.ts`
Expected: PASS

## Task 3: Expand Translation Files For Page-Level SEO Content

**Files:**
- Modify: `client/src/i18n/nl.json`
- Modify: `client/src/i18n/en.json`
- Test: `client/src/lib/routes.test.ts`

- [ ] **Step 1: Add page metadata and CTA structures to the Dutch translation file**

```json
{
  "seo": {
    "viewMore": "Bekijk meer informatie",
    "pages": {
      "home": {
        "title": "BodyFlow Amsterdam | EECP therapie in Amsterdam en Amstelveen",
        "description": "BodyFlow Amsterdam biedt EECP-therapie in Amstelveen voor cardiovasculaire ondersteuning, herstel en vitaliteit."
      },
      "costs": {
        "title": "Kosten EECP therapie | BodyFlow Amsterdam",
        "description": "Bekijk de kosten, intake en behandelopties voor EECP-therapie bij BodyFlow Amsterdam."
      }
    }
  },
  "pageCtas": {
    "costs": {
      "label": "Bekijk meer informatie",
      "href": "contact"
    }
  }
}
```

- [ ] **Step 2: Mirror the same structure in English with natural English copy**

```json
{
  "seo": {
    "viewMore": "View more information",
    "pages": {
      "home": {
        "title": "BodyFlow Amsterdam | EECP therapy in Amsterdam and Amstelveen",
        "description": "BodyFlow Amsterdam offers EECP therapy in Amstelveen for cardiovascular support, recovery and vitality."
      },
      "costs": {
        "title": "EECP therapy costs | BodyFlow Amsterdam",
        "description": "View pricing, intake details and treatment options for EECP therapy at BodyFlow Amsterdam."
      }
    }
  }
}
```

- [ ] **Step 3: Add per-page nav/footer labels rather than relying on anchor IDs**

```json
{
  "nav": {
    "home": "Home",
    "treatment": "EECP Therapy",
    "costs": "Costs",
    "whoItsFor": "Who it's for",
    "amsterdam": "Amsterdam",
    "contact": "Contact"
  }
}
```

- [ ] **Step 4: Run the existing translation-dependent tests**

Run: `pnpm vitest run client/src/sections/Pakketten.test.ts client/src/sections/BodyFlowLogo.test.ts client/src/sections/contactForm.test.ts`
Expected: PASS

## Task 4: Build Reusable SEO Page Shells And Focused Page Components

**Files:**
- Create: `client/src/components/SeoCta.tsx`
- Create: `client/src/content/pageContent.ts`
- Create: `client/src/pages/SeoPage.tsx`
- Create: `client/src/pages/LocalizedHomePage.tsx`
- Create: `client/src/pages/TreatmentPage.tsx`
- Create: `client/src/pages/CostsPage.tsx`
- Create: `client/src/pages/WhoItsForPage.tsx`
- Create: `client/src/pages/AmsterdamPage.tsx`
- Create: `client/src/pages/ContactPage.tsx`
- Modify: `client/src/pages/Home.tsx`

- [ ] **Step 1: Write a small page shell that all SEO pages can share**

```tsx
export function SeoPage({
  title,
  intro,
  children,
  pathname,
}: {
  title: string;
  intro: string;
  pathname: string;
  children: React.ReactNode;
}) {
  return (
    <LangProvider>
      <SeoHead title={title} description={intro} pathname={pathname} />
      <div className="min-h-screen">
        <FloatingLangSwitcher />
        <Navbar />
        <main className="pt-24">
          <section className="container py-16">
            <h1 className="font-display text-5xl">{title}</h1>
            <p className="mt-6 max-w-3xl font-body text-lg leading-8">{intro}</p>
          </section>
          {children}
          <SeoCta />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
```

- [ ] **Step 2: Build focused pages from extracted content blocks instead of homepage anchors**

```tsx
export default function CostsPage() {
  const { t, lang } = useLang();
  const [pathname] = useLocation();

  return (
    <SeoPage
      title={t.seo.pages.costs.title}
      intro={t.pages.costs.intro}
      pathname={pathname}
    >
      <Pakketten />
      <Prijslijst />
      <section className="container py-16">
        <h2 className="font-display text-3xl">{t.pages.costs.followUpTitle}</h2>
        <p className="mt-4 max-w-2xl font-body">{t.pages.costs.followUpBody}</p>
      </section>
    </SeoPage>
  );
}
```

- [ ] **Step 3: Keep the homepage as a broad overview page with route-level SEO**

```tsx
export default function LocalizedHomePage() {
  const { t } = useLang();
  const [pathname] = useLocation();

  return (
    <LangProvider>
      <SeoHead
        title={t.seo.pages.home.title}
        description={t.seo.pages.home.description}
        pathname={pathname}
      />
      <div className="min-h-screen">
        <FloatingLangSwitcher />
        <Navbar />
        <Hero />
        <EECP />
        <Voordelen />
        <VitalityBanner />
        <Traject />
        <Pakketten />
        <Prijslijst />
        <Contact />
        <Footer />
      </div>
    </LangProvider>
  );
}
```

- [ ] **Step 4: Run typecheck to catch page prop and i18n shape issues**

Run: `pnpm check`
Expected: PASS

## Task 5: Make Navigation, Logo, And Language Switching Route-Aware

**Files:**
- Create: `client/src/components/RouteLink.tsx`
- Create: `client/src/sections/Navbar.test.tsx`
- Create: `client/src/sections/FloatingLangSwitcher.test.tsx`
- Modify: `client/src/sections/Navbar.tsx`
- Modify: `client/src/sections/FloatingLangSwitcher.tsx`
- Modify: `client/src/sections/Footer.tsx`
- Modify: `client/src/pages/NotFound.tsx`

- [ ] **Step 1: Write failing tests for route-aware logo and language switching**

```tsx
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("links the logo to the localized homepage", () => {
    const html = renderToStaticMarkup(<Navbar />);
    expect(html).toContain('href="/nl/"');
  });
});
```

```tsx
import { describe, expect, it } from "vitest";

import { getAlternateLanguagePath } from "@/lib/routes";

describe("FloatingLangSwitcher", () => {
  it("swaps to the equivalent page instead of resetting to home", () => {
    expect(getAlternateLanguagePath("/nl/kosten", "en")).toBe("/en/costs");
  });
});
```

- [ ] **Step 2: Replace anchor links with centralized page-key links**

```tsx
const navLinks = [
  { label: tx.treatment, pageKey: "treatment" },
  { label: tx.costs, pageKey: "costs" },
  { label: tx.whoItsFor, pageKey: "whoItsFor" },
  { label: tx.amsterdam, pageKey: "amsterdam" },
  { label: tx.contact, pageKey: "contact" },
];

<RouteLink pageKey="home" className="no-underline">
  <BodyFlowLogo white={!scrolled} />
</RouteLink>
```

- [ ] **Step 3: Replace state mutation in both language switchers with route swaps**

```tsx
const [location, navigate] = useLocation();
const { lang } = useLang();

function handleSwitch(nextLang: Lang) {
  navigate(getAlternateLanguagePath(location, nextLang));
}
```

- [ ] **Step 4: Make footer links and 404 “go home” button localized**

```tsx
const homePath = getLocalizedPath(lang, "home");

<Button onClick={() => setLocation(homePath)}>
  <Home className="w-4 h-4 mr-2" />
  {lang === "nl" ? "Terug naar home" : "Go Home"}
</Button>
```

- [ ] **Step 5: Run navigation-focused tests**

Run: `pnpm vitest run client/src/sections/Navbar.test.tsx client/src/sections/FloatingLangSwitcher.test.tsx client/src/sections/BodyFlowLogo.test.tsx`
Expected: PASS

## Task 6: Add Structured Data, Robots, Manifest, And Stable Share/Search Image

**Files:**
- Modify: `client/src/lib/seo.ts`
- Modify: `client/src/hooks/usePageSeo.ts`
- Create: `client/public/robots.txt`
- Create: `client/public/site.webmanifest`
- Create: `client/public/apple-touch-icon.png`
- Create: `client/public/og-image.jpg`

- [ ] **Step 1: Extend the SEO helper to emit JSON-LD and stable image fields**

```ts
export function buildLocalBusinessSchema(pathname: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "BodyFlow Amsterdam",
    url: buildCanonicalUrl(pathname),
    image: [getPrimaryImageUrl()],
    logo: `${SITE_URL}/bodyflow-logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Amsterdamseweg 487",
      postalCode: "1181 BR",
      addressLocality: "Amstelveen",
      addressCountry: "NL",
    },
  };
}
```

- [ ] **Step 2: Add crawl files in `client/public`**

```txt
User-agent: *
Allow: /

Sitemap: https://body-flow.nl/sitemap.xml
```

```json
{
  "name": "BodyFlow Amsterdam",
  "short_name": "BodyFlow",
  "start_url": "/nl/",
  "display": "standalone",
  "background_color": "#f4efe6",
  "theme_color": "#102338",
  "icons": [
    { "src": "/favicon.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ]
}
```

- [ ] **Step 3: Add a dedicated branded OG/search image asset**

Implementation note:
- Use a single exported raster asset at `client/public/og-image.jpg`
- Keep the BodyFlow brand visible and the crop stable at `1200x630`
- Do not reuse incidental section artwork like `ecg.png`

- [ ] **Step 4: Verify asset existence and schema/image URL tests**

Run: `pnpm vitest run client/src/lib/seo.test.ts && test -f client/public/og-image.jpg && test -f client/public/robots.txt && test -f client/public/site.webmanifest`
Expected: PASS with exit code `0`

## Task 7: Generate Sitemap And Finalize Server Root Behavior

**Files:**
- Create: `scripts/generate-sitemap.mjs`
- Modify: `package.json`
- Modify: `server/index.ts`

- [ ] **Step 1: Add a sitemap generator that reads the centralized route map**

```js
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const pages = [
  "/nl/",
  "/nl/eecp-therapie",
  "/nl/kosten",
  "/nl/voor-wie",
  "/nl/amsterdam",
  "/nl/contact",
  "/en/",
  "/en/eecp-therapy",
  "/en/costs",
  "/en/who-its-for",
  "/en/amsterdam",
  "/en/contact",
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((path) => `  <url><loc>https://body-flow.nl${path}</loc></url>`).join("\n")}
</urlset>
`;

writeFileSync(resolve("dist/public/sitemap.xml"), xml);
```

- [ ] **Step 2: Hook sitemap generation into the build**

```json
{
  "scripts": {
    "build": "vite build && node scripts/generate-sitemap.mjs && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "test": "vitest run"
  }
}
```

- [ ] **Step 3: Implement deterministic `/` handling in the Express server**

```ts
app.get("/", (_req, res) => {
  res.redirect(302, "/nl/");
});

app.get("*", (req, res) => {
  if (req.path === "/robots.txt" || req.path === "/sitemap.xml" || req.path === "/site.webmanifest") {
    return res.sendFile(path.join(staticPath, req.path));
  }

  res.sendFile(path.join(staticPath, "index.html"));
});
```

- [ ] **Step 4: Run a production build and check for sitemap output**

Run: `pnpm build`
Expected:
- `dist/public/sitemap.xml` exists
- build exits successfully

## Task 8: Full Verification Pass

**Files:**
- No additional files required

- [ ] **Step 1: Run the full automated test suite**

Run: `pnpm test`
Expected: PASS

- [ ] **Step 2: Run type checking**

Run: `pnpm check`
Expected: PASS

- [ ] **Step 3: Build the production bundle**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 4: Spot-check route and metadata behavior locally**

Run:

```bash
pnpm start
```

Then verify:
- `http://localhost:3000/` redirects to `/nl/`
- `http://localhost:3000/nl/kosten` loads without redirecting to the homepage
- `http://localhost:3000/en/costs` loads without redirecting to the homepage
- the logo on SEO pages points to the current language homepage
- the floating language switcher swaps `/nl/kosten` <-> `/en/costs`
- page source or devtools show canonical, `hreflang`, `og:image`, and robots tags
- `http://localhost:3000/robots.txt` and `http://localhost:3000/sitemap.xml` are reachable

- [ ] **Step 5: Confirm the stable branded image is referenced everywhere**

Verify:
- `og:image` points to `https://body-flow.nl/og-image.jpg`
- `twitter:image` points to `https://body-flow.nl/og-image.jpg`
- structured data `image` contains `https://body-flow.nl/og-image.jpg`

## Spec Coverage Check

- Localized Dutch and English SEO pages: covered by Tasks 1, 3, 4, and 7
- Route-aware language switching: covered by Tasks 1 and 5
- Clickable logo to homepage: covered by Task 5
- Bottom CTA from i18n: covered by Tasks 3 and 4
- Metadata, canonical, `hreflang`, OG, Twitter: covered by Task 2
- Structured data and branded result image improvements: covered by Task 6
- Sitemap, robots, manifest, and direct route access: covered by Tasks 6 and 7
- Avoiding JS auto-redirect-only SEO pages: covered by Tasks 4, 7, and 8

## Placeholder Scan

No deferred implementation markers should remain during execution. If a page needs additional copy depth during implementation, add concrete i18n keys and page sections before shipping instead of leaving thin content.

## Type Consistency Check

- Language type remains `Lang = "nl" | "en"`
- Shared page type is `PageKey`
- Route mapping helpers live in `client/src/lib/routes.ts`
- SEO helpers live in `client/src/lib/seo.ts`
- Route-aware page shell is `SeoPage`

## Notes For Execution

- Do not commit during execution unless the user changes the instruction.
- Prefer implementing the route map and head utility first; almost every other task depends on them.
- Keep page copy focused and distinct. Reusing sections is fine; duplicating the homepage verbatim is not.
