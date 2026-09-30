import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LangProvider, createLangContextValue } from "@/i18n/LangContext";

import { EECP } from "./EECP";

function renderEECP(lang: "nl" | "en" = "nl") {
  return renderToStaticMarkup(
    <LangProvider value={createLangContextValue(lang, "home", () => {})}>
      <EECP />
    </LangProvider>,
  );
}

describe("EECP section image positioning", () => {
  it("renders EECP therapy image with object-bottom positioning class", () => {
    const html = renderEECP("nl");

    expect(html).toContain('src="/images/eecp-therapy.webp"');
    expect(html).toMatch(/<img[^>]*src="\/images\/eecp-therapy\.webp"[^>]*class="[^"]*object-bottom[^"]*"/);
  });

  it("defines mobile object-position: bottom override for eecp-image-wrapper in index.css", () => {
    const cssPath = resolve(__dirname, "../index.css");
    const cssContent = readFileSync(cssPath, "utf-8");

    // Check that inside the responsive media query, .eecp-image-wrapper img has object-position: bottom
    expect(cssContent).toMatch(/\.eecp-image-wrapper\s+img\s*\{[^}]*object-position:\s*bottom/);
  });
});
