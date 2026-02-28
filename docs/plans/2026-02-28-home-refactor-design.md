# Home Page Refactor Design

**Date**: 2026-02-28
**Goal**: Split the 1,601-line Home.tsx monolith into maintainable components, clean up inline styles, extract translations, and wire up the contact form.

## File Structure

```
client/src/
├── i18n/
│   ├── nl.json              # Dutch translations
│   ├── en.json              # English translations
│   └── LangContext.tsx      # React Context + useLang() hook
├── sections/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── EECP.tsx
│   ├── Voordelen.tsx
│   ├── VitalityBanner.tsx
│   ├── Traject.tsx
│   ├── Pakketten.tsx
│   ├── Prijslijst.tsx
│   ├── Contact.tsx          # react-hook-form + zod + Web3Forms
│   ├── Footer.tsx
│   └── FloatingLangSwitcher.tsx
├── pages/
│   └── Home.tsx             # ~30 lines, composes sections
├── hooks/
│   └── useInView.ts         # Extracted from Home.tsx
```

## Translations

- Extract the ~400-line `t` object into `nl.json` and `en.json`
- `LangContext.tsx` provides `LangProvider` and `useLang()` hook
- `useLang()` returns `{ lang, setLang, t }` where `t` is the current language's translations
- `LangProvider` wraps the app in `Home.tsx`, manages `lang` state

## Styling

- Define oklch color palette as CSS custom properties in `index.css` under `@theme`
- Convert all inline `style={{}}` objects to Tailwind utility classes
- Move the embedded `<style>` tag (media queries) into `index.css`
- Remove the red test backgrounds, restore original color scheme
- Use existing `cn()` utility for conditional classes

## Contact Form

- Zod schema: voornaam (required), achternaam (required), email (required), telefoon (optional), contactvoorkeur (enum), opmerkingen (optional)
- react-hook-form with `@hookform/resolvers/zod`
- Submit to `https://api.web3forms.com/submit` using `VITE_WEB3FORMS_KEY` from `.env`
- Loading state during submission, success/error feedback via Sonner toasts
- `.env` file: `VITE_WEB3FORMS_KEY=4369b581-fd4a-4dbc-88a7-9d9a3a921854`

## What Stays the Same

- All visual design, layout, animations, section ordering
- CDN image URLs
- `useInView` scroll animation pattern
- Wouter routing in App.tsx
- All existing UI components in `components/ui/`

## Decisions

- **Approach A (sections/)** chosen over feature-folders — flat structure suits a single-page marketing site
- **Tailwind classes** over CSS Modules — consistent with existing UI component library
- **Separate JSON files** for translations — no new library dependencies, easy content editing
- **Web3Forms** for contact form submission — user-specified, no backend changes needed
