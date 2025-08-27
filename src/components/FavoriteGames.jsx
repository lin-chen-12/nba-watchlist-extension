import { useState, useEffect } from "preact/hooks";
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Card,
  CardBody,
  Spinner,
  Alert,
  AlertIcon,
  Divider,
} from "@chakra-ui/react";
import { NBA_TEAMS } from "@/data/nbaTeams";



function FavoriteGames() {
  const [favoriteTeams, setFavoriteTeams] = useState(new Set());
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load favorites from localStorage
  useEffect(() => {
    console.log("Loading favorites from localStorage");

    const saved = localStorage.getItem("favoriteTeams");
    console.log("Saved data:", saved);

    if (saved) {
      setFavoriteTeams(new Set(JSON.parse(saved)));
    }
  }, []);

  // Fetch games when favorites change
  useEffect(() => {
    console.log(
      "useEffect triggered, favoriteTeams:",
      favoriteTeams,
      "size:",
      favoriteTeams.size
    );

    if (favoriteTeams.size > 0) {
      fetchGamesForFavoriteTeams();
    } else {
      setGames([]);
    }
  }, [favoriteTeams.size]);

  const fetchGamesForFavoriteTeams = async () => {
    console.log("Fetching games for favorite teams:", favoriteTeams);

    setLoading(true);
    setError(null);

    try {
      const allGames = [];

      // Get favorite team objects
      const favoriteTeamObjects = NBA_TEAMS.filter((team) =>
        favoriteTeams.has(team.id)
      );
      console.log("Favorite team objects:", favoriteTeamObjects);


      // Fetch games for each favorite team
      for (const team of favoriteTeamObjects) {
        const response = await fetch(
          `https://www.thesportsdb.com/api/v1/json/123/eventslast.php?id=${team.thesportsdb_id}`
        );
        console.log(`Response for ${team.name}:`, response);


        if (!response.ok) {
          throw new Error(`Failed to fetch games for ${team.name}`);
        }

        const data = await response.json();
        console.log(`Data for ${team.name}:`, data);


        if (data.results && data.results.length > 0) {
          // Add team info to each game and filter for NBA regular season
          const teamGames = data.results
            .slice(0, 5) // Get last 5 games
            .map((game) => ({
              ...game,
              favoriteTeam: team,
            }));

          allGames.push(...teamGames);
        }
      }

      // Sort games by date (most recent first)
      allGames.sort((a, b) => new Date(b.dateEvent) - new Date(a.dateEvent));
      console.log("All games:", allGames);

      setGames(allGames);
    } catch (err) {
      console.error("Error fetching games:", err);

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const GameCard = ({ game }) => {
    const isHomeGame = game.strHomeTeam === game.favoriteTeam.name;
    const homeScore = parseInt(game.intHomeScore);
    const awayScore = parseInt(game.intAwayScore);
    const favoriteTeamWon = isHomeGame
      ? homeScore > awayScore
      : awayScore > homeScore;

    return (
      <Card width="100%" mb={3}>
        <CardBody py={3}>
          <VStack spacing={2} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.500">
                {formatDate(game.dateEvent)}
              </Text>
              <Badge colorScheme={favoriteTeamWon ? "green" : "red"}>
                {favoriteTeamWon ? "W" : "L"}
              </Badge>
            </HStack>

            <HStack justify="space-between" align="center">
              <VStack spacing={1} align="start">
                <Text fontSize="sm" fontWeight={isHomeGame ? "bold" : "normal"}>
                  {game.strHomeTeam}
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight={!isHomeGame ? "bold" : "normal"}
                >
                  {game.strAwayTeam}
                </Text>
              </VStack>

              <VStack spacing={1} align="end">
                <Text fontSize="sm" fontWeight={isHomeGame ? "bold" : "normal"}>
                  {game.intHomeScore}
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight={!isHomeGame ? "bold" : "normal"}
                >
                  {game.intAwayScore}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    );
  };

  if (favoriteTeams.size === 0) {
    return (
      <VStack spacing={4} py={8}>
        <Text fontSize="lg" fontWeight="semibold">
          No Favorite Teams
        </Text>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Go to the Manage Teams tab to star your favorite teams and see their
          recent games here.
        </Text>
      </VStack>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="semibold">
          Recent Games
        </Text>
        <Text fontSize="sm" color="blue.600">
          {favoriteTeams.size} team{favoriteTeams.size !== 1 ? "s" : ""} starred
        </Text>
      </HStack>

      {loading && (
        <HStack justify="center" py={4}>
          <Spinner size="md" />
          <Text>Loading games...</Text>
        </HStack>
      )}

      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}

      {!loading && !error && games.length === 0 && (
        <Text fontSize="sm" color="gray.600" textAlign="center">
          No recent games found for your favorite teams.
        </Text>
      )}

      {!loading && !error && games.length > 0 && (
        <Box maxH="400px" overflowY="auto">
          {games.map((game, index) => (
            <GameCard key={`${game.idEvent}-${index}`} game={game} />
          ))}
        </Box>
      )}
    </VStack>
  );
}

export default FavoriteGames;