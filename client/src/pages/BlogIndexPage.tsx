import { useLocation } from "wouter";

import { SeoCta } from "@/components/SeoCta";
import { SeoHead } from "@/components/SeoHead";
import { getBlogPostPath, getSortedBlogPosts } from "@/content/blog/registry";
import { useLang } from "@/i18n/LangContext";
import { formatBlogDate } from "@/lib/blogDate";
import { FloatingLangSwitcher } from "@/sections/FloatingLangSwitcher";
import { Footer } from "@/sections/Footer";
import { Navbar } from "@/sections/Navbar";

export default function BlogIndexPage() {
  const { lang, t } = useLang();
  const [pathname] = useLocation();
  const tx = t.blog;
  const posts = getSortedBlogPosts();

  return (
    <div className="min-h-screen">
      <SeoHead
        title={t.seo.pages.blog.title}
        description={t.seo.pages.blog.description}
        pathname={pathname}
      />
      <FloatingLangSwitcher />
      <Navbar />
      <main className="bg-[var(--lighter-blue)] pt-24">
        <section className="mobile-padding py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-[960px]">
              <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.05] text-[var(--navy-900)]">
                {tx.indexTitle}
              </h1>
              <p className="mt-6 max-w-3xl font-body text-lg leading-8 text-[oklch(0.38_0.04_235)]">
                {tx.indexIntro}
              </p>

              <div className="mt-10 space-y-6">
                {posts.map((post) => {
                  const locale = post.locales[lang];

                  return (
                    <a
                      key={post.key}
                      href={getBlogPostPath(lang, post)}
                      className="block rounded-sm border border-[oklch(0.88_0.02_230)] bg-white px-8 py-8 no-underline shadow-[0_4px_20px_rgba(26,46,74,0.05)] transition-shadow hover:shadow-[0_10px_40px_rgba(26,46,74,0.12)]"
                    >
                      <p className="font-body text-[0.75rem] tracking-[0.12em] uppercase text-[oklch(0.55_0.03_235)]">
                        {formatBlogDate(post.datePublished, lang)}
                      </p>
                      <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2rem)] font-medium text-[var(--navy-900)]">
                        {locale.title}
                      </h2>
                      <p className="mt-3 font-body text-[0.95rem] leading-7 text-[oklch(0.40_0.04_235)]">
                        {locale.seoDescription}
                      </p>
                      <span className="mt-4 inline-block font-body text-[0.85rem] font-medium text-[var(--navy-900)]">
                        {tx.readPost} →
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <SeoCta />
      </main>
      <Footer />
    </div>
  );
}
