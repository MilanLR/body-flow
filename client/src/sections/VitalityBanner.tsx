import { useLang } from "@/i18n/LangContext";
import { VITALITY } from "./constants";

export function VitalityBanner() {
  const { t } = useLang();
  const tx = t.vitality;

  return (
    <section className="relative h-[400px] overflow-hidden">
      <img
        src={VITALITY}
        alt="Vitaal leven in Amsterdam"
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,30,55,0.75)_0%,rgba(15,30,55,0.3)_60%,transparent_100%)]" />
      <div className="absolute inset-0 flex items-center">
        <div className="container">
          <blockquote className="max-w-[480px]">
            <p className="vitality-quote font-display text-[clamp(1.5rem,3vw,2.2rem)] font-normal italic text-white leading-snug mb-4">
              {tx.quote}
            </p>
            <p className="font-body text-[0.85rem] text-white/80 tracking-[0.05em]">
              {tx.by}
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
