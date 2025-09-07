import { prisma } from "@/lib/prisma";
import { ApiLeagueItem, LeagueData } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://v3.football.api-sports.io/leagues?season=2025", {
      headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY! },
    });

    const data = await res.json();

    const leagues: LeagueData[] = data.response.map((item: ApiLeagueItem) => ({
      name: item.league.name,
      country: item.country.name,
      season: item.season,
      logo: item.league.logo,
    }));

    const saved = await Promise.all(
      leagues.map((league) =>
        prisma.league.upsert({
          where: { name: league.name },
          update: { country: league.country, season: league.season, logo: league.logo },
          create: league,
        })
      )
    );

    return NextResponse.json({ message: `Importados/Atualizados ${saved.length} campeonatos` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao importar campeonatos" }, { status: 500 });
  }
}
