# Home Page Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Split the 1,601-line Home.tsx monolith into maintainable section components, extract translations to JSON, convert inline styles to Tailwind, and wire the contact form to Web3Forms.

**Architecture:** Section-per-file under `client/src/sections/`, translations in `client/src/i18n/` as JSON files consumed via React Context, inline styles replaced with Tailwind utility classes using CSS custom properties already defined in `index.css`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Zod, react-hook-form, Web3Forms API

---

### Task 1: Create .env file with Web3Forms key

**Files:**
- Create: `.env`

**Step 1: Create the .env file**

```
VITE_WEB3FORMS_KEY=4369b581-fd4a-4dbc-88a7-9d9a3a921854
```

**Step 2: Add .env to .gitignore if not already there**

Check `.gitignore` for `.env` entry. Add it if missing.

---

### Task 2: Extract translations to JSON files

**Files:**
- Create: `client/src/i18n/nl.json`
- Create: `client/src/i18n/en.json`

**Step 1: Create `nl.json`**

Extract the `t.nl` object from `Home.tsx:37-240` into `client/src/i18n/nl.json`. Keep the exact same structure and values. This is a direct copy of the object contents.

**Step 2: Create `en.json`**

Extract the `t.en` object from `Home.tsx:241-444` into `client/src/i18n/en.json`. Same structure as `nl.json` with English values.

**Step 3: Verify both files are valid JSON**

Run: `node -e "require('./client/src/i18n/nl.json'); require('./client/src/i18n/en.json'); console.log('OK')"`

---

### Task 3: Create LangContext

**Files:**
- Create: `client/src/i18n/LangContext.tsx`

**Step 1: Create the context file**

```tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import nl from "./nl.json";
import en from "./en.json";

export type Lang = "nl" | "en";

type Translations = typeof nl;

const translations: Record<Lang, Translations> = { nl, en };

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("nl");
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
```

---

### Task 4: Extract useInView hook

**Files:**
- Create: `client/src/hooks/useInView.ts`

**Step 1: Create the hook file**

Extract the `useInView` function from `Home.tsx:17-31` into its own file:

```ts
import { useState, useEffect, useRef } from "react";

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}
```

---

### Task 5: Move embedded styles to index.css

**Files:**
- Modify: `client/src/index.css`

**Step 1: Add the responsive/mobile styles**

Move the entire `<style>` block from `Home.tsx:1430-1587` into `index.css` at the end of `@layer components`. This includes:
- All `@media (max-width: 768px)` rules (`.responsive-grid`, `.mobile-padding`, `.mobile-form-grid`, etc.)
- The `@media (min-width: 769px)` rules
- The `.intake-icons-grid`, `.intake-icon-item`, `.intake-icon-circle`, `.intake-icon-label`, `.intake-price-text` styles
- The Manus badge hide rules

Do NOT duplicate any styles already in `index.css`.

---

### Task 6: Create shared constants file for images

**Files:**
- Create: `client/src/sections/constants.ts`

**Step 1: Create the constants file**

```ts
export const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663298280686/Sf6ssfRDLMCQonDWzyrzh7/hero-bg-HmsnhVnUjSPEVQXo3Pti9u.webp";
export const EECP_THERAPY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663298280686/Sf6ssfRDLMCQonDWzyrzh7/eecp-therapy-VpfLnvTXXmi5yzsMDsHJVL.webp";
export const HEART_HEALTH = "https://d2xsxph8kpxj0f.cloudfront.net/310519663298280686/Sf6ssfRDLMCQonDWzyrzh7/heart-health-Nt5b8X49SrKsB9JXQBQCVS.webp";
export const VITALITY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663298280686/Sf6ssfRDLMCQonDWzyrzh7/vitality-39GcfBFreDwU2fSGSd7ZuQ.webp";
```

---

### Task 7: Extract BodyFlowLogo component

**Files:**
- Create: `client/src/sections/BodyFlowLogo.tsx`

**Step 1: Create the component**

Extract `BodyFlowLogo` from `Home.tsx:448-464`. Convert inline styles to Tailwind classes. The component takes `{ white?: boolean }` and renders the logo SVG with "BodyFlow" text and "AMSTERDAM" subtitle.

Use `font-display` and `font-body` classes from index.css instead of inline fontFamily. Use CSS variables for colors where possible.

---

### Task 8: Extract Navbar section

**Files:**
- Create: `client/src/sections/Navbar.tsx`

**Step 1: Create the Navbar component**

Extract `LangSwitcher` and `Navbar` from `Home.tsx:466-610`. Import `useLang` from `@/i18n/LangContext`. Import `BodyFlowLogo` from `./BodyFlowLogo`.

Replace `{ lang, setLang }` props with `useLang()` hook. Convert inline styles to Tailwind classes. Use CSS variables like `var(--navy-800)` via Tailwind arbitrary values `[color:var(--navy-800)]` or the existing Tailwind color tokens.

The `LangSwitcher` sub-component can stay in the same file since it's only used by Navbar.

---

### Task 9: Extract Hero section

**Files:**
- Create: `client/src/sections/Hero.tsx`

**Step 1: Create the Hero component**

Extract `HeroSection` from `Home.tsx:612-696`. Import `useLang` from `@/i18n/LangContext`. Import `HERO_BG` from `./constants`.

