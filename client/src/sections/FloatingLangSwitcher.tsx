import { useState, useEffect } from "react";
import { useLang } from "@/i18n/LangContext";
import type { Lang } from "@/i18n/LangContext";

const DARK_SECTIONS = new Set(["hero", "pakketten", "contact"]);

export function FloatingLangSwitcher() {
  const { lang, setLang } = useLang();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const sectionIds = [
      "hero",
      "eecp",
      "voordelen",
      "traject",
      "pakketten",
      "prijslijst",
      "contact",
    ];
    const visible = new Map<string, number>();

    const updateDark = () => {
      let bestId = "hero";
      let bestRatio = -1;
      visible.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });
      setIsDark(DARK_SECTIONS.has(bestId));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
        });
        updateDark();
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const borderColor = isDark
    ? "rgba(255,255,255,0.4)"
    : "rgba(26,46,74,0.35)";
  const activeBg = isDark
    ? "rgba(255,255,255,0.18)"
    : "rgba(26,46,74,0.1)";
  const activeColor = isDark
    ? "rgba(255,255,255,0.95)"
    : "oklch(0.22 0.05 240)";
  const inactiveColor = isDark
    ? "rgba(255,255,255,0.45)"
    : "rgba(26,46,74,0.4)";

  return (
    <div
      className="fixed bottom-6 right-6 z-[200] flex items-center gap-0.5 rounded-3xl px-1.5 py-1 backdrop-blur-sm"
      style={{
        background: "transparent",
        border: `1px solid ${borderColor}`,
        boxShadow: isDark
          ? "0 2px 12px rgba(0,0,0,0.2)"
          : "0 2px 12px rgba(26,46,74,0.12)",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      {(["nl", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="border-none rounded-[18px] font-body text-[0.72rem] font-semibold tracking-[0.08em] uppercase transition-all duration-300"
          style={{
            background: lang === l ? activeBg : "transparent",
            color: lang === l ? activeColor : inactiveColor,
            padding: "0.3rem 0.7rem",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
