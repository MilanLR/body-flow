import { useLang } from "@/i18n/LangContext";
import type { Lang } from "@/i18n/LangContext";

export function FloatingLangSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div
      className="fixed bottom-6 right-6 z-[200] flex items-center gap-0.5 rounded-3xl px-1.5 py-1 backdrop-blur-sm"
      style={{
        background: "rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.4)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
      }}
    >
      {(["nl", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="border-none rounded-[18px] font-body text-[0.72rem] font-semibold tracking-[0.08em] uppercase transition-all duration-300"
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
