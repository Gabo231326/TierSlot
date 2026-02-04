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
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition border " +
        (active
          ? "border-white/35 bg-white/10 text-white font-semibold"
          : "border-white/20 bg-transparent text-white/80 hover:border-white/35 hover:bg-white/5 hover:text-white")
      }
    >
      {children}
    </button>
  );
}
