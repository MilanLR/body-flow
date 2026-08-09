import { useLocation } from "wouter";

import { getPageContent } from "@/content/pageContent";
import { useLang } from "@/i18n/LangContext";

import { SeoPage, SeoPageSection } from "./SeoPage";

export default function PrivacyPage() {
  const { lang, t } = useLang();
  const [pathname] = useLocation();
  const page = getPageContent(lang, "privacy");

  return (
    <SeoPage
      seoTitle={t.seo.pages.privacy.title}
      title={page.title}
      intro={page.intro}
      pathname={pathname}
    >
      {page.sections.map((section) => (
        <SeoPageSection key={section.title} {...section} />
      ))}
    </SeoPage>
  );
}
