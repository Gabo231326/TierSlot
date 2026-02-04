import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/80 text-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/20">
              TS
            </span>
            <div className="text-lg font-bold">TierSlot</div>
          </div>

          <p className="text-xs text-white/60">
            18+ | Juega con responsabilidad. TierSlot no está afiliado a casinos ni proveedores.
          </p>
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="text-sm font-semibold">Enlaces</div>
            <div className="flex flex-col gap-2 text-sm text-white/80">
              <Link className="hover:text-white transition" href="/leaderboards">Rankings</Link>
              <Link className="hover:text-white transition" href="/bonuses">Bonos</Link>
              <Link className="hover:text-white transition" href="/reviews">Reseñas</Link>
              <Link className="hover:text-white transition" href="/loyalty">Lealtad</Link>
              <Link className="hover:text-white transition" href="/profile">Mi perfil</Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Recursos</div>
            <div className="flex flex-col gap-2 text-sm text-white/80">
              <Link className="hover:text-white transition" href="/responsible">Juego responsable</Link>
              <Link className="hover:text-white transition" href="/terms">Términos</Link>
              <Link className="hover:text-white transition" href="/privacy">Privacidad</Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Contacto</div>
            <div className="flex flex-col gap-2 text-sm text-white/80">
              <a className="hover:text-white transition" href="#" rel="noreferrer">Discord</a>
              <a className="hover:text-white transition" href="#" rel="noreferrer">X / Twitter</a>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Nota</div>
            <p className="text-sm text-white/70 leading-relaxed">
              Este sitio muestra información y rankings. Si juegas, hazlo con límites y con responsabilidad.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-4 text-xs text-white/60">
          © {new Date().getFullYear()} TierSlot. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
