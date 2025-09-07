import { prisma } from "@/lib/prisma";
import { ApiMatchItem, MatchData } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://v3.football.api-sports.io/fixtures?season=2025&league=39",
      {
        headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY! },
      }
    );

    const data = await res.json();

    const matches: MatchData[] = data.response.map((item: ApiMatchItem) => ({
      id: item.fixture.id,
      date: item.fixture.date,
      homeTeamName: item.teams.home.name,
      awayTeamName: item.teams.away.name,
      leagueName: item.league.name,
      status: item.fixture.status.short,
      scoreHome: item.score.fulltime.home,
      scoreAway: item.score.fulltime.away,
    }));

    for (const match of matches) {
      const homeTeam = await prisma.team.findUnique({ where: { name: match.homeTeamName } });
      const awayTeam = await prisma.team.findUnique({ where: { name: match.awayTeamName } });
      const league = await prisma.league.findUnique({ where: { name: match.leagueName } });

      if (!homeTeam || !awayTeam || !league) continue;

      await prisma.match.upsert({
        where: { id: match.id }, // usar ID da API como PK
        update: {
          date: new Date(match.date),
          status: match.status,
          scoreHome: match.scoreHome,
          scoreAway: match.scoreAway,
        },
        create: {
          id: match.id,
          date: new Date(match.date),
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          leagueId: league.id,
          status: match.status,
          scoreHome: match.scoreHome,
          scoreAway: match.scoreAway,
        },
      });
    }

    return NextResponse.json({ message: `Importadas/Atualizadas ${matches.length} partidas` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao importar partidas" }, { status: 500 });
  }
}
