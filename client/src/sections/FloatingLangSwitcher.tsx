import { useLang } from "@/i18n/LangContext";
import type { Lang } from "@/i18n/LangContext";
import { getAlternateLanguagePath } from "@/lib/routes";
import { useIsPastHero } from "@/hooks/useIsPastHero";
import { useLocation } from "wouter";

export function FloatingLangSwitcher() {
  const { lang } = useLang();
  const [location, navigate] = useLocation();
  // Op mobiel verhuist de wisselaar na de hero naar de navigatiebalk.
  const pastHero = useIsPastHero();

  function handleSwitch(nextLang: Lang) {
    navigate(getAlternateLanguagePath(location, nextLang));
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-[200] flex items-center gap-0.5 rounded-3xl px-1.5 py-1 max-md:py-0.5 backdrop-blur-sm${pastHero ? " max-md:hidden" : ""}`}
      style={{
        background: "rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.4)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
      }}
    >
      {(["nl", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => handleSwitch(l)}
          data-ga-category="navigation"
          data-ga-name="language_switch"
          data-ga-label={`switch_to_${l}`}
          data-ga-location="floating_switcher"
          className="border-none rounded-[18px] font-body text-[0.72rem] font-semibold tracking-[0.08em] uppercase transition-all duration-300 cursor-pointer"
          style={{
            background: lang === l ? "rgba(255,255,255,0.18)" : "transparent",
            color: lang === l ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
            padding: "0.3rem 0.7rem",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
