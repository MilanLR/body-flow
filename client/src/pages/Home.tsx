import { LangProvider } from "@/i18n/LangContext";
import { Navbar } from "@/sections/Navbar";
import { Hero } from "@/sections/Hero";
import { EECP } from "@/sections/EECP";
import { Voordelen } from "@/sections/Voordelen";
import { VitalityBanner } from "@/sections/VitalityBanner";
import { Traject } from "@/sections/Traject";
import { Pakketten } from "@/sections/Pakketten";
import { Prijslijst } from "@/sections/Prijslijst";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { FloatingLangSwitcher } from "@/sections/FloatingLangSwitcher";

export default function Home() {
  return (
    <LangProvider>
      <div className="min-h-screen">
        <FloatingLangSwitcher />
        <Navbar />
        <Hero />
        <EECP />
        <Voordelen />
        <VitalityBanner />
        <Traject />
        <Pakketten />
        <Prijslijst />
        <Contact />
        <Footer />
      </div>
    </LangProvider>
  );
}
