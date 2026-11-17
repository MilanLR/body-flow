import { useLang } from "@/i18n/LangContext";
import { HERO_BG } from "./constants";

export function Hero() {
  const { t } = useLang();
  const tx = t.hero;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden max-md:pb-3"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,30,55,0.55) 0%, rgba(10,25,50,0.65) 100%)",
        }}
      />

      <div className="hero-content relative z-[2] text-center px-6 max-w-[1100px]">
        <p
          className="font-display text-[clamp(1.6rem,4.6vw,3.6rem)] max-md:text-[clamp(1.3rem,calc((100vw-4.5rem)/12),1.75rem)] max-md:tracking-[0.03em] max-md:font-normal font-light text-white tracking-[0.08em] leading-[1.15] mb-6 max-md:mb-11 uppercase text-balance mx-auto animate-fade-in-up"
        >
          {/* Mobiel: vaste omgekeerde piramide over 3 regels; desktop loopt gewoon door. */}
          {tx.titleLines.map((line, i) => (
            <span key={line} className="max-md:block">
              {line}
              {i < tx.titleLines.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
        <h1
          className="font-body text-[clamp(1rem,2vw,1.2rem)] font-light leading-[1.7] mb-12 mx-auto max-w-[580px] animate-fade-in-up animate-delay-200 hero-subtitle"
          style={{ color: "rgba(255,255,255,0.88)" }}
        >
          {tx.subtitle}
        </h1>
        <div className="animate-fade-in-up animate-delay-400">
          <a
            href="#eecp"
            onClick={(e) => {
              // Mobiel: de voordelen staan direct onder de hero, dus daar scrollen we heen.
              if (window.matchMedia("(max-width: 767px)").matches) {
                const target = document.getElementById("voordelen");
                if (target) {
                  e.preventDefault();
                  // De vaste navigatiebalk (88px) dekt de bovenkant af; de sectie heeft
                  // zelf 48px ruimte erboven, dus 56px terug laat "De voordelen" vrij staan.
                  window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - 56,
                    behavior: "smooth",
                  });
                }
              }
            }}
            data-ga-category="cta"
            data-ga-name="discover_more_click"
            data-ga-label={tx.cta}
            data-ga-location="hero"
            className="btn-pill btn-pill-white"
          >
            {tx.cta}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="font-body text-[0.65rem] tracking-[0.15em] text-white uppercase">
          {tx.scroll}
        </span>
        <div
          className="w-px h-10"
          style={{
            background: "rgba(255,255,255,0.5)",
            animation: "pulse 2s infinite",
          }}
        />
      </div>
    </section>
  );
}
