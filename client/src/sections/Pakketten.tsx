import { useLang } from "@/i18n/LangContext";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

export function Pakketten() {
  const { t } = useLang();
  const { ref, inView } = useInView();
  const tx = t.pakketten;

  return (
    <section
      id="pakketten"
      className="mobile-padding bg-[var(--lighter-blue)] py-24"
    >
      <div className="container">
        <div
          ref={ref}
          className={cn(
            "transition-opacity duration-[800ms] ease-out",
            inView ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="text-center mb-8">
            <span className="section-label">{tx.sectionLabel}</span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-medium text-[var(--navy-900)] mt-3">
              {tx.h2}
            </h2>
          </div>

          {/* Intake card */}
          <div className="intake-card bg-white rounded-sm p-8 px-10 mb-12 shadow-[0_2px_20px_rgba(26,46,74,0.06)]">
            <p className="font-body text-[0.9rem] text-[oklch(0.40_0.04_235)] leading-[1.8] mb-6">
              {tx.intakeText}
            </p>
            <div className="intake-icons-grid">
              <div className="intake-icon-item">
                <div className="intake-icon-circle">
                  <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                    <polyline
                      points="4,24 10,24 14,12 18,36 22,18 26,30 30,24 44,24"
                      stroke="oklch(0.35 0.07 240)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
                <span className="intake-icon-label">{tx.ecg}</span>
              </div>
              <div className="intake-icon-item">
                <div className="intake-icon-circle">
                  <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                    <rect
                      x="8"
                      y="10"
                      width="32"
                      height="28"
                      rx="2"
                      stroke="oklch(0.35 0.07 240)"
                      strokeWidth="1.8"
                      fill="none"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="8"
                      stroke="oklch(0.45 0.10 230)"
                      strokeWidth="1.8"
                      fill="none"
                    />
                    <path
                      d="M18 30 Q12 36 10 40"
                      stroke="oklch(0.35 0.07 240)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="intake-icon-label">{tx.echo}</span>
              </div>
              <div className="intake-icon-item">
                <div className="intake-icon-circle">
                  <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                    <circle
                      cx="14"
                      cy="34"
                      r="8"
                      stroke="oklch(0.35 0.07 240)"
                      strokeWidth="1.8"
                      fill="none"
                    />
                    <circle
                      cx="34"
                      cy="34"
                      r="8"
                      stroke="oklch(0.35 0.07 240)"
                      strokeWidth="1.8"
                      fill="none"
                    />
                    <path
                      d="M14 34 L24 18 L34 34"
                      stroke="oklch(0.45 0.10 230)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M24 18 L28 12"
                      stroke="oklch(0.35 0.07 240)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M26 12 L32 12"
                      stroke="oklch(0.35 0.07 240)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="intake-icon-label">{tx.bike}</span>
              </div>
            </div>
            <p className="intake-price-text">
              {tx.intakePrice} <strong>&euro;95</strong>.
            </p>
          </div>

          {/* Package cards */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {tx.packages.map((pkg, i) => (
              <div
                key={pkg.name}
                className={cn(
                  "flex flex-col overflow-hidden rounded-sm bg-white transition-all duration-700",
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6",
                  pkg.featured
                    ? "border-2 border-[var(--navy-600)] shadow-[0_8px_40px_rgba(26,46,74,0.12)]"
                    : "border border-[oklch(0.88_0.02_230)] shadow-[0_2px_20px_rgba(26,46,74,0.05)]",
                )}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {pkg.featured && (
                  <div className="bg-[var(--navy-800)] text-white text-center py-2 font-body text-[0.65rem] tracking-[0.15em] uppercase">
                    {tx.mostChosen}
                  </div>
                )}
                <div className="p-8 flex-1">
                  <h3 className="font-display text-[1.6rem] font-medium text-[var(--navy-800)] mb-1">
                    {pkg.name}
                  </h3>
                  {pkg.minSessions && (
                    <div className="font-body text-[0.8rem] font-semibold text-[var(--navy-600)] mb-1">
                      {pkg.minSessions}
                    </div>
                  )}
                  <p className="font-display text-base italic text-[oklch(0.50_0.05_235)] mb-6">
                    {pkg.tagline}
                  </p>
                  <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                    {pkg.features.map((f, j) => (
                      <li
                        key={j}
                        className="flex gap-3 items-start"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="shrink-0 mt-0.5"
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="7"
                            stroke="oklch(0.45 0.10 230)"
                            strokeWidth="1"
                          />
                          <polyline
                            points="5,8 7,10 11,6"
                            stroke="oklch(0.45 0.10 230)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="font-body text-[0.85rem] text-[oklch(0.40_0.04_235)] leading-normal">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-8 py-6 border-t border-[oklch(0.90_0.02_230)] flex items-center justify-between">
                  <div>
                    <span className="font-display text-[2rem] font-semibold text-[var(--navy-800)]">
                      {pkg.price}
                    </span>
                    <span className="font-body text-[0.8rem] text-[oklch(0.50_0.05_235)] ml-2">
                      {tx.perSession}
                    </span>
                  </div>
                  <a
                    href="#contact"
                    className="btn-pill btn-pill-navy text-[0.7rem] py-2.5 px-5 flex items-center gap-2"
                  >
                    {tx.book}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
