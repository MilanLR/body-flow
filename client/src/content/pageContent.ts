import en from "@/i18n/en.json";
import type { Lang } from "@/i18n/LangContext";
import nl from "@/i18n/nl.json";

type FocusedPageContent = (typeof nl.focusedPages)[keyof typeof nl.focusedPages];
type FocusedPageKey = keyof typeof nl.focusedPages;

const pageContent = {
  nl: nl.focusedPages,
  en: en.focusedPages,
} satisfies Record<Lang, Record<FocusedPageKey, FocusedPageContent>>;

export function getPageContent(lang: Lang, pageKey: FocusedPageKey) {
  return pageContent[lang][pageKey];
}
