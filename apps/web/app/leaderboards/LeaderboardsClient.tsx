"use client";

import { useEffect, useMemo, useState } from "react";
import { Tabs } from "../components/ui/Tabs";
import { Input } from "../components/ui/Input";
import { Pagination } from "../components/ui/Pagination";
import { Skeleton } from "../components/ui/Skeleton";

type Entry = { rank: number; username: string };
type ApiResponse = { updatedAt?: string; entries: Entry[] };

type Periodo = "diario" | "semanal" | "mensual";

export default function LeaderboardsClient() {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";

  const [periodo, setPeriodo] = useState<Periodo>("semanal");
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 25;

  async function cargar() {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`${base}/leaderboards/${periodo}`, { cache: "no-store" });
      if (!r.ok) throw new Error("No se pudo cargar el ranking.");
      const j = (await r.json()) as ApiResponse;
      setData(j);
    } catch (e: any) {
      setError(e?.message ?? "Error inesperado.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setPage(1);
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [periodo]);

  useEffect(() => {
    const t = setInterval(() => cargar(), 35000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [periodo]);

  const rows = useMemo(() => {
    const list = data?.entries ?? [];
    const qq = q.trim().toLowerCase();
    if (!qq) return list;
    return list.filter((x) => x.username.toLowerCase().includes(qq));
  }, [data, q]);

  const total = rows.length;
  const start = (page - 1) * pageSize;
  const paged = rows.slice(start, start + pageSize);

  return (
    <main className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold">Rankings</h1>

        <div className="flex flex-wrap items-center gap-3">
          <Tabs<Periodo>
            items={[
              { key: "diario", label: "Diario" },
              { key: "semanal", label: "Semanal" },
              { key: "mensual", label: "Mensual" },
            ]}
            value={periodo}
            onChange={setPeriodo}
          />

          <div className="flex-1 min-w-[220px]">
            <Input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar usuario…"
            />
          </div>

          <button
            type="button"
            onClick={cargar}
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:border-white/35 hover:text-white transition"
          >
            Actualizar
          </button>
        </div>

        <div className="text-xs text-white/60">
          Última actualización:{" "}
          {data?.updatedAt ? new Date(data.updatedAt).toLocaleString("es-CL") : "—"} • Monto apostado:{" "}
          <span className="text-white/80">Privado</span>
        </div>
      </header>

      {error ? (
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-sm">
          {error}
        </div>
      ) : null}

      <section className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-white/80">
            Mostrando {paged.length} de {total}
          </div>
          <div className="text-xs text-white/60">Auto-refresco cada ~35s</div>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="text-xs text-white/90">
              <tr>
                <th className="px-6 py-3 text-left w-16">#</th>
                <th className="px-6 py-3 text-left">Usuario</th>
                <th className="px-6 py-3 text-right w-56">Total apostado</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {paged.map((e, i) => (
                <tr key={`${e.username}-${e.rank}-${i}`} className="border-t border-white/10">
                  <td className="px-6 py-4">{e.rank ?? start + i + 1}</td>
                  <td className="px-6 py-4 font-medium">{e.username}</td>
                  <td className="px-6 py-4 text-right text-white/60">Privado</td>
                </tr>
              ))}

              {paged.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-white/80">
                    No hay resultados con esos filtros.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        )}
      </section>

      <Pagination page={page} pageSize={pageSize} total={total} onPage={setPage} />
    </main>
  );
}
