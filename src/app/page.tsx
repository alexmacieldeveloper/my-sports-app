"use client";

import { useState } from "react";
import { useTeams, Team } from "@/hooks/useTeams";
import { TeamCard } from "@/components/TeamCard";

export default function Home() {
  const { teams, loading } = useTeams();
  const [visibleCount, setVisibleCount] = useState(20);
  const [search, setSearch] = useState("");

  const filteredTeams = teams.filter((team: Team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  const visibleTeams = filteredTeams.slice(0, visibleCount);

  return (
    <main className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">⚽ Times</h1>
      <input
        type="text"
        placeholder="Buscar time..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setVisibleCount(20); 
        }}
        className="border p-2 rounded mb-6 w-80"
      />

      {loading ? (
        <p>Carregando...</p>
      ) : filteredTeams.length === 0 ? (
        <p>Nenhum time encontrado.</p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            {visibleTeams.map((team) => (
              <TeamCard
                key={team.id}
                name={team.name}
                logo={team.logo}
                code={team.code}
                country={team.country}
              />
            ))}
          </div>

          {visibleCount < filteredTeams.length && (
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
