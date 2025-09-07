"use client";

import { useEffect, useState } from "react";

export interface Match {
  id: number;
  homeTeamName: string;
  homeTeamLogo?: string;
  awayTeamName: string;
  awayTeamLogo?: string;
  date: string;
  scoreHome?: number;
  scoreAway?: number;
  status?: string;
}

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/matches")
      .then((res) => res.json())
      .then((data) => setMatches(data))
      .finally(() => setLoading(false));
  }, []);

  return { matches, loading };
}
