import { useEffect } from "react";
import { useLocation } from "wouter";

import { SeoHead } from "@/components/SeoHead";
import { useLang } from "@/i18n/LangContext";
import Home from "@/pages/Home";
import { FloatingLangSwitcher } from "@/sections/FloatingLangSwitcher";
import { Footer } from "@/sections/Footer";
import { Navbar } from "@/sections/Navbar";
import { scrollToHashTarget } from "./homeHashScroll";

export default function LocalizedHomePage() {
  const { t } = useLang();
  const [pathname] = useLocation();

  useEffect(() => {
    const runHashScroll = () => {
      scrollToHashTarget(document, window.location.hash);
    };

    const frame = window.requestAnimationFrame(runHashScroll);
    window.addEventListener("hashchange", runHashScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", runHashScroll);
    };
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <SeoHead
        title={t.seo.pages.home.title}
        description={t.seo.pages.home.description}
        pathname={pathname}
      />
      <FloatingLangSwitcher />
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}
