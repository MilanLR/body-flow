// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";

import { getAnalyticsConfig, initAnalytics } from "./analytics";

afterEach(() => {
  document.head.innerHTML = "";
});

describe("analytics", () => {
  it("returns null when analytics env is incomplete", () => {
    expect(getAnalyticsConfig({ VITE_ANALYTICS_ENDPOINT: "https://stats.example.com" })).toBeNull();
    expect(getAnalyticsConfig({ VITE_ANALYTICS_WEBSITE_ID: "site-id" })).toBeNull();
  });

  it("injects a single umami script when env is complete", () => {
    const script = initAnalytics({
      VITE_ANALYTICS_ENDPOINT: "https://stats.example.com/",
      VITE_ANALYTICS_WEBSITE_ID: "site-id",
    });

    expect(script?.getAttribute("src")).toBe("https://stats.example.com/umami");
    expect(script?.dataset.websiteId).toBe("site-id");
    expect(document.head.querySelectorAll('script[data-analytics="umami"]')).toHaveLength(1);

    initAnalytics({
      VITE_ANALYTICS_ENDPOINT: "https://stats.example.com/",
      VITE_ANALYTICS_WEBSITE_ID: "site-id",
    });

    expect(document.head.querySelectorAll('script[data-analytics="umami"]')).toHaveLength(1);
  });
});
