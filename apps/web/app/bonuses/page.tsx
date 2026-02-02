type Bonus = {
  id: string;
  titulo: string;
  proveedor: string;
  descripcion: string;
  etiqueta?: string;
  url: string;
  terminos: string;
};

type ApiResponse = {
  updatedAt: string;
  bonuses: Bonus[];
};

export default async function BonusesPage() {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";
  const res = await fetch(`${base}/bonuses`, { cache: "no-store" });

  const ok = res.ok;
  const data: ApiResponse | null = ok ? await res.json() : null;

  return (
    <main className="p-2">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Bonos</h1>
        <p className="text-sm text-gray-600 mt-2">
          Promociones y bonos disponibles.
        </p>
        {data?.updatedAt ? (
          <p className="text-xs text-gray-500 mt-1">
            Última actualización: {data.updatedAt}
          </p>
        ) : null}
      </header>

      {!ok || !data ? (
        <p className="text-red-600">
          No se pudieron cargar los bonos. Revisa que el backend esté corriendo.
        </p>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.bonuses.map((b) => (
            <article key={b.id} className="rounded-2xl border p-5 bg-white shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">{b.titulo}</h2>
                  <p className="text-sm text-gray-500">{b.proveedor}</p>
                </div>

                {b.etiqueta ? (
                  <span className="text-xs rounded-full border px-2 py-1 text-gray-700 bg-gray-50">
                    {b.etiqueta}
                  </span>
                ) : null}
              </div>

              <p className="text-sm text-gray-700 mt-3">{b.descripcion}</p>

              <div className="mt-4 rounded-xl bg-gray-50 p-3">
                <p className="text-xs text-gray-500">{b.terminos}</p>
              </div>

              <a
                href={b.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 w-full text-center rounded-xl bg-black text-gray-900 py-2 text-sm font-semibold hover:opacity-90"
              >
                Ver bono
              </a>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