No props needed — get translations from context. Convert inline styles to Tailwind.

---

### Task 10: Extract EECP section

**Files:**
- Create: `client/src/sections/EECP.tsx`

**Step 1: Create the EECP component**

Extract `EECPSection` from `Home.tsx:698-777`. Import `useLang`, `useInView`, `EECP_THERAPY` from their new locations.

Convert inline styles to Tailwind. The scroll animation pattern (`opacity`, `transform`, `transition` based on `inView`) can use Tailwind classes with conditional logic via `cn()`.

---

### Task 11: Extract Voordelen section

**Files:**
- Create: `client/src/sections/Voordelen.tsx`

**Step 1: Create the Voordelen component**

Extract `VoordelenSection` from `Home.tsx:779-861`. The SVG icons array stays in this file. Import `useLang`, `useInView`. Convert inline styles to Tailwind.

---

### Task 12: Extract VitalityBanner section

**Files:**
- Create: `client/src/sections/VitalityBanner.tsx`

**Step 1: Create the VitalityBanner component**

Extract `VitalityBanner` from `Home.tsx:863-884`. Import `useLang`, `VITALITY`. Convert inline styles to Tailwind.

---

### Task 13: Extract Traject section

**Files:**
- Create: `client/src/sections/Traject.tsx`

**Step 1: Create the Traject component**

Extract `TrajectSection` from `Home.tsx:886-938`. Import `useLang`, `useInView`. Convert inline styles to Tailwind.

---

### Task 14: Extract Pakketten section

**Files:**
- Create: `client/src/sections/Pakketten.tsx`

**Step 1: Create the Pakketten component**

Extract `PakkettenSection` from `Home.tsx:940-1062`. Import `useLang`, `useInView`. Convert inline styles to Tailwind. This is the largest section with intake card, icons grid, and package cards.

---

### Task 15: Extract Prijslijst section

**Files:**
- Create: `client/src/sections/Prijslijst.tsx`

**Step 1: Create the Prijslijst component**

Extract `PrijslijstSection` from `Home.tsx:1064-1111`. Import `useLang`, `useInView`. Convert inline styles to Tailwind.

---

### Task 16: Extract Contact section with Web3Forms

**Files:**
- Create: `client/src/sections/Contact.tsx`

**Step 1: Create the Contact component with react-hook-form + zod + Web3Forms**

Extract `ContactSection` from `Home.tsx:1113-1280`. Rewrite the form to use:

- **Zod schema:**
```ts
import { z } from "zod";

export const contactSchema = z.object({
  voornaam: z.string().min(1),
  achternaam: z.string().min(1),
  telefoon: z.string().optional(),
  email: z.string().email(),
  contactvoorkeur: z.enum(["telefoon", "email"]),
  opmerkingen: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;
```

- **react-hook-form** with `useForm<ContactFormData>` and `zodResolver(contactSchema)`
- **Web3Forms submission:**
```ts
const onSubmit = async (data: ContactFormData) => {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: import.meta.env.VITE_WEB3FORMS_KEY,
      ...data,
    }),
  });
  if (!res.ok) throw new Error("Failed to submit");
};
```

- **Sonner** toast for success/error feedback
- Loading state on submit button
- Convert inline styles to Tailwind

---

### Task 17: Extract Footer section

**Files:**
- Create: `client/src/sections/Footer.tsx`

**Step 1: Create the Footer component**

Extract `Footer` from `Home.tsx:1282-1327`. Import `useLang`, `BodyFlowLogo`. Convert inline styles to Tailwind.

---

### Task 18: Extract FloatingLangSwitcher

**Files:**
- Create: `client/src/sections/FloatingLangSwitcher.tsx`

**Step 1: Create the FloatingLangSwitcher component**

Extract `FloatingLangSwitcher` and `DARK_SECTIONS` from `Home.tsx:1329-1422`. Import `useLang`. Uses its own IntersectionObserver (not `useInView`). Convert inline styles to Tailwind.

---

### Task 19: Rewrite Home.tsx as composition root

**Files:**
- Modify: `client/src/pages/Home.tsx`

**Step 1: Rewrite Home.tsx**

Replace the entire 1,601-line file with a clean composition:

```tsx
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
```

---

### Task 20: Verify the app builds and renders correctly

**Step 1: Run type check**

Run: `cd /home/milan/Documents/scouting/bodyflow/bodyflow-amsterdam && npx tsc --noEmit`
Expected: No errors

**Step 2: Run dev server and verify**

Run: `pnpm dev`
Check that all sections render, language switching works, contact form submits to Web3Forms.

---

### Task 21: Commit the refactor

**Step 1: Stage and commit**

```bash
git add client/src/i18n/ client/src/sections/ client/src/hooks/useInView.ts client/src/pages/Home.tsx client/src/index.css .env .gitignore
git commit -m "refactor: split Home.tsx monolith into section components

- Extract 12 section components to client/src/sections/
- Extract translations to client/src/i18n/ as JSON files
- Add LangContext for language state management
- Move inline styles to Tailwind classes
- Move embedded <style> media queries to index.css
- Wire contact form to Web3Forms with react-hook-form + zod
- Extract useInView hook to client/src/hooks/

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```
