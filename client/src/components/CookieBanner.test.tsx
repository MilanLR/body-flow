// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { COOKIE_CONSENT_KEY, updateGaConsent } from "./CookieBanner";

describe("CookieBanner logic", () => {
  beforeEach(() => {
    localStorage.clear();
    document.head.innerHTML = "";
    (window as any).gtag = undefined;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("stores consent state in localStorage correctly", () => {
    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBeNull();

    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe("accepted");

    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe("declined");
  });

  it("updates GA consent state via gtag when available", () => {
    let consentState: any = null;
    (window as any).gtag = (command: string, action: string, state: any) => {
      if (command === "consent" && action === "update") {
        consentState = state;
      }
    };

    updateGaConsent(true);
    expect(consentState?.analytics_storage).toBe("granted");

    updateGaConsent(false);
    expect(consentState?.analytics_storage).toBe("denied");
  });
});
