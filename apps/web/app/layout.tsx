import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export const metadata = {
  title: "TierSlot",
  description: "Rankings, bonos y lealtad en un solo lugar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
