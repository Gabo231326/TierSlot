import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

// cache simple para evitar rate limit
const cache = new Map();

async function fetchShuffleStats() {
  const affiliateId = process.env.SHUFFLE_AFFILIATE_ID;
  if (!affiliateId) {
    throw new Error("Falta SHUFFLE_AFFILIATE_ID en el archivo .env");
  }

  const url = `https://affiliate.shuffle.com/stats/${affiliateId}`;
  const r = await fetch(url);

  if (!r.ok) {
    const txt = await r.text();
    throw new Error(`Shuffle error ${r.status}: ${txt}`);
  }

  return await r.json();
}

async function buildLeaderboard(cacheKey) {
  const hit = cache.get(cacheKey);
  if (hit && Date.now() < hit.expiresAt) return hit.data;

  const raw = await fetchShuffleStats();

  // Ordenamos por wagerAmount REAL, pero NO lo mandamos al frontend
  const ordered = (raw || [])
    .map((x) => ({
      username: String(x.username ?? ""),
      wagerAmountRaw: Number(x.wagerAmount ?? 0),
    }))
    .sort((a, b) => b.wagerAmountRaw - a.wagerAmountRaw);

  // Solo enviamos username + rank (monto privado)
  const entries = ordered.map((x, idx) => ({
    rank: idx + 1,
    username: x.username,
  }));

  const payload = {
    updatedAt: new Date().toISOString(),
    entries,
  };

  // cache 35 segundos
  cache.set(cacheKey, { data: payload, expiresAt: Date.now() + 35000 });
  return payload;
}

// Endpoint original
app.get("/leaderboards/main", async (req, res) => {
  try {
    const payload = await buildLeaderboard("main");
    res.json(payload);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Endpoints por periodo (diario/semanal/mensual)
app.get("/leaderboards/:periodo", async (req, res) => {
  const p = String(req.params.periodo || "").toLowerCase();
  const allowed = new Set(["diario", "semanal", "mensual"]);

  if (!allowed.has(p)) {
    return res.status(400).json({ error: "Periodo inválido. Usa: diario, semanal o mensual." });
  }

  try {
    const payload = await buildLeaderboard(`lb:${p}`);
    res.json(payload);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// BONUSES (seed)
app.get("/bonuses", (req, res) => {
  res.json({
    updatedAt: new Date().toISOString(),
    bonuses: [
      {
        id: "b1",
        titulo: "Bono de Bienvenida",
        proveedor: "Casino Ejemplo",
        descripcion: "Bono por primer depósito + giros gratis.",
        etiqueta: "Popular",
        url: "https://example.com",
        terminos: "18+ • Aplican términos y condiciones.",
      },
      {
        id: "b2",
        titulo: "Recarga Diaria",
        proveedor: "Casino Ejemplo",
        descripcion: "Bono de recarga disponible todos los días.",
        etiqueta: "Diario",
        url: "https://example.com",
        terminos: "Requisitos de apuesta pueden aplicar.",
      },
      {
        id: "b3",
        titulo: "Cashback VIP",
        proveedor: "Casino Ejemplo",
        descripcion: "Cashback semanal según tu nivel VIP.",
        etiqueta: "VIP",
        url: "https://example.com",
        terminos: "Sujeto a elegibilidad y reglas del programa.",
      },
    ],
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
