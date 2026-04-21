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

  it("falls back to the home page for unknown paths", () => {
    expect(buildAlternates("/does-not-exist")).toEqual([
      { hrefLang: "nl", href: "https://body-flow.nl/nl/" },
      { hrefLang: "en", href: "https://body-flow.nl/en/" },
      { hrefLang: "x-default", href: "https://body-flow.nl/nl/" },
    ]);
  });

  it("uses a stable branded OG image", () => {
    expect(getPrimaryImageUrl()).toBe("https://body-flow.nl/og-image.jpg");
  });
});
