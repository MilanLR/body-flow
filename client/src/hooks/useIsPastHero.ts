import { useEffect, useState } from "react";
import { useLocation } from "wouter";

/**
 * True zodra de hero-sectie uit beeld is (of als de pagina geen hero heeft).
 * Wordt gebruikt om de taalwisselaar op mobiel van de zwevende knop naar de
 * navigatiebalk te verplaatsen.
 */
export function useIsPastHero(offset = 80) {
  const [location] = useLocation();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("hero");
      setPastHero(!hero || hero.getBoundingClientRect().bottom < offset);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [location, offset]);

  return pastHero;
}
