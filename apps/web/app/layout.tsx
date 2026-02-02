import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TierSlot",
  description: "Rankings, bonos y lealtad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-gray-900`}
      >
        {/* HEADER / NAVBAR */}
        <header className="border-b">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex gap-6 items-center">
            <Link href="/" className="font-bold text-lg">
              TierSlot
            </Link>
            <Link href="/leaderboards" className="hover:underline">
              Rankings
            </Link>
            <Link href="/bonuses" className="hover:underline">
              Bonos
            </Link>
            <Link href="/loyalty" className="hover:underline">
              Lealtad
            </Link>
            <Link href="/profile" className="hover:underline">
              Mi perfil
            </Link>
          </nav>
        </header>

        {/* CONTENIDO */}
        <main className="mx-auto max-w-6xl px-4 py-6">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="border-t mt-auto">
          <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-gray-500">
            18+ | Juega con responsabilidad | Este sitio no está afiliado a Shuffle
          </div>
        </footer>
      </body>
    </html>
  );
}

