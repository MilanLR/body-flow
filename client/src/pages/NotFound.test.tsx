// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { LangProvider, createLangContextValue } from "@/i18n/LangContext";

import NotFound from "./NotFound";

const { navigateMock } = vi.hoisted(() => ({
  navigateMock: vi.fn(),
}));

vi.mock("wouter", () => ({
  useLocation: () => ["/en/not-a-real-page", navigateMock] as const,
}));

beforeAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
});

afterAll(() => {
  delete (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean })
    .IS_REACT_ACT_ENVIRONMENT;
});

afterEach(() => {
  navigateMock.mockClear();
  document.body.innerHTML = "";
});

describe("NotFound", () => {
  it("shows the English copy and routes back to the English homepage", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const root = createRoot(container);

    await act(async () => {
      root.render(
        <LangProvider value={createLangContextValue("en", "home", () => {})}>
          <NotFound />
        </LangProvider>,
      );
    });

    expect(container.textContent).toContain("Page Not Found");
    expect(container.textContent).toContain("Sorry, the page you are looking for doesn't exist.");

    const button = container.querySelector("button");
    expect(button).not.toBeNull();

    await act(async () => {
      button?.click();
    });

    expect(navigateMock).toHaveBeenCalledWith("/en/");

    await act(async () => {
      root.unmount();
    });
  });
});
