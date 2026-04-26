import { useLang } from "@/i18n/LangContext";
import { useInView } from "@/hooks/useInView";
import { EECP_THERAPY } from "./constants";
import { cn } from "@/lib/utils";

export function EECP() {
  const { t } = useLang();
  const { ref, inView } = useInView();
  const tx = t.eecp;
  const hero = t.hero;

  return (
    <section id="eecp" className="mobile-padding bg-white pb-24 pt-2 md:pt-4">
      <div className="container">
        <div
          ref={ref}
          className="responsive-grid eecp-grid grid grid-cols-2 gap-20 items-center"
        >
          {/* Text column */}
          <div
            className={cn(
              "transition-all duration-[800ms] ease-in-out",
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[30px]"
            )}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="vertical-rule h-12" />
              <span className="section-label">{tx.sectionLabel}</span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-medium text-[var(--navy-900)] leading-[1.2] mb-6">
              {tx.h2}
            </h2>
            <p className="font-body text-[0.95rem] text-[oklch(0.35_0.04_235)] leading-[1.8] mb-4">
              {tx.intro}
            </p>

            <div className="mt-8">
              <h3 className="font-display text-[1.4rem] font-medium text-[var(--navy-800)] mb-3">
                {tx.whatTitle}
              </h3>
              <p className="font-body text-[0.9rem] text-[oklch(0.40_0.04_235)] leading-[1.8] mb-6">
                {tx.whatText}
              </p>

              <h3 className="font-display text-[1.4rem] font-medium text-[var(--navy-800)] mb-3">
                {tx.howTitle}
              </h3>
              <p className="font-body text-[0.9rem] text-[oklch(0.40_0.04_235)] leading-[1.8] mb-4">
                {tx.howText}
              </p>
              <ul className="font-body text-[0.9rem] text-[oklch(0.40_0.04_235)] leading-[1.8] pl-5 mb-6">
                <li className="mb-2">{tx.howLi1}</li>
                <li>{tx.howLi2}</li>
              </ul>

              <h3 className="font-display text-[1.4rem] font-medium text-[var(--navy-800)] mb-3">
                {tx.physTitle}
              </h3>
              <p className="font-body text-[0.9rem] text-[oklch(0.40_0.04_235)] leading-[1.8] mb-2">
                {tx.physText}
              </p>
              <ul className="font-body text-[0.9rem] text-[oklch(0.40_0.04_235)] leading-[1.8] pl-5">
                <li className="mb-1.5">
                  <strong>{tx.physLi1Bold}</strong> {tx.physLi1}
                </li>
                <li className="mb-1.5">
                  <strong>{tx.physLi2Bold}</strong> {tx.physLi2}
                </li>
                <li>
                  <strong>{tx.physLi3Bold}</strong> {tx.physLi3}
                </li>
              </ul>
            </div>
          </div>

          {/* Image column */}
          <div
            className={cn(
              "relative transition-all duration-[800ms] ease-in-out delay-200",
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[30px]"
            )}
          >
            <div className="eecp-image-wrapper rounded-sm overflow-hidden aspect-[3/4] relative">
              <img
                src={EECP_THERAPY}
                alt="EECP therapy session at BodyFlow Amsterdam"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-white/30 rounded-sm pointer-events-none" />
            </div>
            <div
              className="mobile-stat-card absolute -bottom-6 -left-6 bg-[var(--navy-800)] text-white p-6 rounded-sm max-w-[200px]"
              style={{
                boxShadow: "0 8px 32px rgba(26,46,74,0.3)",
              }}
            >
              <div className="font-display text-[2.5rem] font-semibold leading-none">
                {hero.stat}
              </div>
              <div className="font-body text-[0.75rem] opacity-80 mt-2.5 leading-[1.4]">
                {hero.statLabel}
              </div>
              <div className="font-body text-[0.6rem] opacity-55 mt-2.5 leading-[1.4]">
                {hero.statNote}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
