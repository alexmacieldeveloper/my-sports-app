import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const leagues = await prisma.league.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        apiId: true,
        name: true,
        country: true,
        season: true,
        logo: true,
      },
    });

    return NextResponse.json({ leagues });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar ligas do banco" }, { status: 500 });
  }
}
