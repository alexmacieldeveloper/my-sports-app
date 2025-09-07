import { useEffect, useState } from "react";

export interface Team {
  id: number;
  name: string;
  code?: string;
  country?: string;
  logo?: string;
}

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .finally(() => setLoading(false));
  }, []);

  return { teams, loading, setTeams };
}
