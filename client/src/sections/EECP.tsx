import { useLang } from "@/i18n/LangContext";
import { useInView } from "@/hooks/useInView";
import { EECP_THERAPY } from "./constants";
import { cn } from "@/lib/utils";

export function EECP() {
  const { lang, t } = useLang();
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
            <div className="eecp-image-wrapper rounded-sm overflow-hidden aspect-[3/4] relative group">
              <a
                href="https://www.cardiovitaal.nl/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full cursor-pointer"
                title="CardioVitaal - Medische supervisie"
              >
                <img
                  src={EECP_THERAPY}
                  alt="EECP therapy session at BodyFlow Amsterdam"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </a>
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

            {/* CardioVitaal Medical Supervision Banner - Positioned cleanly below the image */}
            <div className="mt-10 flex justify-end">
              <a
                href="https://www.cardiovitaal.nl/"
                target="_blank"
                rel="noopener noreferrer"
                title="Bezoek CardioVitaal"
                className="bg-white p-3.5 px-4 rounded-md border border-[oklch(0.88_0.02_230)] shadow-[0_4px_20px_rgba(26,46,74,0.08)] flex items-center gap-3.5 no-underline transition-all duration-300 hover:shadow-[0_8px_28px_rgba(26,46,74,0.14)] hover:-translate-y-0.5 group/badge"
              >
                <img
                  src="/cardiovitaal.png"
                  alt="CardioVitaal Logo"
                  className="h-8 w-auto object-contain shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-body text-[0.72rem] text-[oklch(0.45_0.04_235)] leading-tight">
                    {(tx as any).supervisionLabel || (lang === "nl" ? "Onder medische supervisie van" : "Under medical supervision of")}
                  </span>
                  <span className="font-body text-[0.875rem] font-semibold text-[var(--navy-900)] group-hover/badge:text-[var(--ocean-600)] transition-colors flex items-center gap-1">
                    CardioVitaal
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-70 group-hover/badge:opacity-100 group-hover/badge:translate-x-0.5 transition-all">
                      <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
