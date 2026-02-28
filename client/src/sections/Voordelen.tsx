import { useLang } from "@/i18n/LangContext";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const icons = [
  <svg key="heart" width="56" height="56" viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="27" stroke="oklch(0.45 0.10 230)" strokeWidth="1" />
    <path
      d="M28 38 C28 38 18 30 18 23 C18 19.5 20.5 17 24 17 C26 17 27.5 18 28 19.5 C28.5 18 30 17 32 17 C35.5 17 38 19.5 38 23 C38 30 28 38 28 38Z"
      stroke="oklch(0.35 0.07 240)"
      strokeWidth="1.5"
      fill="none"
    />
    <polyline
      points="20,28 24,32 36,20"
      stroke="oklch(0.45 0.10 230)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  <svg key="person" width="56" height="56" viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="27" stroke="oklch(0.45 0.10 230)" strokeWidth="1" />
    <circle cx="28" cy="22" r="5" stroke="oklch(0.35 0.07 240)" strokeWidth="1.5" fill="none" />
    <path
      d="M20 38 C20 33 23.5 30 28 30 C32.5 30 36 33 36 38"
      stroke="oklch(0.35 0.07 240)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M24 22 L20 18 M32 22 L36 18"
      stroke="oklch(0.45 0.10 230)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M28 17 L28 13"
      stroke="oklch(0.45 0.10 230)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>,
  <svg key="face" width="56" height="56" viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="27" stroke="oklch(0.45 0.10 230)" strokeWidth="1" />
    <circle cx="28" cy="24" r="9" stroke="oklch(0.35 0.07 240)" strokeWidth="1.5" fill="none" />
    <path
      d="M22 21 C22 21 24 18 28 18 C32 18 34 21 34 24"
      stroke="oklch(0.45 0.10 230)"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="25" cy="24" r="1" fill="oklch(0.45 0.10 230)" />
    <circle cx="31" cy="24" r="1" fill="oklch(0.45 0.10 230)" />
    <path
      d="M28 33 L28 40"
      stroke="oklch(0.35 0.07 240)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M24 40 L32 40"
      stroke="oklch(0.35 0.07 240)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>,
  <svg key="shield" width="56" height="56" viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="27" stroke="oklch(0.45 0.10 230)" strokeWidth="1" />
    <path
      d="M28 18 C28 18 20 22 20 30 C20 35 23.5 38 28 38 C32.5 38 36 35 36 30 C36 22 28 18 28 18Z"
      stroke="oklch(0.35 0.07 240)"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M24 30 L27 33 L33 25"
      stroke="oklch(0.45 0.10 230)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
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
            inView ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="section-label">{tx.sectionLabel}</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-medium text-[var(--navy-900)] mt-3 leading-tight">
            {tx.h2}
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8">
          {tx.benefits.map((b, i) => (
            <div
              key={b.number}
              className={cn(
                "flex flex-col gap-4 rounded-sm bg-white p-10 px-8 shadow-[0_2px_20px_rgba(26,46,74,0.06)] transition-all duration-700",
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6",
              )}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex justify-center">{icons[i]}</div>
              <div className="text-center">
                <div className="font-body text-[0.6rem] tracking-[0.2em] text-[var(--ocean-400)] uppercase mb-1">
                  {b.subtitle}
                </div>
              </div>
              <div className="border-t border-[oklch(0.90_0.02_230)] pt-4">
                <div className="font-body text-[0.7rem] font-semibold text-[var(--ocean-500)] tracking-[0.05em] mb-2">
                  {b.number} |
                </div>
                <h3 className="font-display text-xl font-semibold text-[var(--navy-800)] mb-3">
                  {b.title}
                </h3>
                <p className="font-body text-sm text-[oklch(0.42_0.04_235)] leading-[1.75]">
                  {b.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
