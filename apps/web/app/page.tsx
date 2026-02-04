type Entry = { username: string; wagerAmount: number };
type LeaderboardResponse = { updatedAt?: string; entries: Entry[] };

type Bonus = {
  id: string;
  titulo: string;
  proveedor: string;
  descripcion: string;
  etiqueta: string;
  url: string;
  terminos: string;
};

type BonusesResponse = { updatedAt?: string; bonuses: Bonus[] };

function formatCL(n: number) {
  return Math.round(n).toLocaleString("es-CL");
}

function Card({
  titulo,
  descripcion,
  href,
}: {
  titulo: string;
  descripcion: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
    >
      <div className="text-lg font-semibold">{titulo}</div>
      <p className="mt-2 text-sm text-white/80">{descripcion}</p>
      <div className="mt-4 text-sm font-semibold text-indigo-300 hover:text-indigo-200">
        Ver más →
      </div>
    </a>
  );
}

export default async function HomePage() {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";

  // Rankings (top 5)
  const lbRes = await fetch(`${base}/leaderboards/semanal`, { cache: "no-store" });
  const lbData: LeaderboardResponse | null = lbRes.ok ? await lbRes.json() : null;
  const top = (lbData?.entries ?? []).slice(0, 5);

  // Bonos (preview)
  const bRes = await fetch(`${base}/bonuses`, { cache: "no-store" });
  const bData: BonusesResponse | null = bRes.ok ? await bRes.json() : null;
  const bonosPreview = (bData?.bonuses ?? []).slice(0, 6);

  return (
    <main className="space-y-14">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            TierSlot: rankings, bonos y lealtad en un solo lugar
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/80">
            Revisa clasificaciones por total apostado, explora bonos y sube de nivel con tu actividad.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/leaderboards"
              className="rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              Ver rankings
            </a>
            <a
              href="/bonuses"
              className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Ver bonos
            </a>
            <a
              href="/loyalty"
              className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Programa de lealtad
            </a>
          </div>

          <p className="mt-5 text-xs text-white/60">
            18+ | Juega con responsabilidad. TierSlot no está afiliado a casinos ni proveedores.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card
          titulo="Rankings"
          descripcion="Tabs (Diario/Semanal/Mensual), búsqueda, orden y paginación."
          href="/leaderboards"
        />
        <Card
          titulo="Bonos"
          descripcion="Buscador + filtros por proveedor/etiqueta + modal de detalle."
          href="/bonuses"
        />
        <Card
          titulo="Lealtad"
          descripcion="Niveles, puntos y beneficios por actividad."
          href="/loyalty"
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-semibold">Top 5 (semanal)</h2>
          <a href="/leaderboards" className="text-sm text-indigo-300 hover:text-indigo-200">
            Ver interactivo →
          </a>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
          <table className="min-w-full">
            <thead className="text-xs text-white/90">
              <tr>
                <th className="px-6 py-3 text-left w-16">#</th>
                <th className="px-6 py-3 text-left">Usuario</th>
                <th className="px-6 py-3 text-right w-56">Total apostado</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {top.map((e, i) => (
                <tr key={`${e.username}-${i}`} className="border-t border-white/10">
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4 font-medium">{e.username}</td>
                  <td className="px-6 py-4 text-right tabular-nums">
                    {formatCL(e.wagerAmount)}
                  </td>
                </tr>
              ))}

              {top.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-white/80">
                    No hay datos disponibles.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-semibold">Bonos destacados</h2>
          <a href="/bonuses" className="text-sm text-indigo-300 hover:text-indigo-200">
            Ver interactivo →
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bonosPreview.map((b) => (
            <a
              key={b.id}
              href="/bonuses"
              className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <div className="text-xs text-white/60">{b.proveedor} • {b.etiqueta}</div>
              <div className="mt-1 font-semibold">{b.titulo}</div>
              <p className="mt-2 text-sm text-white/80 line-clamp-3">{b.descripcion}</p>
              <div className="mt-4 text-sm font-semibold text-indigo-300 hover:text-indigo-200">
                Ver detalle →
              </div>
            </a>
          ))}

          {bonosPreview.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">
              No hay bonos disponibles.
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
