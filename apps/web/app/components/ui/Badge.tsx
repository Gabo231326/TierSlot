"use client";

import * as React from "react";

export function Badge({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition " +
        (active
          ? "border-white/30 bg-white/15 text-white"
          : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white")
      }
    >
      {children}
    </button>
  );
}
