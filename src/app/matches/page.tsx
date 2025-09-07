"use client";

import { useState } from "react";
import { useMatches, Match } from "@/hooks/useMatches";
import { MatchCard } from "@/components/MatchCard";

export default function MatchesPage() {
  const { matches, loading } = useMatches();
  const [visibleCount, setVisibleCount] = useState(20);

  const visibleMatches = matches.slice(0, visibleCount);

  return (
    <main className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">📅 Partidas</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : matches.length === 0 ? (
        <p>Nenhuma partida encontrada.</p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visibleMatches.map((match: Match) => (
              <MatchCard
                key={match.id}
                homeTeamName={match.homeTeamName}
                homeTeamLogo={match.homeTeamLogo}
                awayTeamName={match.awayTeamName}
                awayTeamLogo={match.awayTeamLogo}
                date={match.date}
                scoreHome={match.scoreHome}
                scoreAway={match.scoreAway}
                status={match.status}
              />
            ))}
          </div>

          {visibleCount < matches.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 20)}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Carregar mais
            </button>
          )}
        </>
      )}
    </main>
  );
}
