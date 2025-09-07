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

export default function LeagueList() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h1>Ligas do Brasil</h1>
      <ul>
        {leagues.map((league) => (
          <li key={league.id} style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
            {league.logo && (
                <div style={{ width: 40, height: 40, position: "relative" }}>
                <Image 
                    src={league.logo} 
                    alt={league.name} 
                    fill
                    style={{ objectFit: "contain" }}
                />
                </div>
            )}
            <div>
              <strong>{league.name}</strong> ({league.season})
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
