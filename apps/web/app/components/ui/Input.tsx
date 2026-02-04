"use client";

import * as React from "react";

export function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      {...props}
      className={
        "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/30 focus:bg-white/10 transition " +
        className
      }
    />
  );
}
