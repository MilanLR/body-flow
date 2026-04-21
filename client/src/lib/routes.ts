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
  const current = getPageFromPath(pathname);
  return getLocalizedPath(nextLang, current?.pageKey ?? "home");
}
