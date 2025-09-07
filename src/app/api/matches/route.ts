import { Match } from "@/hooks/useMatches";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const matchesFromDb = await prisma.match.findMany({
      orderBy: { date: "desc" },
      include: {
        homeTeam: true,
        awayTeam: true,
        league: true,
      },
    });

    const matches: Match[] = matchesFromDb.map((m) => ({
      id: m.id,
      date: m.date.toISOString(),
      homeTeamName: m.homeTeam.name,
      homeTeamLogo: m.homeTeam.logo ?? undefined,
      awayTeamName: m.awayTeam.name,
      awayTeamLogo: m.awayTeam.logo ?? undefined,
      leagueName: m.league.name,
      status: m.status ?? undefined,
      scoreHome: m.scoreHome ?? undefined,
      scoreAway: m.scoreAway ?? undefined,
    }));

    return NextResponse.json(matches);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar partidas" }, { status: 500 });
  }
}
