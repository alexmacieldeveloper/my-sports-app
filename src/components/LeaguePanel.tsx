"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type League = {
  id: number;
  apiId: number;
  name: string;
  country: string;
  season: number;
  logo: string;
};

export default function LeaguePanel() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [countryFilter, setCountryFilter] = useState("Brazil");
  const [seasonFilter, setSeasonFilter] = useState<number | "All">("All");

  useEffect(() => {
    async function fetchLeagues() {
      const res = await fetch("/api/leagues");
      const data = await res.json();
      setLeagues(data.leagues);
      setLoading(false);
    }

    fetchLeagues();
  }, []);

  if (loading) return <p>Carregando ligas...</p>;

  // Aplica filtros
  const filteredLeagues = leagues.filter((league) => {
    const countryMatch = league.country === countryFilter;
    const seasonMatch = seasonFilter === "All" || league.season === seasonFilter;
    return countryMatch && seasonMatch;
  });

  // Obtem todas as temporadas disponíveis para o filtro
  const seasons = Array.from(new Set(leagues.map((l) => l.season))).sort((a, b) => b - a);

  return (
    <div>
      <h1>Painel de Ligas</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>
          País: 
          <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} style={{ marginLeft: "10px", marginRight: "20px" }}>
            {[...new Set(leagues.map((l) => l.country))].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label>
          Temporada: 
          <select value={seasonFilter} onChange={(e) => setSeasonFilter(e.target.value === "All" ? "All" : Number(e.target.value))} style={{ marginLeft: "10px" }}>
            <option value="All">Todas</option>
            {seasons.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Logo</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Nome</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>País</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Temporada</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeagues.map((league) => (
            <tr key={league.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {league.logo && 
                    <div style={{ width: 40, height: 40, position: "relative" }}>
                        <Image 
                            src={league.logo} 
                            alt={league.name} 
                            fill
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                }
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{league.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{league.country}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{league.season}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
