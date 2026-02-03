export default function ProfilePage() {
  return (
    <main className="p-2">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Mi perfil</h1>
        <p className="text-sm text-white/70 mt-2 max-w-2xl">
          Próximamente: inicio de sesión, puntos, nivel de lealtad e historial.
          Por ahora esta sección es informativa.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border p-5 bg-black/30 shadow-sm">
          <h2 className="text-lg font-semibold">Estado de cuenta</h2>
          <p className="text-sm text-white/70 mt-2">
            Inicia sesión para ver tu progreso, nivel y recompensas.
          </p>

          <div className="mt-4 rounded-xl bg-black/20 p-3">
            <p className="text-xs text-white/60">
              Nota: el login se agregará en el siguiente sprint (Discord/Google).
            </p>
          </div>

          <button
            className="mt-4 w-full rounded-xl bg-black text-white py-2 text-sm font-semibold hover:opacity-100"
            disabled
            title="Próximamente"
          >
            Iniciar sesión (próximamente)
          </button>
        </div>

        <div className="rounded-2xl border p-5 bg-black/30 shadow-sm">
          <h2 className="text-lg font-semibold">Lealtad</h2>
          <p className="text-sm text-white/70 mt-2">
            Revisa cómo funcionan los niveles y qué beneficios desbloqueas.
          </p>

          <a
            href="/loyalty"
            className="inline-block mt-4 w-full text-center rounded-xl border py-2 text-sm font-semibold hover:bg-black/20"
          >
            Ver programa de lealtad
          </a>
        </div>
      </section>

      <section className="rounded-2xl border p-6 bg-black/20 mt-8">
        <h2 className="text-xl font-semibold mb-3">¿Qué viene después?</h2>
        <ul className="list-disc list-inside text-sm text-white/80 space-y-2">
          <li>Login (Discord/Google)</li>
          <li>Puntos y niveles (Bronce/Plata/Oro/VIP)</li>
          <li>Historial y recompensas</li>
          <li>Bonos personalizados según nivel</li>
        </ul>

        <a
          href="/bonuses"
          className="inline-block mt-6 rounded-xl bg-black text-white px-6 py-3 text-sm font-semibold hover:opacity-100"
        >
          Ver bonos disponibles
        </a>
      </section>
    </main>
  );
}
