import {
  getBlogFromPath,
  getBlogIndexPath,
  getBlogPostPath,
} from "@/content/blog/registry";
import type { Lang } from "@/i18n/LangContext";

export const DEFAULT_LANG: Lang = "nl";

export const PAGE_KEYS = [
  "home",
  "treatment",
  "costs",
  "whoItsFor",
  "amsterdam",
  "science",
  "contact",
  "privacy",
] as const;

export type PageKey = (typeof PAGE_KEYS)[number];

const localizedSlugs: Record<Lang, Record<PageKey, string>> = {
  nl: {
    home: "",
    treatment: "eecp-therapie",
    costs: "kosten",
    whoItsFor: "voor-wie",
    amsterdam: "amsterdam",
    science: "wetenschap",
    contact: "contact",
    privacy: "privacyverklaring",
  },
  en: {
    home: "",
    treatment: "eecp-therapy",
    costs: "costs",
    whoItsFor: "who-its-for",
    amsterdam: "amsterdam",
    science: "science",
    contact: "contact",
    privacy: "privacy-policy",
  },
};

export const LOCALIZED_ROUTES: ReadonlyArray<{
  pageKey: PageKey;
  paths: Record<Lang, string>;
}> = PAGE_KEYS.map((pageKey) => ({
  pageKey,
  paths: {
    nl: getLocalizedPath("nl", pageKey),
    en: getLocalizedPath("en", pageKey),
  },
}));

export function getLocalizedPath(lang: Lang, pageKey: PageKey) {
  const slug = localizedSlugs[lang][pageKey];
  return slug ? `/${lang}/${slug}` : `/${lang}/`;
}

export function getLangFromPath(pathname: string): Lang {
  const normalized = pathname.replace(/\/+$/, "") || "/";

  if (normalized === "/en" || normalized.startsWith("/en/")) {
    return "en";
  }

  return DEFAULT_LANG;
}

export function getPageFromPath(
  pathname: string,
): { lang: Lang; pageKey: PageKey } | null {
  const normalized = pathname.replace(/\/+$/, "") || "/";

  for (const lang of ["nl", "en"] as const) {
    for (const pageKey of PAGE_KEYS) {
      if (
        getLocalizedPath(lang, pageKey).replace(/\/+$/, "") === normalized.replace(/\/+$/, "")
      ) {
        return { lang, pageKey };
      }
    }
  }

  return null;
}

export function getAlternateLanguagePath(pathname: string, nextLang: Lang) {
  const blog = getBlogFromPath(pathname);
  if (blog) {
    return blog.kind === "post"
      ? getBlogPostPath(nextLang, blog.post)
      : getBlogIndexPath(nextLang);
  }

  const current = getPageFromPath(pathname);
  return getLocalizedPath(nextLang, current?.pageKey ?? "home");
}
