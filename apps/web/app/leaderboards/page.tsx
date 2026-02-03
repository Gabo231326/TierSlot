type Entry = {
  username: string;
  wagerAmount: number;
};

type ApiResponse = {
  updatedAt: string;
  entries: Entry[];
};

function formatCL(n: number) {
  return Math.round(n).toLocaleString("es-CL");
}

function medal(i: number) {
  if (i === 0) return "🥇";
  if (i === 1) return "🥈";
  return "🥉";
}

export default async function LeaderboardsPage() {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";
  const res = await fetch(`${base}/leaderboards/main`, { cache: "no-store" });

  if (!res.ok) {
    return (
      <main className="p-2">
        <h1 className="text-3xl font-bold mb-2">Leaderboards</h1>
        <p className="text-red-600">
          No se pudieron cargar los datos. Revisa que el backend esté corriendo.
        </p>
      </main>
    );
  }

  const data: ApiResponse = await res.json();
  const entries = data.entries ?? [];
  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3, 50);

  return (
    <main className="p-2">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Leaderboards</h1>
        <p className="text-sm text-white mt-1">
          Última actualización: {data.updatedAt}
        </p>
        <p className="text-sm text-white mt-2">
          Ranking basado en el total apostado (wager) de apuestas completadas.
        </p>
      </header>

      {/* Top 3 */}
      <section className="grid gap-4 md:grid-cols-3 mb-8">
        {top3.map((e, i) => (
          <div key={i} className="rounded-2xl border p-4 shadow-sm bg-black/30">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{medal(i)}</span>
              <span className="text-xs text-white">Puesto #{i + 1}</span>
            </div>

            <div className="mt-3">
              <div className="text-lg font-semibold">{e.username}</div>
              <div className="text-sm text-white">Usuario</div>
            </div>

            <div className="mt-4 rounded-xl bg-black/20 p-3">
              <div className="text-xs text-white">Wager</div>
              <div className="text-2xl font-bold tabular-nums">
                {formatCL(e.wagerAmount)}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Tabla */}
      <section className="rounded-2xl border overflow-hidden bg-black/30">
        <div className="px-4 py-3 border-b bg-black/20 flex items-center justify-between">
          <h2 className="font-semibold">Ranking (Top 50)</h2>
          <span className="text-xs text-white">
            Mostrando {Math.min(50, entries.length)} jugadores
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-sm text-white">
                <th className="px-4 py-3 text-left w-20">#</th>
                <th className="px-4 py-3 text-left">Usuario</th>
                <th className="px-4 py-3 text-right w-44">Wager</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((e, idx) => {
                const rank = idx + 4;
                return (
                  <tr
                    key={rank}
                    className="border-t hover:bg-black/20 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-white">{rank}</td>
                    <td className="px-4 py-3 font-medium text-white">
                      {e.username}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {formatCL(e.wagerAmount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {entries.length === 0 ? (
            <div className="p-4 text-sm text-white">
              Aún no hay datos para mostrar.
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
