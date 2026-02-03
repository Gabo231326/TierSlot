export default function LoyaltyPage() {
  return (
    <main className="p-2">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Programa de Lealtad</h1>
        <p className="text-sm text-white/70 mt-2 max-w-2xl">
          Gana puntos según tu actividad y desbloquea beneficios exclusivos
          a medida que subes de nivel.
        </p>
      </header>

      {/* Niveles */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {[
          {
            nivel: "Bronce",
            beneficio: "Acceso básico a promociones",
          },
          {
            nivel: "Plata",
            beneficio: "Bonos exclusivos y prioridad",
          },
          {
            nivel: "Oro",
            beneficio: "Mejores bonos y recompensas",
          },
          {
            nivel: "VIP",
            beneficio: "Cashback, soporte preferente y premios especiales",
          },
        ].map((n) => (
          <div
            key={n.nivel}
            className="rounded-2xl border p-4 bg-black/30 shadow-sm"
          >
            <h2 className="text-lg font-semibold">{n.nivel}</h2>
            <p className="text-sm text-white/70 mt-2">{n.beneficio}</p>
          </div>
        ))}
      </section>

      {/* Cómo funciona */}
      <section className="rounded-2xl border p-6 bg-black/20">
        <h2 className="text-xl font-semibold mb-3">¿Cómo funciona?</h2>
        <ul className="list-disc list-inside text-sm text-white/80 space-y-2">
          <li>Ganas puntos según tu actividad y participación.</li>
          <li>Mientras más puntos, subes de nivel.</li>
          <li>Cada nivel desbloquea nuevos beneficios.</li>
          <li>Los niveles se actualizan automáticamente.</li>
        </ul>

        <a
          href="/profile"
          className="inline-block mt-6 rounded-xl bg-black text-white px-6 py-3 text-sm font-semibold hover:opacity-100"
        >
          Ver mi perfil
        </a>
      </section>
    </main>
  );
}
