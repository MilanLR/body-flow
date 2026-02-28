import { useLang } from "@/i18n/LangContext";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

export function Prijslijst() {
  const { t } = useLang();
  const { ref, inView } = useInView();
  const tx = t.prijslijst;

  return (
    <section id="prijslijst" className="mobile-padding bg-white py-24">
      <div className="container">
        <div
          ref={ref}
          className={cn(
            "max-w-[700px] transition-all duration-[800ms] ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <span className="section-label">{tx.sectionLabel}</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-medium text-[var(--navy-900)] mt-3 mb-10">
            {tx.h2}
          </h2>

          <div className="flex flex-col">
            {tx.prices.map((row, i) => (
              <div
                key={row.item}
                className="price-row flex justify-between items-center py-3.5 border-b border-[oklch(0.92_0.02_230)]"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.5s ease ${i * 0.05}s`,
                }}
              >
                <span className="font-body text-sm text-[var(--navy-600)]">
                  {row.item}
                </span>
                <span className="font-display text-lg font-medium text-[var(--navy-800)]">
                  {row.price}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <a
              href="#contact"
              className="btn-pill btn-pill-navy flex items-center gap-2"
            >
              {tx.book}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7 L11 7 M8 4 L11 7 L8 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
