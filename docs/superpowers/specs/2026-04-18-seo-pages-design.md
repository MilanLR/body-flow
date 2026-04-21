# SEO Pages Design

Date: 2026-04-18
Project: BodyFlow Amsterdam
Scope: SEO-focused page expansion for Dutch and English EECP discovery in Amsterdam and the Netherlands

## Objective

Increase qualified organic traffic for EECP-related searches by expanding the current single-page site into a small set of indexable, language-specific landing pages with strong local and treatment-intent SEO signals.

This design targets:
- Local intent in Amsterdam and Amstelveen
- National Dutch EECP treatment searches
- Secondary English-language discovery for visitors searching in English while in the Netherlands
- Improved consistency of branded image display in Google search results

## Current State

The site is currently a React/Vite single-page marketing site with:
- A single indexable primary route (`/`)
- Basic static metadata in `client/index.html`
- No route-specific metadata system
- No visible sitemap or robots file
- No clear structured data setup for organization, location, or service pages
- No dedicated SEO landing pages for treatment, pricing, audience, or location intent

This limits ranking potential for distinct search intents such as:
- `eecp therapie amsterdam`
- `eecp kosten`
- `wat is eecp therapie`
- `eecp therapy netherlands`

## Goals

### Primary goals

- Create a minimum viable SEO page set without turning the site into a large content-heavy publication
- Support separate Dutch and English URLs with direct route-to-route language switching
- Preserve the current design language and conversion focus
- Make the site easier for Google to crawl, index, and classify

### Secondary goals

- Strengthen brand presentation in search results
- Increase consistency of the Google result image by providing stronger explicit image signals
- Make page architecture clean enough to scale later if more SEO pages are added

## Non-goals

- Large editorial blog rollout
- Long-form medical content hub
- Automated locale detection and forced browser-language redirects
- A JS redirect pattern where SEO pages immediately bounce users to homepage sections

## Proposed Information Architecture

The site should move from a single homepage plus sections to a compact two-language route tree.

### Dutch routes

- `/nl/`
- `/nl/eecp-therapie`
- `/nl/kosten`
- `/nl/voor-wie`
- `/nl/amsterdam`
- `/nl/contact`

### English routes

- `/en/`
- `/en/eecp-therapy`
- `/en/costs`
- `/en/who-its-for`
- `/en/amsterdam`
- `/en/contact`

### Root route strategy

`/` should not become an independent duplicate of the homepage content if `/nl/` and `/en/` exist. The cleanest strategy is:
- pick one canonical primary homepage path strategy
- avoid multiple indexable URLs that carry the same content

Preferred approach:
- `/nl/` and `/en/` are the main indexable language homepages
- `/` either redirects once at the server level to the preferred default language or remains a minimal non-indexed gateway

The implementation plan should choose one of these and apply it consistently. The key requirement is to avoid duplicate homepage content across `/`, `/nl/`, and `/en/`.

## Page Model

Each page should be a real standalone document with enough original copy to justify ranking. It can share design motifs and some reusable components with the homepage, but it must not function as a thin wrapper that exists only to push users back to a section on `/`.

Each page should include:
- unique H1
- supporting introduction copy
- focused section content for the search intent
- page-specific metadata
- internal links to adjacent intent pages
- a bottom CTA button sourced from i18n, such as `View more information` / `Bekijk meer informatie`

## Page Intent Definitions

### Home

Purpose:
- broad brand overview
- conversion entry point
- high-level explanation of EECP and the BodyFlow process

Role:
- strongest brand page
- summary page linking into the focused SEO pages

### Treatment page

Purpose:
- rank for treatment-intent queries about EECP itself
- explain what EECP is, how it works, expected outcomes, and process

Role:
- core informational-commercial landing page

### Costs page

Purpose:
- rank for pricing and package searches
- explain package structure, what is included, and pricing context

Role:
- commercial landing page for price-sensitive users

Important behavior:
- this page remains a real standalone page
- it may contain links or buttons to the homepage pricing section, but it must not auto-redirect on load

### For-who page

Purpose:
- rank for suitability and audience-intent searches
- explain who EECP may be relevant for and what use cases BodyFlow serves

Role:
- qualification page that reduces ambiguity for prospective visitors

### Amsterdam page

Purpose:
- rank for local intent around Amsterdam and Amstelveen
- reinforce location relevance, accessibility, and local trust signals

Role:
- local SEO page

### Contact page

Purpose:
- provide a clean contact destination for branded and local intent
- support conversion and trust

Role:
- direct action page with clear contact details, map/location, and booking CTA

## Language Strategy

The language switcher should map equivalent pages directly instead of sending users back to the homepage.

Examples:
- `/nl/kosten` -> `/en/costs`
- `/en/eecp-therapy` -> `/nl/eecp-therapie`
- `/nl/contact` -> `/en/contact`

This route-pair model enables:
- cleaner UX
- stronger `hreflang` relationships
- clearer page equivalence for Dutch and English search engines/users

If a future page exists in one language but not the other, fallback behavior must be defined explicitly. For this phase, all primary SEO pages should exist in both languages to avoid fallback complexity.

## Navigation Changes

The current nav model is section-first. It should become route-aware.

Required changes:
- main nav links point to actual pages, not only same-page anchors
- footer links reflect the SEO page structure
- the BodyFlow logo becomes a link to the current language homepage
- focused SEO pages include a bottom CTA button from i18n, leading users deeper into the site

