import { useLang } from "@/i18n/LangContext";
import { HERO_BG } from "./constants";

export function Hero() {
  const { t } = useLang();
  const tx = t.hero;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
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

      <div className="hero-content relative z-[2] text-center px-6 max-w-[900px]">
        <h1
          className="font-display text-[clamp(2rem,8vw,5.5rem)] font-light text-white tracking-[0.08em] leading-[1.1] mb-6 uppercase animate-fade-in-up"
        >
          {tx.title}
        </h1>
        <p
          className="font-body text-[clamp(1rem,2vw,1.2rem)] font-light leading-[1.7] mb-12 mx-auto max-w-[580px] animate-fade-in-up animate-delay-200 hero-subtitle"
          style={{ color: "rgba(255,255,255,0.88)" }}
        >
          {tx.subtitle}
        </p>
        <div className="animate-fade-in-up animate-delay-400">
          <a href="#pakketten" className="btn-pill btn-pill-white">
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
