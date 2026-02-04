"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "/", label: "Inicio" },
    { href: "/leaderboards", label: "Rankings" },
    { href: "/bonuses", label: "Bonos" },
    { href: "/reviews", label: "Reseñas" },
    { href: "/loyalty", label: "Lealtad" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/20">
            TS
          </span>
          TierSlot
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-white/90 hover:text-white">
              {l.label}
            </Link>
          ))}
          <Link
            href="/profile"
            className="rounded-xl border border-white/20 px-3 py-2 text-sm text-white hover:bg-white hover:text-black transition"
          >
            Mi perfil
          </Link>
        </nav>

        <button
          className="md:hidden rounded-xl border border-white/20 px-3 py-2 text-sm text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Alternar menú"
        >
          Menú
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-white/90 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-white/20 px-3 py-2 text-sm text-white"
            >
              Mi perfil
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
