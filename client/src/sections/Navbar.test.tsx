import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";

import { LangProvider, createLangContextValue } from "@/i18n/LangContext";

import { Navbar } from "./Navbar";

function renderNavbar(lang: "nl" | "en", pageKey: "home" | "costs") {
  return renderToStaticMarkup(
    <Router ssrPath={lang === "nl" ? "/nl/" : "/en/"}>
      <LangProvider value={createLangContextValue(lang, pageKey, () => {})}>
        <Navbar />
      </LangProvider>
    </Router>,
  );
}

describe("Navbar", () => {
  it("links the logo to the localized homepage", () => {
    const html = renderNavbar("nl", "costs");

    expect(html).toContain('href="/nl/"');
  });

  it("does not render a language switcher in the top bar", () => {
    const html = renderNavbar("en", "home");

    expect(html).not.toContain(">nl</button>");
    expect(html).not.toContain(">en</button>");
  });

  it("renders dark header styling at the top on non-home pages", () => {
    const html = renderNavbar("en", "costs");

    expect(html).toContain("brightness(0) saturate(100%)");
    expect(html).toContain("color:var(--navy-800)");
  });

  it("uses localized page routes as its primary navigation model", () => {
    const html = renderNavbar("en", "home");

    expect(html).toContain('href="/en/eecp-therapy"');
    expect(html).toContain('href="/en/costs"');
    expect(html).toContain('href="/en/who-its-for"');
    expect(html).toContain('href="/en/contact"');
    expect(html).not.toContain('href="/en/amsterdam"');
    expect(html).not.toContain('href="#eecp"');
    expect(html).not.toContain('href="#contact"');
  });
});
