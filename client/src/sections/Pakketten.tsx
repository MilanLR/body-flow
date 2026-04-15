import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useLang } from "@/i18n/LangContext";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

export type PackageVariant = "flow" | "clinical";

type PakkettenTranslations = ReturnType<typeof useLang>["t"]["pakketten"];

export function getPackageVariantData(
  pakketten: PakkettenTranslations,
  variant: PackageVariant,
) {
  return pakketten.packageVariants[variant];
}

export function Pakketten() {
  const { t } = useLang();
  const { ref, inView } = useInView();
  const tx = t.pakketten;
  const [variant, setVariant] = useState<PackageVariant>("flow");
  const activeVariant = getPackageVariantData(tx, variant);

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

          <div className="mb-10 flex justify-center">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.83_0.02_230)] bg-white/80 p-2 shadow-[0_6px_24px_rgba(26,46,74,0.08)]"
              role="tablist"
              aria-label={tx.variantLabel}
            >
              {(
                Object.entries(tx.packageVariants) as Array<
                  [PackageVariant, typeof tx.packageVariants[PackageVariant]]
                >
              ).map(([key, option]) => {
                const isActive = key === variant;

                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setVariant(key)}
                    className={cn(
                      "min-w-[9rem] rounded-full px-5 py-3 text-sm font-semibold tracking-[0.08em] uppercase transition-all duration-300",
                      isActive
                        ? "bg-[var(--navy-800)] text-white shadow-[0_8px_24px_rgba(26,46,74,0.18)]"
                        : "text-[var(--navy-700)] hover:bg-[oklch(0.96_0.01_230)]",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Intake card */}
          <div className="intake-card bg-white rounded-sm p-8 px-10 mb-12 shadow-[0_2px_20px_rgba(26,46,74,0.06)]">
            <p className="font-body text-[0.9rem] text-[oklch(0.40_0.04_235)] leading-[1.8] mb-6">
              {tx.intakeText}
            </p>
            <div className="intake-icons-grid">
              <div className="intake-icon-item">
                <img src="/images/ecg.png" alt="ECG" className="w-16 h-16 object-contain" />
                <span className="intake-icon-label">{tx.ecg}</span>
              </div>
              <div className="intake-icon-item">
                <img src="/images/echocardiografie.png" alt="Echocardiografie" className="w-16 h-16 object-contain" />
                <span className="intake-icon-label">{tx.echo}</span>
              </div>
              <div className="intake-icon-item">
                <img src="/images/inspanningstest.png" alt="Inspanningstest" className="w-16 h-16 object-contain" />
                <span className="intake-icon-label">{tx.bike}</span>
              </div>
            </div>
            <p className="intake-price-text">
              {tx.intakePrice}.
            </p>
          </div>

          {/* Package cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={variant}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6"
            >
              {activeVariant.packages.map((pkg, i) => (
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
                  style={{ transitionDelay: `${i * 0.08}s` }}
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
                        {pkg.priceNote}
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
