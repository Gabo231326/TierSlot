export default async function BonosPage() {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";
  const res = await fetch(`${base}/bonuses`, { cache: "no-store" });
  const bonuses = res.ok ? await res.json() : [];

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-extrabold">Bonos</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bonuses.map((b: any, i: number) => (
          <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="font-semibold">{b.title ?? "Bono"}</div>
            <p className="mt-2 text-sm">{b.description ?? "Sin descripción."}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
