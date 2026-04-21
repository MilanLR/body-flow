import { useLocation } from "wouter";

import { getPageContent } from "@/content/pageContent";
import { useLang } from "@/i18n/LangContext";
import { VitalityBanner } from "@/sections/VitalityBanner";

import { SeoPage, SeoPageSection } from "./SeoPage";

export default function AmsterdamPage() {
  const { lang, t } = useLang();
  const [pathname] = useLocation();
  const page = getPageContent(lang, "amsterdam");

  return (
    <SeoPage
      seoTitle={t.seo.pages.amsterdam.title}
      title={page.title}
      intro={page.intro}
      pathname={pathname}
    >
      <VitalityBanner />
      {page.sections.map((section) => (
        <SeoPageSection key={section.title} {...section} />
      ))}
    </SeoPage>
  );
}
