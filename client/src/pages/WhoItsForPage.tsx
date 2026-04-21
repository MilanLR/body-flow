import { useLocation } from "wouter";

import { getPageContent } from "@/content/pageContent";
import { useLang } from "@/i18n/LangContext";
import { Voordelen } from "@/sections/Voordelen";

import { SeoPage, SeoPageSection } from "./SeoPage";

export default function WhoItsForPage() {
  const { lang, t } = useLang();
  const [pathname] = useLocation();
  const page = getPageContent(lang, "whoItsFor");

  return (
    <SeoPage
      seoTitle={t.seo.pages.whoItsFor.title}
      title={page.title}
      intro={page.intro}
      pathname={pathname}
    >
      <Voordelen />
      {page.sections.map((section) => (
        <SeoPageSection key={section.title} {...section} />
      ))}
    </SeoPage>
  );
}
