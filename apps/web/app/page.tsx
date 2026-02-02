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
    <section className="flex flex-col gap-10">
      {/* HERO */}
      <div className="rounded-3xl border p-8 bg-gray-50">
        <h1 className="text-4xl font-bold mb-3">
          Leaderboards en tiempo real
        </h1>
        <p className="text-gray-600 max-w-xl">
          Revisa los rankings basados en el total apostado (wager) de apuestas
          completadas. Datos actualizados constantemente.
        </p>

        <a
          href="/leaderboards"
          className="inline-block mt-6 rounded-xl bg-black text-white px-6 py-3 text-sm font-semibold hover:opacity-90"
        >
          Ver Leaderboard
        </a>
      </div>

      {/* PREVIEW TOP 5 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Top 5 actual</h2>
          <a
            href="/leaderboards"
            className="text-sm text-gray-600 hover:underline"
          >
            Ver ranking completo →
          </a>
        </div>

        <div className="rounded-2xl border overflow-hidden">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-50">
              <tr className="text-sm text-gray-600">
                <th className="px-4 py-3 text-left w-20">#</th>
                <th className="px-4 py-3 text-left">Usuario</th>
                <th className="px-4 py-3 text-right w-40">Wager</th>
              </tr>
            </thead>
            <tbody>
              {top5.map((e, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{e.username}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatCL(e.wagerAmount)}
                  </td>
                </tr>
              ))}

              {top5.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                    No hay datos disponibles.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
