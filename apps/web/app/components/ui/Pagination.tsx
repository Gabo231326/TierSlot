"use client";

export function Pagination({
  page,
  pageSize,
  total,
  onPage,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPage: (p: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-xs text-white/60">
        Página {page} de {totalPages} • {total} resultados
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => onPage(page - 1)}
          className={
            "rounded-xl border px-3 py-2 text-sm transition " +
            (canPrev
              ? "border-white/20 bg-white/5 text-white hover:bg-white/10"
              : "border-white/10 bg-white/5 text-white/30 cursor-not-allowed")
          }
        >
          ← Anterior
        </button>
        <button
          type="button"
          disabled={!canNext}
          onClick={() => onPage(page + 1)}
          className={
            "rounded-xl border px-3 py-2 text-sm transition " +
            (canNext
              ? "border-white/20 bg-white/5 text-white hover:bg-white/10"
              : "border-white/10 bg-white/5 text-white/30 cursor-not-allowed")
          }
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
