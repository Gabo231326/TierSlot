import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { board: string } }
) {
  const { board } = params;
  const base = process.env.API_BASE;

  if (!base) {
    return NextResponse.json(
      { error: "API_BASE no está configurada en Vercel." },
      { status: 500 }
    );
  }

  const url = `${base}/leaderboards/${encodeURIComponent(board)}`;

  try {
    const r = await fetch(url, { cache: "no-store" });
    const data = await r.json();
    return NextResponse.json(data, { status: r.status });
  } catch {
    return NextResponse.json(
      { error: "No se pudo conectar con el backend." },
      { status: 502 }
    );
  }
}
