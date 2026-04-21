import { useLocation } from "wouter";

import { getPageContent } from "@/content/pageContent";
import { useLang } from "@/i18n/LangContext";
import { Pakketten } from "@/sections/Pakketten";
import { Prijslijst } from "@/sections/Prijslijst";

import { SeoPage, SeoPageSection } from "./SeoPage";

export default function CostsPage() {
  const { lang, t } = useLang();
  const [pathname] = useLocation();
  const page = getPageContent(lang, "costs");

  return (
    <SeoPage
      seoTitle={t.seo.pages.costs.title}
      title={page.title}
      intro={page.intro}
      pathname={pathname}
    >
      <Pakketten />
      <Prijslijst />
      {page.sections.map((section) => (
        <SeoPageSection key={section.title} {...section} />
      ))}
    </SeoPage>
  );
}
