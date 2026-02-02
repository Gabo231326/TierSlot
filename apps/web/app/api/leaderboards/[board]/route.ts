import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ board: string }> }
) {
  const { board } = await params;
  const base = process.env.API_BASE;

  if (!base) {
    return NextResponse.json(
      { error: "API_BASE no está configurada en Vercel." },
      { status: 500 }
    );
  }

  if (!board) {
    return NextResponse.json(
      { error: "Falta el parámetro 'board'." },
      { status: 400 }
    );
  }

  const url = `${base}/leaderboards/${encodeURIComponent(board)}`;

  try {
    const r = await fetch(url, { cache: "no-store" });

    const text = await r.text();
    let data: unknown;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    return NextResponse.json(data, { status: r.status });
  } catch {
    return NextResponse.json(
      { error: "No se pudo conectar con el backend." },
      { status: 502 }
    );
  }
}
