import { useLocation } from "wouter";

import {
  DEFAULT_LANG,
  getAlternateLanguagePath,
  getPageFromPath,
} from "@/lib/routes";
import { createLangContextValue, type Lang, type LangContextValue } from "@/i18n/LangContext";

export function useLocalizedPage(): LangContextValue {
  const [location, setLocation] = useLocation();
  const current = getPageFromPath(location) ?? {
    lang: DEFAULT_LANG,
    pageKey: "home" as const,
  };

  const setLang = (nextLang: Lang) => {
    setLocation(getAlternateLanguagePath(location, nextLang));
  };

  return createLangContextValue(current.lang, current.pageKey, setLang);
}
