import { useLang } from "@/i18n/LangContext";
import { RouteLink } from "@/components/RouteLink";
import { getBlogIndexPath } from "@/content/blog/registry";
import type { PageKey } from "@/lib/routes";
import { BodyFlowLogo } from "./BodyFlowLogo";

import { openCookieBanner } from "@/components/CookieBanner";

export function Footer() {
  const { lang, t } = useLang();
  const tx = t.footer;

  return (
    <footer className="bg-[var(--navy-900)] text-white pt-12 pb-8">
      <div className="container">
        <div className="mobile-footer-stack flex justify-between items-start flex-wrap gap-8 mb-10">
          <div>
            <RouteLink pageKey="home" className="inline-block no-underline">
              <BodyFlowLogo white />
            </RouteLink>
            <p className="font-body text-[0.8rem] text-white/55 mt-4 max-w-[240px] leading-relaxed">
              {tx.tagline}
            </p>
          </div>
          <div className="mobile-footer-nav flex gap-16 flex-wrap">
            <div>
              <h4 className="font-body text-[0.7rem] tracking-[0.15em] uppercase text-white/50 mb-4">
                {tx.nav}
              </h4>
              <div className="flex flex-col gap-2.5">
                {tx.pageLinks.map((link) => (
                  <RouteLink
                    key={link.pageKey}
                    pageKey={link.pageKey as PageKey}
                    data-ga-category="navigation"
                    data-ga-name="footer_link_click"
                    data-ga-label={link.label}
                    data-ga-location="footer"
                    className="font-body text-[0.85rem] text-white/70 no-underline hover:text-white transition-colors"
                  >
                    {link.label}
                  </RouteLink>
                ))}
                <a
                  href={getBlogIndexPath(lang)}
                  data-ga-category="navigation"
                  data-ga-name="footer_link_click"
                  data-ga-label={t.blog.footerLabel}
                  data-ga-location="footer"
                  className="font-body text-[0.85rem] text-white/70 no-underline hover:text-white transition-colors"
                >
                  {t.blog.footerLabel}
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-body text-[0.7rem] tracking-[0.15em] uppercase text-white/50 mb-4">
                {tx.contactLabel}
              </h4>
              <div className="flex flex-col gap-2.5">
                <p className="font-body text-[0.85rem] text-white/70 leading-relaxed">
                  Amsterdamseweg 487
                  <br />
                  1181 BR Amstelveen
                </p>
                <a
                  href="mailto:info@body-flow.nl"
                  data-ga-category="contact"
                  data-ga-name="footer_email_click"
                  data-ga-label="info@body-flow.nl"
                  data-ga-location="footer"
                  className="font-body text-[0.85rem] text-white/70 no-underline hover:text-white transition-colors"
                >
                  info@body-flow.nl
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex justify-between items-center flex-wrap gap-4">
          <p className="font-body text-[0.75rem] text-white/40">
            {tx.copyright}
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={openCookieBanner}
              data-ga-category="cookie_consent"
              data-ga-name="open_cookie_settings"
              data-ga-label={lang === "nl" ? "Cookie-instellingen" : "Cookie settings"}
              data-ga-location="footer"
              className="font-body text-[0.75rem] text-white/40 hover:text-white/80 transition-colors bg-transparent border-none p-0 cursor-pointer underline"
            >
              {lang === "nl" ? "Cookie-instellingen" : "Cookie settings"}
            </button>
            <p className="font-body text-[0.75rem] text-white/40">
              {tx.location}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
