import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/80 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-4">
        <div className="space-y-2">
          <div className="font-bold">TierSlot</div>
          <p className="text-sm text-white/70">
            18+ | Juega con responsabilidad. TierSlot no está afiliado a casinos ni proveedores.
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold">Enlaces</div>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <Link href="/leaderboards">Rankings</Link>
            <Link href="/bonuses">Bonos</Link>
            <Link href="/reviews">Reseñas</Link>
            <Link href="/loyalty">Lealtad</Link>
            <Link href="/profile">Mi perfil</Link>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold">Recursos</div>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <Link href="/responsible">Juego responsable</Link>
            <Link href="/terms">Términos</Link>
            <Link href="/privacy">Privacidad</Link>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold">Contacto</div>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <a href="#" className="hover:text-white">Discord</a>
            <a href="#" className="hover:text-white">X / Twitter</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/60">
          © {new Date().getFullYear()} TierSlot. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
