import { NextResponse } from "next/server";

type Context = {
  params: {
    board: string;
  };
};

export async function GET(request: Request, context: Context) {
  const board = context.params?.board;
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

    // Por si el backend responde vacío o no-JSON
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
