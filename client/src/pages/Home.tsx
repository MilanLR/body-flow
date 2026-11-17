import { Hero } from "@/sections/Hero";
import { EECP } from "@/sections/EECP";
import { Voordelen } from "@/sections/Voordelen";
import { VitalityBanner } from "@/sections/VitalityBanner";
import { Traject } from "@/sections/Traject";
import { Pakketten } from "@/sections/Pakketten";
import { Prijslijst } from "@/sections/Prijslijst";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Desktop: wrapper is onzichtbaar (display: contents), volgorde ongewijzigd.
          Mobiel: "De voordelen" komt boven "Herstel je natuurlijke circulatie". */}
      <div className="flex flex-col md:contents [&>#eecp]:max-md:order-2 [&>#eecp]:max-md:pt-16 [&>#voordelen]:max-md:order-1">
        <EECP />
        <Voordelen />
      </div>
      <VitalityBanner />
      <Traject />
      <Pakketten />
      <Prijslijst />
      <Contact />
    </main>
  );
}
