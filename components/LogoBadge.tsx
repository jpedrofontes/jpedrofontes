"use client";

import { useState } from "react";

interface LogoBadgeProps {
  src: string | null;
  alt: string;
  /** "sm" = 36px, "md" = 44px (default), "lg" = 56px */
  size?: "sm" | "md" | "lg";
}

const SIZE = {
  sm: "w-9 h-9",
  md: "w-11 h-11",
  lg: "w-14 h-14",
} as const;

const IMG_SIZE = {
  sm: "w-6 h-6",
  md: "w-7 h-7",
  lg: "w-9 h-9",
} as const;

function getDomain(clearbitUrl: string): string | null {
  const m = clearbitUrl.match(/clearbit\.com\/(.+)$/);
  return m ? m[1] : null;
}

export default function LogoBadge({ src, alt, size = "md" }: LogoBadgeProps) {
  // phase 0 = try src (clearbit), 1 = try DuckDuckGo favicon, 2 = initials
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  const domain = src ? getDomain(src) : null;
  const duckSrc = domain ? `https://icons.duckduckgo.com/ip3/${domain}.ico` : null;

  const effectiveSrc =
    phase === 0 ? src :
    phase === 1 ? duckSrc :
    null;

  const initials = alt
    .split(/[\s/,\u2014]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  function handleError() {
    if (phase === 0 && duckSrc) setPhase(1);
    else setPhase(2);
  }

  return (
    <div
      className={`${SIZE[size]} rounded-xl border border-edge flex items-center justify-center shrink-0 overflow-hidden`}
      style={{ backgroundColor: effectiveSrc ? "#ffffff" : undefined }}
    >
      {effectiveSrc ? (
        <img
          src={effectiveSrc}
          alt={alt}
          className={`${IMG_SIZE[size]} object-contain`}
          onError={handleError}
        />
      ) : (
        <span
          className="font-bold text-accent"
          style={{ fontSize: size === "lg" ? "0.85rem" : size === "md" ? "0.7rem" : "0.6rem" }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}
