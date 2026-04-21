import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LangProvider, createLangContextValue } from "@/i18n/LangContext";

import { SeoCta } from "./SeoCta";

describe("SeoCta", () => {
  it("links to the localized next page from page CTA config", () => {
    const value = createLangContextValue("en", "costs", () => {});

    const html = renderToStaticMarkup(
      <LangProvider value={value}>
        <SeoCta />
      </LangProvider>,
    );

    expect(html).toContain('href="/en/contact"');
    expect(html).toContain("View more information");
  });
});
