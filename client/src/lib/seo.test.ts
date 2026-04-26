import { describe, expect, it } from "vitest";

import {
  buildAlternates,
  buildCanonicalUrl,
  buildLocalBusinessSchema,
  getPrimaryImageUrl,
} from "./seo";

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

  it("builds local business schema with canonical url and stable image", () => {
    expect(buildLocalBusinessSchema("/nl/kosten")).toEqual({
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: "BodyFlow Amsterdam",
      url: "https://body-flow.nl/nl/kosten",
      image: ["https://body-flow.nl/og-image.jpg"],
      logo: "https://body-flow.nl/bodyflow-logo.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Amsterdamseweg 487",
        postalCode: "1181 BR",
        addressLocality: "Amstelveen",
        addressCountry: "NL",
      },
    });
  });
});
