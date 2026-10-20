import { useLocation } from "wouter";

import { getPageContent } from "@/content/pageContent";
import { useLang } from "@/i18n/LangContext";
import { Contact, ContactFormCard } from "@/sections/Contact";

import { SeoPage } from "./SeoPage";

export default function ContactPage() {
  const { lang, t } = useLang();
  const [pathname] = useLocation();
  const page = getPageContent(lang, "contact");

  return (
    <SeoPage
      seoTitle={t.seo.pages.contact.title}
      title={page.title}
      intro={page.intro}
      pathname={pathname}
      headerExtra={
        page.sections.length > 0 ? (
          <div className="mt-12 space-y-10">
            {page.sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-[clamp(1.9rem,4vw,2.6rem)] font-medium text-[var(--navy-900)]">
                  {section.title}
                </h2>
                <p className="mt-5 font-body text-[0.98rem] leading-8 text-[oklch(0.40_0.04_235)]">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        ) : undefined
      }
      headerAside={<ContactFormCard />}
    >
      <Contact hideForm />
    </SeoPage>
  );
}
