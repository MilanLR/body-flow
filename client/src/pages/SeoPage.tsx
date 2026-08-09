import type { ReactNode } from "react";

import { SeoCta } from "@/components/SeoCta";
import { SeoHead } from "@/components/SeoHead";
import { useLang } from "@/i18n/LangContext";
import { FloatingLangSwitcher } from "@/sections/FloatingLangSwitcher";
import { Footer } from "@/sections/Footer";
import { Navbar } from "@/sections/Navbar";

export function SeoPage({
  seoTitle,
  title,
  intro,
  pathname,
  children,
}: {
  seoTitle: string;
  title: string;
  intro: string;
  pathname: string;
  children: ReactNode;
}) {
  const { pageKey } = useLang();

  return (
    <div className="min-h-screen">
      <SeoHead title={seoTitle} description={intro} pathname={pathname} />
      <FloatingLangSwitcher />
      <Navbar />
      <main className="pt-24">
        <section className="mobile-padding bg-white py-16 md:py-20">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
              <div className="max-w-3xl">
                <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.05] text-[var(--navy-900)]">
                  {title}
                </h1>
                <p className="mt-6 font-body text-lg leading-8 text-[oklch(0.38_0.04_235)]">
                  {intro}
                </p>
              </div>
              <div className="shrink-0 flex items-center justify-start md:justify-end pt-2 md:pt-0">
                <img
                  src="/zkn.png"
                  alt="ZKN Keurmerk - Zelfstandige Klinieken Nederland"
                  loading="lazy"
                  decoding="async"
                  data-ga-category="external_link"
                  data-ga-name="zkn_logo_view"
                  data-ga-location="page_header"
                  className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain shrink-0"
                />
              </div>
            </div>
          </div>
        </section>
        {children}
        {pageKey !== "contact" && pageKey !== "privacy" && <SeoCta />}
      </main>
      <Footer />
    </div>
  );
}

export function SeoPageSection({
  title,
  body,
  items,
}: {
  title: string;
  body: string;
  items?: string[];
}) {
  return (
    <section className="mobile-padding bg-white py-16">
      <div className="container">
        <div className="max-w-3xl">
          <h2 className="font-display text-[clamp(1.9rem,4vw,2.6rem)] font-medium text-[var(--navy-900)]">
            {title}
          </h2>
          <p className="mt-5 font-body text-[0.98rem] leading-8 text-[oklch(0.40_0.04_235)]">
            {body}
          </p>
          {items && (
            <ul className="mt-6 space-y-3 pl-5 font-body text-[0.95rem] leading-7 text-[oklch(0.40_0.04_235)]">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
