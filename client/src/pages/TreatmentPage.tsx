import { useLocation } from "wouter";

import { getPageContent } from "@/content/pageContent";
import { useLang } from "@/i18n/LangContext";
import { EECP } from "@/sections/EECP";
import { Traject } from "@/sections/Traject";
import { Voordelen } from "@/sections/Voordelen";

import { SeoPage, SeoPageSection } from "./SeoPage";

export default function TreatmentPage() {
  const { lang, t } = useLang();
  const [pathname] = useLocation();
  const page = getPageContent(lang, "treatment");

  return (
    <SeoPage
      seoTitle={t.seo.pages.treatment.title}
      title={page.title}
      intro={page.intro}
      pathname={pathname}
    >
      <EECP />
      <Voordelen />
      <Traject />
      {page.sections.map((section) => (
        <SeoPageSection key={section.title} {...section} />
      ))}
    </SeoPage>
  );
}
