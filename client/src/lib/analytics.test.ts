// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  getAnalyticsConfig,
  initAnalytics,
  trackEvent,
  getTimeOnPageSeconds,
  resetPageLoadTimestamp,
} from "./analytics";

beforeEach(() => {
  document.head.innerHTML = "";
  (window as any).gtag = undefined;
  resetPageLoadTimestamp();
});

afterEach(() => {
  document.head.innerHTML = "";
  vi.restoreAllMocks();
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
  });

  it("tracks categorized GA events with time_on_page_seconds metric", () => {
    let capturedEventName: string = "";
    let capturedPayload: any = null;

    (window as any).gtag = (command: string, name: string, payload: any) => {
      if (command === "event") {
        capturedEventName = name;
        capturedPayload = payload;
      }
    };

    trackEvent({
      category: "cta",
      name: "book_intake_click",
      label: "Boek intake",
      location: "navbar",
    });

    expect(capturedEventName).toBe("book_intake_click");
    expect(capturedPayload.event_category).toBe("cta");
    expect(capturedPayload.event_label).toBe("Boek intake");
    expect(capturedPayload.click_location).toBe("navbar");
    expect(typeof capturedPayload.time_on_page_seconds).toBe("number");
  });
});
