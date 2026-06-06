import { useLocation } from "wouter";

import { RouteLink } from "@/components/RouteLink";
import { SeoHead } from "@/components/SeoHead";
import { scienceContent } from "@/content/science";
import { useLang } from "@/i18n/LangContext";
import { FloatingLangSwitcher } from "@/sections/FloatingLangSwitcher";
import { Footer } from "@/sections/Footer";
import { Navbar } from "@/sections/Navbar";

export default function SciencePage() {
  const { lang, t } = useLang();
  const [pathname] = useLocation();
  const content = scienceContent[lang];

  return (
    <div className="min-h-screen">
      <SeoHead
        title={t.seo.pages.science.title}
        description={t.seo.pages.science.description}
        pathname={pathname}
      />
      <FloatingLangSwitcher />
      <Navbar />
      <main className="bg-white pt-24">
        <div className="mobile-padding py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-[960px]">
              {/* Hero */}
              <section className="relative overflow-hidden rounded-xl bg-[#0E3F63] px-8 py-12 md:px-12">
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full border"
                  style={{ borderColor: "rgba(255,255,255,0.12)" }}
                />
                <p className="font-body text-[0.7rem] tracking-[0.12em] uppercase text-white/70">
                  {content.heroLabel}
                </p>
                <h1 className="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-medium leading-[1.25] text-white">
                  {content.heroTitle}
                </h1>
                <p className="mt-4 max-w-xl font-body text-[0.95rem] leading-7 text-white/80">
                  {content.heroIntro}
                </p>
                <div className="mt-9 flex flex-wrap items-stretch gap-4">
                  {content.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col gap-1.5 rounded-xl border border-white/15 bg-white/10 px-6 py-5"
                    >
                      <span className="font-display text-[2rem] font-medium leading-none text-white">
                        {stat.value}
                      </span>
                      <span className="max-w-[220px] font-body text-[0.75rem] leading-5 text-white/75">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Studies */}
              <p className="section-label mt-14">{content.studiesLabel}</p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {content.studies.map((study) => (
                  <div
                    key={study.title}
                    className="flex flex-col rounded-xl border border-[oklch(0.88_0.02_230)] bg-white p-7 shadow-[0_4px_20px_rgba(26,46,74,0.05)]"
                  >
                    <span className="self-start rounded-full bg-[var(--lighter-blue)] px-3 py-1 font-body text-[0.65rem] font-medium tracking-[0.08em] uppercase text-[var(--navy-800)]">
                      {study.tag}
                    </span>
                    <p className="mt-4 font-body text-[1rem] font-semibold text-[var(--navy-900)]">
                      {study.title}
                    </p>
                    <div className="mt-4">
                      <div className="font-display text-[1.5rem] font-medium text-[var(--navy-900)]">
                        {study.kpiValue}
                      </div>
                      <div className="font-body text-[0.78rem] text-[oklch(0.50_0.03_235)]">
                        {study.kpiLabel}
                      </div>
                    </div>
                    <p className="mt-4 flex-1 font-body text-[0.9rem] leading-7 text-[oklch(0.40_0.04_235)]">
                      {study.text}
                    </p>
                    <p className="mt-5 border-t border-[oklch(0.92_0.01_230)] pt-4 font-body text-[0.75rem] leading-5 text-[oklch(0.55_0.03_235)]">
                      {study.reference}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mechanisms */}
              <p className="section-label mt-14">{content.mechanismsLabel}</p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {content.mechanisms.map((mechanism) => (
                  <div
                    key={mechanism.name}
                    className="rounded-xl border border-[oklch(0.92_0.01_230)] bg-[var(--lighter-blue)] p-6"
                  >
                    <p className="font-body text-[0.95rem] font-semibold text-[var(--navy-900)]">
                      {mechanism.name}
                    </p>
                    <p className="mt-2 font-body text-[0.88rem] leading-7 text-[oklch(0.40_0.04_235)]">
                      {mechanism.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <section className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-xl bg-[#0B2D45] px-9 py-8">
                <div>
                  <h3 className="font-display text-[1.3rem] font-medium text-white">
                    {content.ctaTitle}
                  </h3>
                  <p className="mt-1 font-body text-[0.85rem] text-white/60">{content.ctaText}</p>
                </div>
                <RouteLink pageKey="contact" className="btn-pill btn-pill-white whitespace-nowrap">
                  {content.ctaButton}
                </RouteLink>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
