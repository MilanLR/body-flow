import { useLocation } from "wouter";

import { RouteLink } from "@/components/RouteLink";
import { SeoHead } from "@/components/SeoHead";
import { getBlogFromPath, getBlogIndexPath } from "@/content/blog/registry";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/content/blog/schema";
import { useLang } from "@/i18n/LangContext";
import { formatBlogDate } from "@/lib/blogDate";
import { getLocalizedPath } from "@/lib/routes";
import { serializeSchema } from "@/lib/seo";
import { FloatingLangSwitcher } from "@/sections/FloatingLangSwitcher";
import { Footer } from "@/sections/Footer";
import { Navbar } from "@/sections/Navbar";

import NotFound from "./NotFound";

export default function BlogPostPage() {
  const { lang, t } = useLang();
  const [pathname] = useLocation();
  const blog = getBlogFromPath(pathname);

  if (!blog || blog.kind !== "post") {
    return <NotFound />;
  }

  const { post } = blog;
  const locale = post.locales[lang];
  const tx = t.blog;

  const schemas = [
    buildArticleSchema(post, lang),
    buildBreadcrumbSchema(post, lang, {
      home: t.nav.home,
      blog: tx.breadcrumbBlog,
    }),
    buildFaqSchema(post, lang),
  ].filter(Boolean);

  return (
    <div className="min-h-screen">
      <SeoHead title={locale.seoTitle} description={locale.seoDescription} pathname={pathname} />
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeSchema(schema) }}
        />
      ))}
      <FloatingLangSwitcher />
      <Navbar />
      <main className="bg-[var(--lighter-blue)] pt-24">
        <article className="mobile-padding py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-[960px] rounded-sm border border-[oklch(0.88_0.02_230)] bg-white px-6 py-10 shadow-[0_10px_40px_rgba(26,46,74,0.08)] md:px-14 md:py-14">
              <nav className="font-body text-[0.8rem] text-[oklch(0.55_0.03_235)]">
                <RouteLink pageKey="home" className="no-underline hover:underline">
                  {t.nav.home}
                </RouteLink>
                <span className="mx-2">›</span>
                <a href={getBlogIndexPath(lang)} className="no-underline hover:underline">
                  {tx.breadcrumbBlog}
                </a>
                <span className="mx-2">›</span>
                <span>{locale.title}</span>
              </nav>

              <p className="mt-8 font-body text-[0.8rem] tracking-[0.1em] uppercase text-[oklch(0.55_0.03_235)]">
                {tx.publishedOn} {formatBlogDate(post.datePublished, lang)}
              </p>
              <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.12] text-[var(--navy-900)]">
                {locale.title}
              </h1>
              {locale.intro.split("\n\n").map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-6 font-body text-lg leading-8 text-[oklch(0.38_0.04_235)]"
                >
                  {paragraph}
                </p>
              ))}

              {locale.sections.map((section) => (
                <section key={section.title} className="mt-12">
                  <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-medium text-[var(--navy-900)]">
                    {section.title}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-5 font-body text-[0.98rem] leading-8 text-[oklch(0.40_0.04_235)]"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-6 list-disc space-y-3 pl-5 font-body text-[0.95rem] leading-7 text-[oklch(0.40_0.04_235)]">
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {locale.faq && locale.faq.length > 0 && (
                <section className="mt-12">
                  <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-medium text-[var(--navy-900)]">
                    {tx.faqTitle}
                  </h2>
                  <dl className="mt-6 space-y-7">
                    {locale.faq.map((item) => (
                      <div key={item.question}>
                        <dt className="font-body text-[1.05rem] font-semibold text-[var(--navy-900)]">
                          {item.question}
                        </dt>
                        <dd className="mt-2 font-body text-[0.95rem] leading-7 text-[oklch(0.40_0.04_235)]">
                          {item.answer}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {locale.internalLinks && locale.internalLinks.length > 0 && (
                <section className="mt-12 border-t border-[oklch(0.92_0.01_230)] pt-8">
                  <h2 className="font-body text-[0.75rem] tracking-[0.15em] uppercase text-[oklch(0.55_0.03_235)]">
                    {tx.moreAbout}
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {locale.internalLinks.map((link) => (
                      <li key={link.label}>
                        <RouteLink
                          pageKey={link.page}
                          className="font-body text-[0.95rem] font-medium text-[var(--navy-900)] underline-offset-4 hover:underline"
                        >
                          {link.label} →
                        </RouteLink>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </article>

        <section className="mobile-padding pb-20">
          <div className="container">
            <div className="mx-auto max-w-[960px] rounded-sm border border-[oklch(0.88_0.02_230)] bg-white px-8 py-10 shadow-[0_10px_40px_rgba(26,46,74,0.08)] md:flex md:items-center md:justify-between md:gap-8">
              <div className="max-w-2xl">
                <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.4rem)] font-medium text-[var(--navy-900)]">
                  {tx.ctaTitle}
                </h2>
                <p className="mt-3 font-body text-[0.95rem] leading-7 text-[oklch(0.40_0.04_235)]">
                  {tx.ctaText}
                </p>
              </div>
              <div className="mt-6 flex flex-col items-start gap-3 md:mt-0 md:items-end">
                <a
                  href={getLocalizedPath(lang, "contact")}
                  className="btn-pill btn-pill-navy inline-flex items-center gap-2"
                >
                  {tx.ctaButton}
                </a>
                <RouteLink
                  pageKey="home"
                  className="font-body text-[0.85rem] text-[oklch(0.45_0.04_235)] underline-offset-4 hover:underline"
                >
                  {tx.ctaHome}
                </RouteLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
