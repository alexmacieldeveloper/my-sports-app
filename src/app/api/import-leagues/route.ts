import { prisma } from "@/lib/prisma";
import { ApiLeagueItem, LeagueData } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const countryFilter = "Brazil"; // Filtra apenas ligas do Brasil
    const season = 2023;

    // Busca ligas da API
    const res = await fetch(`https://v3.football.api-sports.io/leagues?season=${season}`, {
      headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY! },
    });

    const data = await res.json();

    if (!data.response || !Array.isArray(data.response)) {
      return NextResponse.json({ error: "Nenhuma liga encontrada na API" }, { status: 404 });
    }

    // Filtra ligas do Brasil e mapeia para nosso formato
    const leagues: LeagueData[] = data.response
      .filter((item: ApiLeagueItem) => item.country.name === countryFilter)
      .map((item: ApiLeagueItem) => ({
        apiId: item.league.id, // ID único da API
        name: item.league.name,
        country: item.country?.name ?? "Unknown",
        season: item.season,
        logo: item.league.logo,
      }));

    console.log("Ligas filtradas:", leagues.map(l => l.name));

    // Salva ou atualiza sem duplicar
    const saved = await Promise.all(
      leagues.map(async (league) => {
        try {
          return await prisma.league.upsert({
            where: { apiId: league.apiId }, // garante unicidade pelo apiId
            update: { 
              name: league.name, 
              country: league.country, 
              season: league.season, 
              logo: league.logo 
            },
            create: league, // cria caso não exista
          });
        } catch (err) {
          console.error(`Erro ao salvar a liga ${league.name}:`, err);
          return null;
        }
      })
    );

    const savedCount = saved.filter(Boolean).length;
    console.log(`Total de ligas salvas/atualizadas: ${savedCount}`);

    return NextResponse.json({ message: `Importados/Atualizados ${savedCount} campeonatos` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao importar campeonatos" }, { status: 500 });
  }
}
