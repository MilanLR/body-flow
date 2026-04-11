import type { CSSProperties } from "react";

export const BODYFLOW_LOGO_SRC = "/bodyflow-logo.png";

export function getBodyFlowLogoStyle(white: boolean): CSSProperties {
  if (white) {
    return {};
  }

  return {
    filter: "brightness(0) saturate(100%)",
  };
}

export function BodyFlowLogo({ white = false }: { white?: boolean }) {
  return (
    <img
      src={BODYFLOW_LOGO_SRC}
      alt="BodyFlow Amsterdam"
      className="h-12 w-auto"
      style={getBodyFlowLogoStyle(white)}
    />
  );
}
