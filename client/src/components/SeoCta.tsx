import { useLang } from "@/i18n/LangContext";
import { getLocalizedPath, type PageKey } from "@/lib/routes";

export function SeoCta() {
  const { lang, pageKey, t } = useLang();
  const cta = t.pageCtas[pageKey];
  const targetPage = cta.href as PageKey;
  const href =
    targetPage === pageKey && pageKey === "contact"
      ? "#contact"
      : getLocalizedPath(lang, targetPage);

  return (
    <section className="mobile-padding bg-[var(--lighter-blue)] py-20">
      <div className="container">
        <div className="rounded-sm border border-[oklch(0.88_0.02_230)] bg-white px-8 py-10 shadow-[0_10px_40px_rgba(26,46,74,0.08)] md:flex md:items-center md:justify-between md:gap-8">
          <div className="max-w-2xl">
            <p className="section-label">{t.seo.viewMore}</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-medium text-[var(--navy-900)]">
              {t.nav[targetPage]}
            </h2>
          </div>
          <a
            href={href}
            data-ga-category="cta"
            data-ga-name="seo_cta_click"
            data-ga-label={cta.label}
            data-ga-location="seo_cta"
            className="btn-pill btn-pill-navy mt-6 inline-flex items-center gap-2 md:mt-0"
          >
            {cta.label}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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
    </section>
  );
}
