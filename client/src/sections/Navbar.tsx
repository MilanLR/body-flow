import { useState, useEffect } from "react";
import { useLocation } from "wouter";

import { RouteLink } from "@/components/RouteLink";
import { getBlogFromPath } from "@/content/blog/registry";
import { useLang } from "@/i18n/LangContext";
import { type PageKey } from "@/lib/routes";
import { BodyFlowLogo } from "./BodyFlowLogo";

export function Navbar() {
  const { t, pageKey } = useLang();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const tx = t.nav;
  const isBlogPage = getBlogFromPath(location) !== null;
  const isTranslucentHeader = scrolled || pageKey !== "home" || isBlogPage;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: tx.treatment, pageKey: "treatment" },
    { label: tx.costs, pageKey: "costs" },
    { label: tx.whoItsFor, pageKey: "whoItsFor" },
    { label: tx.science, pageKey: "science" },
    { label: tx.contact, pageKey: "contact" },
  ] satisfies Array<{ label: string; pageKey: PageKey }>;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-[400ms] ease-in-out"
      style={{
        background: isTranslucentHeader ? "rgba(18, 32, 54, 0.45)" : "transparent",
        backdropFilter: isTranslucentHeader ? "blur(16px)" : "none",
        WebkitBackdropFilter: isTranslucentHeader ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.25)" : "none",
        padding: scrolled ? "0.75rem 0" : "1.25rem 0",
      }}
    >
      <div className="container flex items-center justify-between">
        <RouteLink pageKey="home" className="no-underline">
          <BodyFlowLogo white />
        </RouteLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <RouteLink
              key={link.pageKey}
              pageKey={link.pageKey}
              data-ga-category="navigation"
              data-ga-name="nav_link_click"
              data-ga-label={link.label}
              data-ga-location="navbar"
              className="font-body text-[0.8rem] font-medium tracking-[0.06em] no-underline text-white/90 hover:text-white transition-opacity duration-200"
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {link.label}
            </RouteLink>
          ))}
          <RouteLink
            pageKey="contact"
            data-ga-category="cta"
            data-ga-name="book_intake_click"
            data-ga-label={tx.boek}
            data-ga-location="navbar"
            className="btn-pill text-white border-white/70 hover:border-white hover:bg-white/10"
            style={{
              fontSize: "0.7rem",
              padding: "0.6rem 1.5rem",
            }}
          >
            {tx.boek}
          </RouteLink>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden bg-transparent border-none p-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ga-category="navigation"
            data-ga-name="mobile_menu_toggle"
            data-ga-location="navbar"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-[5px]">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-6 h-0.5 rounded-sm bg-white transition-all duration-300"
                />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="mt-3 py-7 border-t border-white/10 transition-all duration-300"
          style={{
            background: isTranslucentHeader ? "transparent" : "rgba(18, 32, 54, 0.45)",
            backdropFilter: isTranslucentHeader ? "none" : "blur(16px)",
            WebkitBackdropFilter: isTranslucentHeader ? "none" : "blur(16px)",
          }}
        >
          <div className="container flex flex-col gap-4">
            {navLinks.map((link) => (
              <RouteLink
                key={link.pageKey}
                pageKey={link.pageKey}
                onClick={() => setMenuOpen(false)}
                data-ga-category="navigation"
                data-ga-name="mobile_nav_link_click"
                data-ga-label={link.label}
                data-ga-location="navbar_mobile"
                className="font-body text-[0.95rem] font-medium no-underline text-white hover:text-white/80 transition-colors py-1"
              >
                {link.label}
              </RouteLink>
            ))}
            <RouteLink
              pageKey="contact"
              onClick={() => setMenuOpen(false)}
              data-ga-category="cta"
              data-ga-name="book_intake_click"
              data-ga-label={tx.boek}
              data-ga-location="navbar_mobile"
              className="btn-pill text-white border-white hover:bg-white/15 self-start mt-2 text-xs py-2 px-5"
            >
              {tx.boek}
            </RouteLink>
          </div>
        </div>
      )}
    </nav>
  );
}
