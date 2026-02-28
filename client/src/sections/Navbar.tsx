import { useState, useEffect } from "react";
import { useLang, type Lang } from "@/i18n/LangContext";
import { BodyFlowLogo } from "./BodyFlowLogo";

function LangSwitcher({ scrolled }: { scrolled: boolean }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className="flex items-center gap-0.5 rounded-[20px] px-1 py-0.5"
      style={{
        border: `1px solid ${scrolled ? "var(--ocean-300)" : "rgba(255,255,255,0.4)"}`,
      }}
    >
      {(["nl", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="font-body rounded-2xl border-none text-[0.7rem] font-semibold uppercase tracking-[0.06em] transition-all duration-200"
          style={{
            background:
              lang === l
                ? scrolled
                  ? "var(--navy-800)"
                  : "rgba(255,255,255,0.2)"
                : "transparent",
            color:
              lang === l
                ? "white"
                : scrolled
                  ? "oklch(0.40 0.05 235)"
                  : "rgba(255,255,255,0.7)",
            padding: "0.2rem 0.55rem",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const tx = t.nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: tx.eecp, href: "#eecp" },
    { label: tx.voordelen, href: "#voordelen" },
    { label: tx.traject, href: "#traject" },
    { label: tx.pakketten, href: "#pakketten" },
    { label: tx.tarieven, href: "#prijslijst" },
    { label: tx.contact, href: "#contact" },
  ];

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
        <a href="#" className="no-underline">
          <BodyFlowLogo white={!scrolled} />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-[0.8rem] font-medium tracking-[0.06em] no-underline transition-opacity duration-200"
              style={{
                color: scrolled
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
            </a>
          ))}
          <a
            href="#contact"
            className="btn-pill"
            style={{
              color: scrolled ? "var(--navy-800)" : "white",
              borderColor: scrolled
                ? "var(--navy-800)"
                : "rgba(255,255,255,0.7)",
              fontSize: "0.7rem",
              padding: "0.6rem 1.5rem",
            }}
          >
            {tx.boek}
          </a>
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
                    background: scrolled
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
        <div className="bg-white py-4 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          <div className="container flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-body text-[0.9rem] font-medium no-underline text-[var(--navy-800)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-pill btn-pill-navy self-start"
            >
              {tx.boek}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
