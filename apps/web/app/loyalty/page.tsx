export default function LealtadPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-extrabold">Lealtad</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border border-white/10 bg-white/5 p-6">Bronce</div>
        <div className="border border-white/10 bg-white/5 p-6">Plata</div>
        <div className="border border-white/10 bg-white/5 p-6">Oro</div>
        <div className="border border-white/10 bg-white/5 p-6">Platino</div>
      </div>
    </main>
  );
}
