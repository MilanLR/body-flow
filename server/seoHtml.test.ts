import { describe, expect, it } from "vitest";

import { getRouteSeo } from "../client/src/lib/routeSeo";
import { injectSeoIntoHtml } from "./seoHtml";

const baseHtml = `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="BodyFlow Amsterdam" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="BodyFlow Amsterdam" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="robots" content="index,follow" />
    <title>BodyFlow Amsterdam</title>
  </head>
  <body></body>
</html>`;

describe("injectSeoIntoHtml", () => {
  it("injects localized route seo into the initial html response", () => {
    const html = injectSeoIntoHtml(baseHtml, "/en/costs");

    expect(html).toContain("<html lang=\"en\">");
    expect(html).toContain("<title>EECP therapy costs | BodyFlow Amsterdam</title>");
    expect(html).toContain('meta name="description" content="View pricing, intake details and treatment options for EECP therapy at BodyFlow Amsterdam."');
    expect(html).toContain('link data-seo="page" rel="canonical" href="https://body-flow.nl/en/costs"');
    expect(html).toContain('meta property="og:url" content="https://body-flow.nl/en/costs"');
    expect(html).toContain('meta property="og:image" content="https://body-flow.nl/og-image.jpg"');
    expect(html).toContain('meta name="twitter:title" content="EECP therapy costs | BodyFlow Amsterdam"');
    expect(html).toContain('<script data-seo="page" type="application/ld+json">');
    expect(html).toContain('"@type":"MedicalBusiness"');
    expect(html).toContain('"url":"https://body-flow.nl/en/costs"');
    expect(html).toContain('link data-seo="page" rel="alternate" hreflang="nl" href="https://body-flow.nl/nl/kosten"');
    expect(html).toContain('link data-seo="page" rel="alternate" hreflang="en" href="https://body-flow.nl/en/costs"');
  });

  it("uses 404 noindex metadata for unknown localized urls", () => {
    const seo = getRouteSeo("/en/not-a-real-page");
    const html = injectSeoIntoHtml(baseHtml, "/en/not-a-real-page");

    expect(seo.statusCode).toBe(404);
    expect(seo.found).toBe(false);
    expect(html).toContain("<html lang=\"en\">");
    expect(html).toContain("<title>404 | BodyFlow Amsterdam</title>");
    expect(html).toContain('meta name="robots" content="noindex,nofollow"');
    expect(html).toContain('meta name="description" content="The page you are looking for could not be found."');
    expect(html).toContain('link data-seo="page" rel="canonical" href="https://body-flow.nl/en/not-a-real-page"');
    expect(html).toContain('"url":"https://body-flow.nl/en/not-a-real-page"');
    expect(html).not.toContain('hreflang="nl"');
    expect(html).not.toContain('hreflang="en"');
  });
});
