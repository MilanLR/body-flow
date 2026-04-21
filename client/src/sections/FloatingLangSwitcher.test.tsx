import { describe, expect, it } from "vitest";

import { getAlternateLanguagePath } from "@/lib/routes";

describe("FloatingLangSwitcher", () => {
  it("swaps to the equivalent page instead of resetting to home", () => {
    expect(getAlternateLanguagePath("/nl/kosten", "en")).toBe("/en/costs");
    expect(getAlternateLanguagePath("/en/eecp-therapy", "nl")).toBe("/nl/eecp-therapie");
  });

  it("falls back to the target-language homepage for unknown routes", () => {
    expect(getAlternateLanguagePath("/missing", "nl")).toBe("/nl/");
    expect(getAlternateLanguagePath("/missing", "en")).toBe("/en/");
  });
});
