"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import { Skeleton } from "../components/ui/Skeleton";
import { Pagination } from "../components/ui/Pagination";

type Bonus = {
  id: string;
  titulo: string;
  proveedor: string;
  descripcion: string;
  etiqueta: string;
  url: string;
  terminos: string;
};

type ApiResponse = { updatedAt?: string; bonuses: Bonus[] };

export default function BonusesClient() {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [prov, setProv] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Bonus | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 9;

  async function cargar() {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`${base}/bonuses`, { cache: "no-store" });
      if (!r.ok) throw new Error("No se pudieron cargar los bonos.");
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
    cargar();
  }, []);

  const bonos = data?.bonuses ?? [];

  const proveedores = useMemo(() => {
    const s = new Set(bonos.map((b) => b.proveedor).filter(Boolean));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [bonos]);

  const etiquetas = useMemo(() => {
    const s = new Set(bonos.map((b) => b.etiqueta).filter(Boolean));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [bonos]);

  const filtrados = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return bonos.filter((b) => {
      const passQ =
        !qq ||
        b.titulo.toLowerCase().includes(qq) ||
        b.descripcion.toLowerCase().includes(qq) ||
        b.proveedor.toLowerCase().includes(qq) ||
        b.etiqueta.toLowerCase().includes(qq);

      const passP = !prov || b.proveedor === prov;
      const passT = !tag || b.etiqueta === tag;

      return passQ && passP && passT;
    });
  }, [bonos, q, prov, tag]);

  const total = filtrados.length;
  const start = (page - 1) * pageSize;
  const paged = filtrados.slice(start, start + pageSize);

  function abrir(b: Bonus) {
    setSelected(b);
    setOpen(true);
  }

  function limpiarFiltros() {
    setQ("");
    setProv(null);
    setTag(null);
    setPage(1);
  }

  return (
    <main className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold">Bonos</h1>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="md:col-span-2">
            <Input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar por título, proveedor, etiqueta…"
            />
          </div>
          <button
            type="button"
            onClick={cargar}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
          >
            Actualizar
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-white/60 mr-2">Proveedor:</span>
          <Badge active={!prov} onClick={() => { setProv(null); setPage(1); }}>
            Todos
          </Badge>
          {proveedores.map((p) => (
            <Badge
              key={p}
              active={prov === p}
              onClick={() => {
                setProv(prov === p ? null : p);
                setPage(1);
              }}
            >
              {p}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-white/60 mr-2">Etiqueta:</span>
          <Badge active={!tag} onClick={() => { setTag(null); setPage(1); }}>
            Todas
          </Badge>
          {etiquetas.map((t) => (
            <Badge
              key={t}
              active={tag === t}
              onClick={() => {
                setTag(tag === t ? null : t);
                setPage(1);
              }}
            >
              {t}
            </Badge>
          ))}
          <button
            type="button"
            onClick={limpiarFiltros}
            className="ml-auto rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10 transition"
          >
            Limpiar filtros
          </button>
        </div>

        <div className="text-xs text-white/60">
          Última actualización: {data?.updatedAt ? new Date(data.updatedAt).toLocaleString("es-CL") : "—"} • {total} resultados
        </div>
      </header>

      {error ? (
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-sm">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6"><Skeleton className="h-5 w-2/3" /><Skeleton className="mt-3 h-4 w-full" /><Skeleton className="mt-2 h-4 w-5/6" /></div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6"><Skeleton className="h-5 w-2/3" /><Skeleton className="mt-3 h-4 w-full" /><Skeleton className="mt-2 h-4 w-5/6" /></div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6"><Skeleton className="h-5 w-2/3" /><Skeleton className="mt-3 h-4 w-full" /><Skeleton className="mt-2 h-4 w-5/6" /></div>
        </div>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paged.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => abrir(b)}
              className="text-left rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <div className="text-xs text-white/60">{b.proveedor} • {b.etiqueta}</div>
              <div className="mt-1 text-lg font-semibold">{b.titulo}</div>
              <p className="mt-2 text-sm text-white/80 line-clamp-3">{b.descripcion}</p>
              <div className="mt-4 text-sm font-semibold text-indigo-300 hover:text-indigo-200">
                Ver detalles →
              </div>
            </button>
          ))}

          {paged.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">
              No hay resultados con esos filtros.
            </div>
          ) : null}
        </section>
      )}

      <Pagination page={page} pageSize={pageSize} total={total} onPage={setPage} />

      <Modal
        open={open}
        title={selected?.titulo ?? "Detalle del bono"}
        onClose={() => setOpen(false)}
      >
        {selected ? (
          <div className="space-y-3">
            <div className="text-xs text-white/60">
              Proveedor: <span className="text-white/90">{selected.proveedor}</span> •
              Etiqueta: <span className="text-white/90"> {selected.etiqueta}</span>
            </div>

            <p>{selected.descripcion}</p>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/80">
              <div className="font-semibold text-white">Términos</div>
              <div className="mt-2">{selected.terminos}</div>
            </div>

            {selected.url ? (
              <a
                href={selected.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
              >
                Ir al bono →
              </a>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </main>
  );
}
