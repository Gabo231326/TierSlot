import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.API_BASE;

  if (!base) {
    return NextResponse.json(
      { error: "API_BASE no está configurada en Vercel." },
      { status: 500 }
    );
  }

  try {
    const r = await fetch(`${base}/bonuses`, { cache: "no-store" });
    const data = await r.json();
    return NextResponse.json(data, { status: r.status });
  } catch {
    return NextResponse.json(
      { error: "No se pudo conectar con el backend." },
      { status: 502 }
    );
  }
}
