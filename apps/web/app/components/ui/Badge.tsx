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
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition " +
        (active
          ? "border border-white bg-transparent text-white font-semibold"
          : "border border-white/40 bg-transparent text-white/80 hover:border-white hover:text-white")
      }
    >
      {children}
    </button>
  );
}
