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
  const useDarkTopState = scrolled || pageKey !== "home" || isBlogPage;

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
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled
          ? "0 1px 20px rgba(26,46,74,0.08)"
          : "none",
        padding: scrolled ? "0.75rem 0" : "1.25rem 0",
      }}
    >
      <div className="container flex items-center justify-between">
        <RouteLink pageKey="home" className="no-underline">
          <BodyFlowLogo white={!useDarkTopState} />
        </RouteLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <RouteLink
              key={link.pageKey}
              pageKey={link.pageKey}
              className="font-body text-[0.8rem] font-medium tracking-[0.06em] no-underline transition-opacity duration-200"
              style={{
                color: useDarkTopState
                  ? "var(--navy-800)"
                  : "rgba(255,255,255,0.9)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.opacity = "0.7")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.opacity = "1")
              }
            >
              {link.label}
            </RouteLink>
          ))}
          <RouteLink
            pageKey="contact"
            className="btn-pill"
            style={{
              color: useDarkTopState ? "var(--navy-800)" : "white",
              borderColor: useDarkTopState
                ? "var(--navy-800)"
                : "rgba(255,255,255,0.7)",
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
            className="md:hidden bg-transparent border-none p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="flex flex-col gap-[5px]">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-6 h-0.5 rounded-sm transition-all duration-300"
                  style={{
                    background: useDarkTopState
                      ? "var(--navy-800)"
                      : "white",
                  }}
                />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="bg-[var(--navy-900)] py-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] border-t border-white/10">
          <div className="container flex flex-col gap-4">
            {navLinks.map((link) => (
              <RouteLink
                key={link.pageKey}
                pageKey={link.pageKey}
                onClick={() => setMenuOpen(false)}
                className="font-body text-[0.95rem] font-medium no-underline text-white/90 hover:text-white transition-colors py-1"
              >
                {link.label}
              </RouteLink>
            ))}
            <RouteLink
              pageKey="contact"
              onClick={() => setMenuOpen(false)}
              className="btn-pill text-white border-white hover:bg-white/15 self-start mt-2"
            >
              {tx.boek}
            </RouteLink>
          </div>
        </div>
      )}
    </nav>
  );
}
