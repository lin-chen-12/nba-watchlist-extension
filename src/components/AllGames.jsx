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
  SimpleGrid,
} from "@chakra-ui/react";
import { NBA_TEAMS } from "@/data/nbaTeams";

function AllGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllTeamsLastGame();
  }, []);

  const fetchAllTeamsLastGame = async () => {
    setLoading(true);
    setError(null);

    try {
      const allGames = [];

      // Fetch games for all 30 teams
      for (const team of NBA_TEAMS) {
        try {
          const response = await fetch(
            `https://www.thesportsdb.com/api/v1/json/123/eventslast.php?id=${team.thesportsdb_id}`
          );

          if (!response.ok) {
            console.warn(`Failed to fetch games for ${team.name}`);
            continue; // Skip this team and continue with others
          }

          const data = await response.json();

          if (data.results && data.results.length > 0) {
            // Get the most recent game (first in the array)
            const mostRecentGame = data.results[0];

            // Add team info to the game
            allGames.push({
              ...mostRecentGame,
              team: team,
            });
          }
        } catch (teamError) {
          console.warn(`Error fetching games for ${team.name}:`, teamError);
          // Continue with other teams
        }
      }

      // Sort games by date (most recent first)
      allGames.sort((a, b) => new Date(b.dateEvent) - new Date(a.dateEvent));

      setGames(allGames);
    } catch (err) {
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
    const isHomeGame = game.strHomeTeam === game.team.name;
    const homeScore = parseInt(game.intHomeScore);
    const awayScore = parseInt(game.intAwayScore);
    const teamWon = isHomeGame ? homeScore > awayScore : awayScore > homeScore;

    return (
      <Card width="100%">
        <CardBody py={3}>
          <VStack spacing={2} align="stretch">
            <HStack justify="space-between">
              <Badge colorScheme="blue" fontSize="xs">
                {game.team.abbreviation}
              </Badge>
              <Text fontSize="xs" color="gray.500">
                {formatDate(game.dateEvent)}
              </Text>
            </HStack>

            <HStack justify="space-between" align="center">
              <VStack spacing={1} align="start" flex={1}>
                <Text fontSize="xs" fontWeight={isHomeGame ? "bold" : "normal"}>
                  {game.strHomeTeam}
                </Text>
                <Text
                  fontSize="xs"
                  fontWeight={!isHomeGame ? "bold" : "normal"}
                >
                  {game.strAwayTeam}
                </Text>
              </VStack>

              <VStack spacing={1} align="center">
                <Text fontSize="xs" fontWeight={isHomeGame ? "bold" : "normal"}>
                  {game.intHomeScore}
                </Text>
                <Text
                  fontSize="xs"
                  fontWeight={!isHomeGame ? "bold" : "normal"}
                >
                  {game.intAwayScore}
                </Text>
              </VStack>

              <Badge
                colorScheme={teamWon ? "green" : "red"}
                fontSize="xs"
                minW="20px"
              >
                {teamWon ? "W" : "L"}
              </Badge>
            </HStack>

            {game.strLeague && (
              <Text fontSize="xs" color="gray.400" textAlign="center">
                {game.strLeague}
              </Text>
            )}
          </VStack>
        </CardBody>
      </Card>
    );
  };

  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="semibold">
          All Teams - Recent Games
        </Text>
        <Text fontSize="sm" color="blue.600">
          {games.length} teams
        </Text>
      </HStack>

      {loading && (
        <VStack spacing={2} py={8}>
          <Spinner size="lg" />
          <Text>Loading recent games for all teams...</Text>
          <Text fontSize="sm" color="gray.600">
            This may take a moment as we fetch data for 30 teams
          </Text>
        </VStack>
      )}

      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}

      {!loading && !error && games.length === 0 && (
        <Text fontSize="sm" color="gray.600" textAlign="center">
          No recent games found.
        </Text>
      )}

      {!loading && !error && games.length > 0 && (
        <Box maxH="500px" overflowY="auto">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
            {games.map((game, index) => (
              <GameCard key={`${game.idEvent}-${index}`} game={game} />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </VStack>
  );
}

export default AllGames;
