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
      <EECP />
      <Voordelen />
      <VitalityBanner />
      <Traject />
      <Pakketten />
      <Prijslijst />
      <Contact />
    </main>
  );
}