The homepage can continue to use section links for smooth browsing, but navigation should no longer depend entirely on in-page anchor behavior.

## Metadata System

The app needs a reusable metadata layer so each route can define its own SEO fields.

Each page should support:
- `title`
- `meta description`
- canonical URL
- `hreflang` alternate URLs
- Open Graph tags
- Twitter card tags
- robots directives
- primary social/search image

Page metadata should be deterministic and route-specific rather than hardcoded once in `client/index.html`.

## Structured Data

Structured data should be added in a targeted way.

Recommended schema coverage:
- `Organization` or `LocalBusiness`
- `MedicalBusiness` if the business model and risk tolerance support that classification
- `WebSite`
- page-level `BreadcrumbList` if breadcrumbs exist

Local schema should include:
- business name
- URL
- logo
- image
- contact details if available
- address/location details if available

The implementation should avoid over-claiming medical specifics that are not supported by the business model or on-page content.

## Google Result Image Strategy

The current search result image is inconsistent, which is common when Google has weak or conflicting image signals.

The site should introduce one stable branded image asset intended for search and sharing:
- dedicated image file, not an incidental page image
- large format, approximately `1200x630`
- publicly accessible on the production domain
- referenced consistently with absolute URLs

The asset should be used in:
- `og:image`
- `twitter:image`
- structured data image fields

Additional brand asset support:
- favicon
- apple touch icon
- web manifest icons

Expected outcome:
- stronger and more consistent image eligibility in search/social previews

Constraint:
- Google controls whether an image appears in results; the design can improve the signals substantially but cannot guarantee image display for every query/result type.

## Crawl and Indexing Infrastructure

Required technical SEO support:
- `sitemap.xml` including Dutch and English routes
- `robots.txt`
- clean internal linking between all indexable pages
- canonical rules that prevent duplicate indexing across alternate or fallback URLs

All target pages must be accessible directly via URL and should not rely on post-load JS redirects to become meaningful.

## Content Strategy

The new pages should reuse existing site content where appropriate, but not by copy-pasting the homepage sections verbatim and calling them new pages.

Content requirements:
- each page has a distinct opening section and narrative focus
- pages can reuse component patterns and selected content blocks
- content should be concise but substantial enough to avoid thin-page behavior
- Dutch and English copy should be equivalent in meaning, but written naturally for each language

The strongest candidate for reusable content extraction is the current homepage section content, which can be reorganized into page-specific blocks.

## CTA Strategy

Each focused SEO page should end with a clear CTA button whose label comes from i18n.

Example labels:
- Dutch: `Bekijk meer informatie`
- English: `View more information`

Behavior:
- CTA links to a deeper next step in the conversion path
- link target may be the homepage or another focused page depending on context
- CTA should feel intentional, not generic filler

The exact CTA copy can be refined during implementation, but it must live in the translation files rather than being hardcoded.

## UX and Conversion Considerations

The site should still feel like one cohesive brand experience rather than a cluster of disconnected landing pages.

To preserve that:
- reuse current design language, typography, and section motifs
- keep visual continuity across all pages
- link pages together deliberately
- maintain clear pathways back to consultation/contact actions

This design rejects the pattern of creating nominal SEO pages that exist only to immediately push users elsewhere. The SEO pages should support ranking and user understanding first, then conversion.

## Technical Implementation Shape

Likely implementation areas:
- route definitions and page components
- route-pair language mapping
- shared SEO/head utility
- localized route configuration
- extracted reusable content sections
- sitemap and robots generation
- new branded search/share image asset
- i18n expansion for page metadata, CTA labels, and page copy

The implementation should follow existing project patterns where practical, but the current app structure will need to evolve beyond the single-page assumption.

## Risks and Mitigations

### Risk: Duplicate content between language or root routes

Mitigation:
- define canonical URL rules up front
- avoid multiple indexable homepage variants with the same content
- implement explicit `hreflang` pairs

### Risk: Thin SEO pages

Mitigation:
- write focused original intros and supporting sections for each page
- ensure each page addresses a distinct search intent

### Risk: Inconsistent route mapping between languages

Mitigation:
- centralize page key to localized slug mapping
- make the language switcher derive destinations from one route map

### Risk: Metadata only updates after client-side hydration

Mitigation:
- choose a route metadata strategy that yields stable document head output for each URL
- verify what search crawlers receive for each route after build/serve

### Risk: Google still does not always show the image

Mitigation:
- provide stronger explicit image and organization signals
- accept that result image rendering remains Google-controlled

## Success Criteria

This design is successful when:
- the site exposes separate Dutch and English indexable pages for the defined intents
- each route has unique metadata and content focus
- the language switcher preserves page context across languages
- the logo links to the current language homepage
- focused pages include a bottom CTA from i18n
- sitemap, robots, canonical, `hreflang`, and structured data are in place
- the site provides a dedicated stable branded image for search/social previews

## Out of Scope for This Phase

- blog/article system
- automated SEO content generation
- region-specific city page proliferation beyond Amsterdam
- advanced analytics or attribution redesign
- forced client-side redirect behavior from every SEO page back to homepage sections

## Recommended Next Step

Move from this design into an implementation plan that:
- defines route config and localized slug mapping
- chooses the metadata rendering approach
- specifies page/component breakdown
- sequences copy extraction, SEO infrastructure, and navigation updates
- includes verification steps for generated metadata, crawl files, and route behavior
