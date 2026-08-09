// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";

import { getAnalyticsConfig, initAnalytics } from "./analytics";

afterEach(() => {
  document.head.innerHTML = "";
});

describe("analytics", () => {
  it("returns null when analytics env is incomplete or empty", () => {
    expect(
      getAnalyticsConfig({ VITE_ANALYTICS_ENDPOINT: "https://stats.example.com" })
    ).toBeNull();
    expect(
      getAnalyticsConfig({ VITE_ANALYTICS_WEBSITE_ID: "site-id" })
    ).toBeNull();
    expect(getAnalyticsConfig({})).toBeNull();
  });

  it("injects a single umami script when env is complete", () => {
    const res = initAnalytics({
      VITE_ANALYTICS_ENDPOINT: "https://stats.example.com/",
      VITE_ANALYTICS_WEBSITE_ID: "site-id",
    });

    const script = Array.isArray(res) ? res[0] : res;
    expect(script?.getAttribute("src")).toBe("https://stats.example.com/umami");
    expect(script?.dataset.websiteId).toBe("site-id");
    expect(
      document.head.querySelectorAll('script[data-analytics="umami"]')
    ).toHaveLength(1);

    initAnalytics({
      VITE_ANALYTICS_ENDPOINT: "https://stats.example.com/",
      VITE_ANALYTICS_WEBSITE_ID: "site-id",
    });

    expect(
      document.head.querySelectorAll('script[data-analytics="umami"]')
    ).toHaveLength(1);
  });

  it("injects Google Analytics 4 (GA4) script when measurement ID is provided", () => {
    const res = initAnalytics({
      VITE_GA_MEASUREMENT_ID: "G-TEST123456",
    });

    const script = Array.isArray(res) ? res[0] : res;
    expect(script?.getAttribute("src")).toBe(
      "https://www.googletagmanager.com/gtag/js?id=G-TEST123456"
    );

    const gaScript = document.head.querySelector<HTMLScriptElement>(
      'script[data-analytics="ga4"]'
    );
    const initScript = document.head.querySelector<HTMLScriptElement>(
      'script[data-analytics="ga4-init"]'
    );

    expect(gaScript).not.toBeNull();
    expect(initScript).not.toBeNull();
    expect(initScript?.textContent).toContain("G-TEST123456");

    // Deduplication test
    initAnalytics({
      VITE_GA_MEASUREMENT_ID: "G-TEST123456",
    });

    expect(
      document.head.querySelectorAll('script[data-analytics="ga4"]')
    ).toHaveLength(1);
  });
});
