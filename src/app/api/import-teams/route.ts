import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface TeamData {
  name: string;
  code?: string;
  country?: string;
  logo?: string;
}

interface ApiFootballResponse {
  team: {
    name: string;
    code?: string;
    country?: string;
    logo?: string;
  };
}

export async function GET() {
  try {
    const res = await fetch(
      "https://v3.football.api-sports.io/teams?country=Brazil",
      {
        headers: {
          "x-apisports-key": process.env.API_FOOTBALL_KEY as string,
        },
      }
    );

    const data = await res.json();

    const teams:TeamData[] = data.response.map((item: ApiFootballResponse) => ({
      name: item.team.name,
      code: item.team.code,
      country: item.team.country,
      logo: item.team.logo,
    }));
    
    const promises = teams.map((team) =>
      prisma.team.upsert({
        where: { name: team.name },
        update: { code: team.code, country: team.country, logo: team.logo },
        create: team,
      })
    );

    const saved = await Promise.all(promises);

    return NextResponse.json({
      message: `Importados/Atualizados ${saved.length} times`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao importar times" },
      { status: 500 }
    );
  }
}
