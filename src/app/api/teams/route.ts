import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const teams = await prisma.team.findMany({ orderBy: { id: "desc" } });
    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar times" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const team = await prisma.team.create({ data });
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar time" }, { status: 500 });
  }
}
