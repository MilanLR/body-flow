import type { Lang } from "@/i18n/LangContext";
import { getLocalizedPath, type PageKey } from "@/lib/routes";

export function resolveSharedSectionHref(
  lang: Lang,
  pageKey: PageKey,
  sectionId: string,
) {
  return pageKey === "home"
    ? `#${sectionId}`
    : `${getLocalizedPath(lang, "home")}#${sectionId}`;
}

export function resolveSharedContactHref(lang: Lang, pageKey: PageKey) {
  return pageKey === "home" || pageKey === "contact"
    ? "#contact"
    : getLocalizedPath(lang, "contact");
}

export function resolveSharedHomeHref(lang: Lang) {
  return getLocalizedPath(lang, "home");
}
