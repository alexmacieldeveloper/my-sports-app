import { prisma } from "@/lib/prisma";
import { ApiMatchItem, MatchData } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const season = 2023;
    const countryFilter = "Brazil"; // filtro de país

    // Buscar todas as ligas brasileiras
    const leagues = await prisma.league.findMany({ where: { country: countryFilter } });

    if (leagues.length === 0) {
      return NextResponse.json({ message: `Nenhuma liga encontrada para ${countryFilter}` });
    }

    let totalImported = 0;

    for (const league of leagues) {
      console.log(`Buscando partidas para a liga: ${league.name} (API ID: ${league.apiId})`);

      const res = await fetch(
        `https://v3.football.api-sports.io/fixtures?season=${season}&league=${league.apiId}`,
        {
          headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY! },
        }
      );

      const data = await res.json();

      if (!data.response || data.response.length === 0) {
        console.log(`Nenhuma partida encontrada para a liga ${league.name}`);
        continue;
      }

      const matches: MatchData[] = data.response.map((item: ApiMatchItem) => ({
        id: item.fixture.id,
        date: item.fixture.date,
        homeTeamName: item.teams.home.name,
        awayTeamName: item.teams.away.name,
        leagueId: league.id, // liga já filtrada
        status: item.fixture.status.short,
        scoreHome: item.score.fulltime.home,
        scoreAway: item.score.fulltime.away,
      }));

      for (const match of matches) {
        // Upsert dos times
        const homeTeam = await prisma.team.upsert({
          where: { name: match.homeTeamName },
          update: {},
          create: { name: match.homeTeamName },
        });

        const awayTeam = await prisma.team.upsert({
          where: { name: match.awayTeamName },
          update: {},
          create: { name: match.awayTeamName },
        });

        try {
          await prisma.match.upsert({
            where: { id: match.id },
            update: {
              date: new Date(match.date),
              status: match.status,
              scoreHome: match.scoreHome,
              scoreAway: match.scoreAway,
              homeTeamId: homeTeam.id,
              awayTeamId: awayTeam.id,
            },
            create: {
              id: match.id,
              date: new Date(match.date),
              homeTeamId: homeTeam.id,
              awayTeamId: awayTeam.id,
              leagueId: match.leagueId,
              status: match.status,
              scoreHome: match.scoreHome,
              scoreAway: match.scoreAway,
            },
          });
          totalImported++;
        } catch (err) {
          console.error(`Erro ao salvar partida ${match.id}:`, err);
        }
      }
    }

    return NextResponse.json({ message: `Importadas/Atualizadas ${totalImported} partidas do Brasil` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao importar partidas" }, { status: 500 });
  }
}
