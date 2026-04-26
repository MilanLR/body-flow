import { getAlternateLanguagePath } from "@/lib/routes";

import { DEFAULT_OG_IMAGE, SITE_URL } from "./site";

export type AlternateLink = {
  hrefLang: string;
  href: string;
};

export function buildCanonicalUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

export function getPrimaryImageUrl() {
  return DEFAULT_OG_IMAGE;
}

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

export function serializeSchema(schema: unknown) {
  return JSON.stringify(schema).replaceAll("<", "\\u003c");
}

export function buildAlternates(pathname: string): AlternateLink[] {
  return [
    { hrefLang: "nl", href: buildCanonicalUrl(getAlternateLanguagePath(pathname, "nl")) },
    { hrefLang: "en", href: buildCanonicalUrl(getAlternateLanguagePath(pathname, "en")) },
    { hrefLang: "x-default", href: buildCanonicalUrl("/nl/") },
  ];
}
