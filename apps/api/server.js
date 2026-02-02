import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

// cache simple para evitar rate limit
const cache = new Map();

function maskUsername(u = "") {
  if (!u) return "";
  if (u.length <= 2) return "*".repeat(u.length);
  return `${u[0]}${"*".repeat(Math.max(3, u.length - 2))}${u[u.length - 1]}`;
}



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

app.get("/leaderboards/main", async (req, res) => {
  const cacheKey = "main";

  const hit = cache.get(cacheKey);
  if (hit && Date.now() < hit.expiresAt) {
    return res.json(hit.data);
  }

  try {
    const raw = await fetchShuffleStats();

    const entries = (raw || [])
      .map((x) => ({
        username: maskUsername(x.username),
        wagerAmount: Number(x.wagerAmount ?? 0),
      }))
      .sort((a, b) => b.wagerAmount - a.wagerAmount);

    const payload = {
      updatedAt: new Date().toISOString(),
      entries,
    };

    // cache 35 segundos
    cache.set(cacheKey, {
      data: payload,
      expiresAt: Date.now() + 35000,
    });

    res.json(payload);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// BONUSES (por ahora "seed" en el backend; luego lo pasamos a DB)
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