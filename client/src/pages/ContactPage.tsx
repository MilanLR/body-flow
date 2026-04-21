import { useLocation } from "wouter";

import { getPageContent } from "@/content/pageContent";
import { useLang } from "@/i18n/LangContext";
import { Contact } from "@/sections/Contact";

import { SeoPage, SeoPageSection } from "./SeoPage";

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
    >
      {page.sections.map((section) => (
        <SeoPageSection key={section.title} {...section} />
      ))}
      <Contact />
    </SeoPage>
  );
}
