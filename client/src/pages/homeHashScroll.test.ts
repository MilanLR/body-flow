import { describe, expect, it, vi } from "vitest";

import { scrollToHashTarget } from "./homeHashScroll";

describe("scrollToHashTarget", () => {
  it("scrolls to the matching section when a hash target exists", () => {
    const scrollIntoView = vi.fn();
    const documentLike = {
      getElementById: vi.fn().mockReturnValue({ scrollIntoView }),
    };

    const didScroll = scrollToHashTarget(documentLike, "#eecp");

    expect(didScroll).toBe(true);
    expect(documentLike.getElementById).toHaveBeenCalledWith("eecp");
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  });

  it("does nothing when no hash target is present", () => {
    const documentLike = {
      getElementById: vi.fn().mockReturnValue(null),
    };

    const didScroll = scrollToHashTarget(documentLike, "");

    expect(didScroll).toBe(false);
    expect(documentLike.getElementById).not.toHaveBeenCalled();
  });
});
