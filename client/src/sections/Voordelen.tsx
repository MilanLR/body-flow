import { useLang } from "@/i18n/LangContext";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const images = [
  "/Cardiovasculair.png",
  "/energy.png",
  "/mental.png",
  "/recovery.png",
];

export function Voordelen() {
  const { t } = useLang();
  const { ref, inView } = useInView();
  const tx = t.voordelen;

  return (
    <section
      id="voordelen"
      className="mobile-padding bg-[var(--lighter-blue)] py-24"
    >
      <div className="container">
        <div
          ref={ref}
          className={cn(
            "text-center mb-16 transition-opacity duration-[800ms] ease-out",
            inView ? "opacity-100" : "opacity-0"
          )}
        >
          <span className="section-label">{tx.sectionLabel}</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-medium text-[var(--navy-900)] mt-3 leading-tight">
            {tx.h2}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {tx.benefits.map((b, i) => (
            <div
              key={b.number}
              className={cn(
                "flex flex-col items-center transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {/* Icon */}
              <div className="mb-4">
                <img
                  src={images[i]}
                  alt={b.title}
                  loading="lazy"
                  decoding="async"
                  className="w-28 h-28 object-contain"
                />
              </div>

              {/* Subtitle label */}
              <span className="font-body text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-[var(--navy-800)] mb-5 text-center leading-tight">
                {b.subtitle}
              </span>

              {/* Divider */}
              <div className="w-full border-t border-[oklch(0.82_0.02_230)] mb-5" />

              {/* Number + Title */}
              <h3 className="font-display text-[0.95rem] font-bold text-[var(--navy-900)] mb-3 self-start leading-snug">
                <span className="font-body text-[0.7rem] font-semibold tracking-[0.02em]">
                  {b.number}
                </span>
                <span className="font-body text-[0.7rem] font-normal mx-1.5 text-[var(--navy-600)]">|</span>
                {b.title}
              </h3>

              {/* Body text */}
              <p className="font-body text-[0.82rem] text-[oklch(0.35_0.03_235)] leading-[1.8] self-start text-justify">
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
