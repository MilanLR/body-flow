export function BodyFlowLogo({ white = false }: { white?: boolean }) {
  const color = white ? "#ffffff" : "#1a2e4a";
  const subColor = white ? "rgba(255,255,255,0.85)" : "#2a5580";

  return (
    <div className="flex flex-col items-center gap-0">
      <span
        className="font-display text-2xl font-semibold leading-none tracking-[0.02em]"
        style={{ color }}
      >
        BodyFlow
      </span>
      <svg
        width="72"
        height="10"
        viewBox="0 0 72 10"
        fill="none"
        className="-mt-0.5"
      >
        <path
          d="M2 6 Q12 1 22 6 Q32 11 42 6 Q52 1 62 6 Q67 8.5 70 7"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
      </svg>
      <span
        className="font-body text-[0.55rem] font-medium tracking-[0.25em] mt-px"
        style={{ color: subColor }}
      >
        AMSTERDAM
      </span>
    </div>
  );
}
