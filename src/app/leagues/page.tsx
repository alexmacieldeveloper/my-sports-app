import { prisma } from "@/lib/prisma";
import { Box, Card, CardContent, CardMedia, Grid, Typography, Container } from "@mui/material";

async function getLeagues() {
    return await prisma.league.findMany({
        orderBy: { country: "asc" },
    });
}

export default async function LeaguesPage() {
    const leagues = await getLeagues();

    return (
        <Container maxWidth="lg">
            <Box p={4}>
                <Typography variant="h4" mb={4}>
                    Ligas de Futebol
                </Typography>
                <Grid container spacing={3}>
                    {leagues.map((league) => (
                        <Grid key={league.id}>
                            <Card>
                                {league.logo && (
                                    <CardMedia
                                        component="img"
                                        height={140}
                                        image={league.logo}
                                        alt={league.name}
                                    />
                                )}
                                <CardContent>
                                    <Typography variant="h6">{league.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {league.country} {league.season ? `- ${league.season}` : ""}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
