import { useLang } from "@/i18n/LangContext";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

export function Traject() {
  const { t } = useLang();
  const { ref, inView } = useInView();
  const tx = t.traject;

  return (
    <section id="traject" className="mobile-padding bg-white py-24">
      <div className="container">
        <div ref={ref} className="max-w-[800px] mx-auto">
          <div
            className={cn(
              "text-center mb-16 transition-opacity duration-[800ms] ease-out",
              inView ? "opacity-100" : "opacity-0",
            )}
          >
            <span className="section-label">{tx.sectionLabel}</span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-medium text-[var(--navy-900)] mt-3 tracking-[0.05em] uppercase leading-tight">
              {tx.h2}
            </h2>
            <p className="font-display text-[1.2rem] italic text-[var(--ocean-500)] mt-3">
              {tx.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-0">
            {tx.steps.map((step, i) => (
              <div
                key={step.number}
                className={cn(
                  "traject-step flex gap-8 relative transition-all duration-700",
                  inView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-5",
                )}
                style={{
                  transitionDelay: `${i * 0.15}s`,
                  paddingBottom:
                    i < tx.steps.length - 1 ? "2.5rem" : "0",
                }}
              >
                <div className="flex flex-col items-center shrink-0 w-[3px]">
                  <div className="w-[3px] bg-[var(--ocean-500)] flex-1 min-h-full" />
                </div>
                <div className="pb-2">
                  <div className="font-body text-[0.7rem] font-semibold text-[var(--ocean-500)] tracking-[0.12em] mb-2">
                    {step.number} | {step.title}
                  </div>
                  <p className="font-body text-[0.9rem] text-[oklch(0.40_0.04_235)] leading-[1.8]">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
