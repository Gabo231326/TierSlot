type Entry = {
  username: string;
  wagerAmount: number;
};

type ApiResponse = {
  entries: Entry[];
};

function formatCL(n: number) {
  return Math.round(n).toLocaleString("es-CL");
}

export default async function HomePage() {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";
  const res = await fetch(`${base}/leaderboards/main`, { cache: "no-store" });

  const data: ApiResponse | null = res.ok ? await res.json() : null;
  const top5 = data?.entries?.slice(0, 5) ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30/5 p-8 md:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.35),transparent_45%),radial-gradient(circle_at_70%_40%,rgba(236,72,153,0.25),transparent_45%)]" />
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
            ⚡ Rankings + Bonos + Lealtad
          </p>

          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight">
            TierSlot: leaderboards en tiempo real
          </h1>

          <p className="mt-4 max-w-2xl text-white">
            Revisa rankings por total apostado (wager), encuentra bonos y participa
            en recompensas.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/leaderboards"
              className="rounded-xl bg-black/30 text-white px-6 py-3 text-sm font-semibold hover:opacity-10000"
            >
              Ver Leaderboard
            </a>
            <a
              href="/bonuses"
              className="rounded-xl border border-white/15 bg-black/30 px-6 py-3 text-sm font-semibold text-white hover:bg-black/50"
            >
              Ver Bonos
            </a>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Top 5 */}
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-black/30/5 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5">
            <h2 className="text-lg font-semibold">Top 5 actual</h2>
            <a
              href="/leaderboards"
              className="text-sm text-white hover:text-white"
            >
              Ver ranking completo →
            </a>
          </div>

          <div className="border-t border-white/10">
            <table className="min-w-full">
              <thead className="text-xs text-white">
                <tr>
                  <th className="px-6 py-3 text-left w-16">#</th>
                  <th className="px-6 py-3 text-left">Usuario</th>
                  <th className="px-6 py-3 text-right w-44">Wager</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {top5.map((e, i) => (
                  <tr key={i} className="border-t border-white/10">
                    <td className="px-6 py-4 text-white">{i + 1}</td>
                    <td className="px-6 py-4 font-medium">{e.username}</td>
                    <td className="px-6 py-4 text-right tabular-nums">
                      {formatCL(e.wagerAmount)}
                    </td>
                  </tr>
                ))}

                {top5.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-10 text-center text-white"
                    >
                      No hay datos disponibles.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side cards */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/30/5 p-6">
            <h3 className="font-semibold">Bonos destacados</h3>
            <p className="mt-2 text-sm text-white">
              Encuentra promos y recompensas. Filtra por tipo y requisitos.
            </p>
            <a
              href="/bonuses"
              className="mt-4 inline-block text-sm font-semibold text-indigo-300 hover:text-indigo-200"
            >
              Explorar bonos →
            </a>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30/5 p-6">
            <h3 className="font-semibold">Lealtad</h3>
            <p className="mt-2 text-sm text-white">
              Sube de nivel y desbloquea perks por actividad.
            </p>
            <a
              href="/loyalty"
              className="mt-4 inline-block text-sm font-semibold text-indigo-300 hover:text-indigo-200"
            >
              Ver programa →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-14 border-t border-white/10 pt-6 text-xs text-white">
        18+ | Juega con responsabilidad | TierSlot no está afiliado a casinos ni
        proveedores.
      </footer>
    </main>
  );
}
