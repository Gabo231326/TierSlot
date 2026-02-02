import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TierSlot",
    template: "%s | TierSlot",
  },
  description: "Rankings, bonos y lealtad",
};

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-extrabold tracking-tight text-xl">
          Tier<span className="text-indigo-400">Slot</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-white/80">
          <Link className="hover:text-white" href="/leaderboards">
            Rankings
          </Link>
          <Link className="hover:text-white" href="/bonuses">
            Bonos
          </Link>
          <Link className="hover:text-white" href="/loyalty">
            Lealtad
          </Link>
          <Link className="hover:text-white" href="/profile">
            Mi perfil
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#070A12] text-white">
        {/* Fondo con glow/gradientes */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_45%),radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.18),transparent_40%)]" />
        <div className="relative">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
