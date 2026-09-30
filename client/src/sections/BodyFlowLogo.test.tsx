import { describe, expect, it } from "vitest";

import { BODYFLOW_LOGO_SRC, getBodyFlowLogoStyle } from "./BodyFlowLogo";

describe("BodyFlowLogo", () => {
  it("uses the public logo asset", () => {
    expect(BODYFLOW_LOGO_SRC).toBe("/logo.svg");
  });

  it("keeps the logo white on dark backgrounds", () => {
    expect(getBodyFlowLogoStyle(true)).not.toHaveProperty("filter");
  });

  it("darkens the logo on light backgrounds", () => {
    expect(getBodyFlowLogoStyle(false)).toMatchObject({
      filter: "brightness(0) saturate(100%)",
    });
  });
});
