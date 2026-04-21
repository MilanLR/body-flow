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

export function buildAlternates(pathname: string): AlternateLink[] {
  return [
    { hrefLang: "nl", href: buildCanonicalUrl(getAlternateLanguagePath(pathname, "nl")) },
    { hrefLang: "en", href: buildCanonicalUrl(getAlternateLanguagePath(pathname, "en")) },
    { hrefLang: "x-default", href: buildCanonicalUrl("/nl/") },
  ];
}
