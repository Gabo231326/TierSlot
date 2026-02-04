"use client";

import * as React from "react";

export function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
        aria-label="Cerrar"
      />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">{title}</div>
            <div className="mt-1 text-xs text-white/60">Detalles</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 transition"
          >
            Cerrar
          </button>
        </div>
        <div className="mt-4 text-sm text-white/85 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
