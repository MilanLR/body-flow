import { describe, expect, it } from "vitest";

import en from "@/i18n/en.json";
import nl from "@/i18n/nl.json";

import {
  DEFAULT_LANG,
  LOCALIZED_ROUTES,
  PAGE_KEYS,
  getLangFromPath,
  getLocalizedPath,
  getPageFromPath,
  getAlternateLanguagePath,
} from "./routes";

describe("localized routes", () => {
  it("maps Dutch and English page keys to stable SEO paths", () => {
    expect(getLocalizedPath("nl", "home")).toBe("/nl/");
    expect(getLocalizedPath("nl", "costs")).toBe("/nl/kosten");
    expect(getLocalizedPath("en", "costs")).toBe("/en/costs");
    expect(getLocalizedPath("en", "treatment")).toBe("/en/eecp-therapy");
  });

  it("derives page identity from route paths", () => {
    expect(getPageFromPath("/nl/voor-wie")).toEqual({ lang: "nl", pageKey: "whoItsFor" });
    expect(getPageFromPath("/en/contact")).toEqual({ lang: "en", pageKey: "contact" });
  });

  it("infers the language prefix for unknown localized paths", () => {
    expect(getLangFromPath("/en/not-a-real-page")).toBe("en");
    expect(getLangFromPath("/nl/not-a-real-page")).toBe("nl");
    expect(getLangFromPath("/not-a-real-page")).toBe("nl");
  });

  it("swaps to the equivalent page in the other language", () => {
    expect(getAlternateLanguagePath("/nl/kosten", "en")).toBe("/en/costs");
    expect(getAlternateLanguagePath("/en/eecp-therapy", "nl")).toBe("/nl/eecp-therapie");
  });

  it("exposes the Dutch default language for root routing", () => {
    expect(DEFAULT_LANG).toBe("nl");
    expect(PAGE_KEYS).toContain("home");
  });

  it("keeps localized route entries aligned with the full page key set", () => {
    expect(LOCALIZED_ROUTES.map((route) => route.pageKey)).toEqual(PAGE_KEYS);
  });

  it("keeps the page-level i18n schema aligned with route keys", () => {
    expect(Object.keys(nl.seo.pages)).toEqual(PAGE_KEYS);
    expect(Object.keys(en.seo.pages)).toEqual(PAGE_KEYS);
    expect(Object.keys(nl.pageCtas)).toEqual(PAGE_KEYS);
    expect(Object.keys(en.pageCtas)).toEqual(PAGE_KEYS);
    expect(Object.keys(nl.focusedPages)).toEqual(PAGE_KEYS.filter((key) => key !== "home"));
    expect(Object.keys(en.focusedPages)).toEqual(PAGE_KEYS.filter((key) => key !== "home"));
  });
});
