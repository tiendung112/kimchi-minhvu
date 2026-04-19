import { useMemo } from "react";

interface FloatingPetalsProps {
  count?: number;
  variant?: "petal" | "heart" | "sparkle";
  className?: string;
}

/**
 * Decorative floating elements that drift upward across the screen.
 * Pure CSS, GPU-accelerated, pointer-events disabled.
 */
export const FloatingPetals = ({
  count = 14,
  variant = "petal",
  className = "",
}: FloatingPetalsProps) => {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 18,
        duration: 14 + Math.random() * 12,
        size: 10 + Math.random() * 14,
        opacity: 0.35 + Math.random() * 0.45,
      })),
    [count]
  );

  const symbol = variant === "heart" ? "❤" : variant === "sparkle" ? "✦" : "❀";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute text-accent animate-float-up will-change-transform"
          style={{
            left: `${p.left}%`,
            bottom: 0,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {symbol}
        </span>
      ))}
    </div>
  );
};
