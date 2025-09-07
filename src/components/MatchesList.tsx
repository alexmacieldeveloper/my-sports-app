"use client";

import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid, CircularProgress, Avatar, Stack } from "@mui/material";

type Match = {
  id: number;
  date: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  scoreHome: number | null;
  scoreAway: number | null;
  status: string;
};

export default function MatchesList() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch("/api/matches");
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error("Erro ao buscar partidas:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h4" mb={2}>Partidas do Brasil</Typography>
      <Grid container spacing={2}>
        {matches.map((match) => {
          const statusColor = match.status === "FT" ? "green" : match.status === "NS" ? "orange" : "blue";

          return (
            <Grid key={match.id}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary" mb={1}>
                    {new Date(match.date).toLocaleString()}
                  </Typography>

                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {match.homeTeamLogo && <Avatar src={match.homeTeamLogo} alt={match.homeTeamName} />}
                      <Typography variant="h6">{match.homeTeamName}</Typography>
                    </Stack>

                    <Typography variant="h6">
                      {match.scoreHome ?? "-"} x {match.scoreAway ?? "-"}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="h6">{match.awayTeamName}</Typography>
                      {match.awayTeamLogo && <Avatar src={match.awayTeamLogo} alt={match.awayTeamName} />}
                    </Stack>
                  </Stack>

                  <Typography variant="body2" sx={{ color: statusColor }}>
                    Status: {match.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
