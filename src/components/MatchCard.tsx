"use client";

import Image from "next/image";

interface MatchCardProps {
  homeTeamName: string;
  homeTeamLogo?: string;
  awayTeamName: string;
  awayTeamLogo?: string;
  date: string;
  scoreHome?: number;
  scoreAway?: number;
  status?: string;
}

export function MatchCard({
  homeTeamName,
  homeTeamLogo,
  awayTeamName,
  awayTeamLogo,
  date,
  scoreHome,
  scoreAway,
  status,
}: MatchCardProps) {
  const matchDate = new Date(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="border p-4 rounded flex flex-col items-center bg-white shadow">
      <p className="text-sm text-gray-500 mb-2">{matchDate} {status && `- ${status}`}</p>
      <div className="flex items-center justify-between w-full">
        {/* Home Team */}
        <div className="flex flex-col items-center">
          {homeTeamLogo && <Image src={homeTeamLogo} alt={homeTeamName} width={50} height={50} />}
          <span className="mt-2 font-semibold">{homeTeamName}</span>
        </div>

        {/* Score */}
        <div className="text-xl font-bold">
          {scoreHome ?? "-"} : {scoreAway ?? "-"}
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center">
          {awayTeamLogo && <Image src={awayTeamLogo} alt={awayTeamName} width={50} height={50} />}
          <span className="mt-2 font-semibold">{awayTeamName}</span>
        </div>
      </div>
    </div>
  );
}
