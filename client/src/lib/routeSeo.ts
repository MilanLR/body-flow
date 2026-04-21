import en from "@/i18n/en.json";
import nl from "@/i18n/nl.json";
import type { Lang } from "@/i18n/LangContext";
import { getLocalizedPath, getPageFromPath, type PageKey } from "@/lib/routes";
import { buildAlternates, buildCanonicalUrl, getPrimaryImageUrl } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const translations = { nl, en } satisfies Record<Lang, typeof nl>;

export type RouteSeo = {
  found: boolean;
  statusCode: 200 | 404;
  lang: Lang;
  pageKey: PageKey | null;
  title: string;
  description: string;
  robots: string;
  canonical: string;
  alternates: ReturnType<typeof buildAlternates>;
  ogImage: string;
  siteName: string;
};

function getLangFromPath(pathname: string): Lang {
  return pathname.startsWith("/en/") || pathname === "/en" ? "en" : "nl";
}

export function getRouteSeo(pathname: string): RouteSeo {
  const current = getPageFromPath(pathname);

  if (!current) {
    const lang = getLangFromPath(pathname);
    const canonical = buildCanonicalUrl(pathname);

    return {
      found: false,
      statusCode: 404,
      lang,
      pageKey: null,
      title: `404 | ${SITE_NAME}`,
      description:
        lang === "en"
          ? "The page you are looking for could not be found."
          : "De pagina die je zoekt kon niet worden gevonden.",
      robots: "noindex,nofollow",
      canonical,
      alternates: [],
      ogImage: getPrimaryImageUrl(),
      siteName: SITE_NAME,
    };
  }

  const resolvedPath = getLocalizedPath(current.lang, current.pageKey);
  const t = translations[current.lang];
  const pageSeo = t.seo.pages[current.pageKey];

  return {
    found: true,
    statusCode: 200,
    lang: current.lang,
    pageKey: current.pageKey,
    title: pageSeo.title,
    description: pageSeo.description,
    robots: "index,follow",
    canonical: buildCanonicalUrl(resolvedPath),
    alternates: buildAlternates(resolvedPath),
    ogImage: getPrimaryImageUrl(),
    siteName: SITE_NAME,
  };
}
