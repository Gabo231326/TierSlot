import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/80 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/20">
              TS
            </span>
            <div className="font-bold">TierSlot</div>
          </div>

          <p className="text-sm text-white/70">
            18+ | Juega con responsabilidad. TierSlot no está afiliado a casinos ni proveedores.
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold">Enlaces</div>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <Link className="hover:text-white transition" href="/leaderboards">Rankings</Link>
            <Link className="hover:text-white transition" href="/bonuses">Bonos</Link>
            <Link className="hover:text-white transition" href="/reviews">Reseñas</Link>
            <Link className="hover:text-white transition" href="/loyalty">Lealtad</Link>
            <Link className="hover:text-white transition" href="/profile">Mi perfil</Link>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold">Recursos</div>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <Link className="hover:text-white transition" href="/responsible">Juego responsable</Link>
            <Link className="hover:text-white transition" href="/terms">Términos</Link>
            <Link className="hover:text-white transition" href="/privacy">Privacidad</Link>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold">Contacto</div>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <a className="hover:text-white transition" href="#" rel="noreferrer">Discord</a>
            <a className="hover:text-white transition" href="#" rel="noreferrer">X / Twitter</a>
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
