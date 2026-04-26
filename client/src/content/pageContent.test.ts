import { describe, expect, it } from "vitest";

import { getPageContent } from "./pageContent";

describe("costs page content", () => {
  it("keeps only one narrative section in Dutch and English", () => {
    expect(getPageContent("nl", "costs").sections).toHaveLength(1);
    expect(getPageContent("en", "costs").sections).toHaveLength(1);
  });
});
