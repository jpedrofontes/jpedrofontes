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

export default function LogoBadge({ src, alt, size = "md" }: LogoBadgeProps) {
  const [failed, setFailed] = useState(false);

  const initials = alt
    .split(/[\s/,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  const showImg = src && !failed;

  return (
    <div
      className={`${SIZE[size]} rounded-xl border border-edge flex items-center justify-center shrink-0 overflow-hidden`}
      style={{ backgroundColor: showImg ? "#ffffff" : undefined }}
    >
      {showImg ? (
        <img
          src={src}
          alt={alt}
          className={`${IMG_SIZE[size]} object-contain`}
          onError={() => setFailed(true)}
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
