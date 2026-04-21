import { createContext, useContext, type ReactNode } from "react";
import type { PageKey } from "@/lib/routes";
import en from "./en.json";
import nl from "./nl.json";

export type Lang = "nl" | "en";

type Translations = typeof nl;

const translations: Record<Lang, Translations> = { nl, en };

export interface LangContextValue {
  lang: Lang;
  pageKey: PageKey;
  setLang: (lang: Lang) => void;
  t: Translations;
}

interface LangProviderProps {
  children: ReactNode;
  value: LangContextValue;
}

const LangContext = createContext<LangContextValue | null>(null);

export function createLangContextValue(
  lang: Lang,
  pageKey: PageKey,
  setLang: (lang: Lang) => void,
): LangContextValue {
  return {
    lang,
    pageKey,
    setLang,
    t: translations[lang],
  };
}

export function LangProvider({ children, value }: LangProviderProps) {
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
