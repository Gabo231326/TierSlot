type Entry = { username: string; wagerAmount: number };
type ApiResponse = { entries: Entry[] };

function formatCL(n: number) {
  return Math.round(n).toLocaleString("es-CL");
}

export default async function RankingsPage() {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";
  const res = await fetch(`${base}/leaderboards/main`, { cache: "no-store" });
  const data: ApiResponse | null = res.ok ? await res.json() : null;
  const rows = data?.entries ?? [];

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold">Rankings</h1>
        <p className="text-sm text-white/80">
          Clasificación por total apostado (datos desde tu backend).
        </p>
      </header>

      <section className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
        <table className="min-w-full">
          <thead className="text-xs text-white">
            <tr>
              <th className="px-6 py-3 text-left w-16">#</th>
              <th className="px-6 py-3 text-left">Usuario</th>
              <th className="px-6 py-3 text-right w-56">Total apostado</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rows.map((e, i) => (
              <tr key={`${e.username}-${i}`} className="border-t border-white/10">
                <td className="px-6 py-4">{i + 1}</td>
                <td className="px-6 py-4">{e.username}</td>
                <td className="px-6 py-4 text-right">
                  {formatCL(e.wagerAmount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
