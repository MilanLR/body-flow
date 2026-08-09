import { useEffect, useState } from "react";
import { RouteLink } from "@/components/RouteLink";
import { useLang } from "@/i18n/LangContext";

import { trackEvent } from "@/lib/analytics";

export const COOKIE_CONSENT_KEY = "bodyflow_cookie_consent";

export function updateGaConsent(granted: boolean) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: granted ? "granted" : "denied",
    });
  }
}

export function CookieBanner() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!saved) {
      setVisible(true);
    } else {
      updateGaConsent(saved === "accepted");
    }

    const handleReopen = () => setVisible(true);
    window.addEventListener("open-cookie-banner", handleReopen);
    return () => window.removeEventListener("open-cookie-banner", handleReopen);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    updateGaConsent(true);
    trackEvent({
      category: "cookie_consent",
      name: "cookie_consent_accepted",
      label: "Accept All",
      location: "cookie_banner",
    });
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    updateGaConsent(false);
    trackEvent({
      category: "cookie_consent",
      name: "cookie_consent_declined",
      label: "Necessary Only",
      location: "cookie_banner",
    });
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  const isNl = lang === "nl";

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={isNl ? "Cookie-instellingen" : "Cookie settings"}
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[999] animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-white/95 backdrop-blur-md border border-[oklch(0.88_0.02_230)] shadow-[0_12px_40px_rgba(26,46,74,0.16)] p-6 rounded-lg flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-[var(--lighter-blue)] rounded-full text-[var(--navy-700)] shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div>
            <h3 className="font-display text-lg font-medium text-[var(--navy-900)]">
              {isNl ? "Cookie-instellingen & Privacy" : "Cookie Settings & Privacy"}
            </h3>
            <p className="font-body text-[0.82rem] text-[oklch(0.40_0.04_235)] leading-relaxed mt-1">
              {isNl
                ? "BodyFlow gebruikt functionele cookies voor een optimale werking van de website en optionele analytische cookies om onze diensten en SEO te verbeteren."
                : "BodyFlow uses functional cookies for the essential operation of the website and optional analytical cookies to improve our services and SEO."}{" "}
              <RouteLink
                pageKey="privacy"
                onClick={() => setVisible(false)}
                className="underline font-medium text-[var(--navy-800)] hover:text-[var(--ocean-600)]"
              >
                {isNl ? "Lees onze privacyverklaring" : "Read our privacy policy"}
              </RouteLink>
              .
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-1 border-t border-[oklch(0.92_0.01_230)]">
          <button
            type="button"
            onClick={handleDecline}
            className="px-4 py-2 text-xs font-body font-medium text-[var(--navy-700)] border border-[oklch(0.80_0.03_230)] rounded-full hover:bg-[oklch(0.96_0.01_230)] transition-colors"
          >
            {isNl ? "Alleen noodzakelijk" : "Necessary only"}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="btn-pill btn-pill-navy text-xs py-2 px-5"
          >
            {isNl ? "Alles accepteren" : "Accept all"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function openCookieBanner() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-cookie-banner"));
  }
}
