import { useLang } from "@/i18n/LangContext";
import { cn } from "@/lib/utils";
import { getBlogPostBySlug, getBlogPostPath } from "@/content/blog/registry";
import { getWhoItsForContent } from "@/content/pageContent";

const TOPSPORT_POST_SLUG = {
  nl: "eecp-en-topsport",
  en: "eecp-therapy-for-athletes",
} as const;

function scrollToAudience(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function WhoItsForAudiences() {
  const { lang } = useLang();
  const page = getWhoItsForContent(lang);
  const post = getBlogPostBySlug(lang, TOPSPORT_POST_SLUG[lang]);
  const blogHref = post ? getBlogPostPath(lang, post) : null;

  return (
    <>
      <section className="mobile-padding bg-[var(--lighter-blue)] py-16">
        <div className="container">
          <p className="section-label text-center">{page.chooseLabel}</p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {page.audiences.map((a) => (
              <a
                key={a.id}
                href={`#${a.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToAudience(a.id);
                }}
                className="group flex flex-col items-center rounded-sm border border-[oklch(0.88_0.02_230)] bg-white px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(26,46,74,0.10)]"
              >
                <img src={a.icon} alt="" aria-hidden="true" className="h-20 w-20" />
                <span className="mt-5 font-body text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[var(--navy-800)]">
                  {a.label}
                </span>
                <h2 className="mt-3 font-display text-[1.5rem] font-medium leading-tight text-[var(--navy-900)]">
                  {a.cardTitle}
                </h2>
                <p className="mt-2 font-body text-[0.9rem] leading-7 text-[oklch(0.40_0.04_235)]">
                  {a.cardText}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 font-body text-[0.8rem] font-medium text-[var(--navy-700)]">
                  {page.readMore}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 3 L7 11 M4 8 L7 11 L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {page.audiences.map((a, i) => (
        <section
          key={a.id}
          id={a.id}
          className={cn(
            "mobile-padding scroll-mt-24 py-20",
            i % 2 === 0 ? "bg-white" : "bg-[var(--lighter-blue)]"
          )}
        >
          <div className="container">
            <div
              className={cn(
                "flex flex-col items-center gap-10 md:gap-16",
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              <img src={a.icon} alt="" aria-hidden="true" className="h-36 w-36 shrink-0 md:h-48 md:w-48" />
              <div className="max-w-2xl">
                <p className="section-label">{a.label}</p>
                <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.6rem)] font-medium leading-tight text-[var(--navy-900)]">
                  {a.title}
                </h2>
                <p className="mt-5 font-body text-[0.98rem] leading-8 text-[oklch(0.40_0.04_235)]">
                  {a.lead}
                </p>
                <ul className="mt-6 space-y-3 pl-5 font-body text-[0.95rem] leading-7 text-[oklch(0.40_0.04_235)] list-disc marker:text-[var(--navy-600)]">
                  {a.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className="mt-6 font-body text-[0.95rem] leading-7 text-[oklch(0.35_0.04_235)]">
                  {a.closing}
                </p>
                {"linkLabel" in a && blogHref && (
                  <a
                    href={blogHref}
                    className="mt-3 inline-block font-body text-[0.9rem] font-medium text-[var(--navy-700)] underline underline-offset-4"
                  >
                    {a.linkLabel}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
