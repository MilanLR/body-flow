import { useLocation } from "wouter";

import {
  getAlternateLanguagePath,
  getLangFromPath,
  getPageFromPath,
} from "@/lib/routes";
import { createLangContextValue, type Lang, type LangContextValue } from "@/i18n/LangContext";

export function useLocalizedPage(): LangContextValue {
  const [location, setLocation] = useLocation();
  const current = getPageFromPath(location);
  const lang = current?.lang ?? getLangFromPath(location);
  const pageKey = current?.pageKey ?? "home";

  const setLang = (nextLang: Lang) => {
    setLocation(getAlternateLanguagePath(location, nextLang));
  };

  return createLangContextValue(lang, pageKey, setLang);
}
