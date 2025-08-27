import { useState, useEffect } from "preact/hooks";
import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { StarIcon, SearchIcon } from "@chakra-ui/icons";
import { NBA_TEAMS } from "@/data/nbaTeams.js";

function ManageTeams() {
  const [favoriteTeams, setFavoriteTeams] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("favoriteTeams");
    if (saved) {
      setFavoriteTeams(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favoriteTeams", JSON.stringify([...favoriteTeams]));
  }, [favoriteTeams]);


  // create new set newFavorites to compare, if current team being toggled exists already
  // remove it, else add it
  const toggleFavorite = (teamId) => {
    const newFavorites = new Set(favoriteTeams);
    if (newFavorites.has(teamId)) {
      newFavorites.delete(teamId);
    } else {
      newFavorites.add(teamId);
    }
    setFavoriteTeams(newFavorites);
  };

  // from NBA_TEAMS, filter based on search term by name, city, abbrevation
  // filteredTeams is the search results
  const filteredTeams = NBA_TEAMS.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.abbreviation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const eastTeams = filteredTeams.filter((team) => team.conference === "East");
  const westTeams = filteredTeams.filter((team) => team.conference === "West");

  const TeamCard = ({ team }) => (
    <Card
      key={team.id}
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ transform: "translateY(-2px)", shadow: "md" }}
      bg={favoriteTeams.has(team.id) ? "blue.50" : "white"}
      borderColor={favoriteTeams.has(team.id) ? "blue.200" : "gray.200"}
      borderWidth="1px"
      width="100%"
    >
      <CardBody py={3}>
        <HStack justify="space-between" align="center">
          <HStack spacing={3}>
            <Badge colorScheme={team.conference === "East" ? "blue" : "red"}>
              {team.conference}
            </Badge>
            <Text fontWeight="bold" fontSize="md">
              {team.abbreviation}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {team.name}
            </Text>
          </HStack>
          
          <Button
            size="xs"
            variant={favoriteTeams.has(team.id) ? "solid" : "outline"}
            colorScheme="yellow"
            onClick={() => toggleFavorite(team.id)}
          >
            {favoriteTeams.has(team.id) ? "★" : "☆"}
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );

  return (
    <VStack spacing={6} align="stretch">
      <VStack spacing={4}>
        <Text fontSize="lg" fontWeight="semibold">
          Manage Your Favorite Teams
        </Text>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Favorite/unfavorite teams to see their games in the Favorites tab
        </Text>

        <InputGroup maxW="300px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <Text fontSize="sm" color="blue.600">
          {favoriteTeams.size} team{favoriteTeams.size !== 1 ? "s" : ""} favorited
        </Text>
      </VStack>

      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Eastern Conference ({eastTeams.length})</Tab>
          <Tab>Western Conference ({westTeams.length})</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing={2} align="stretch" maxH="400px" overflowY="auto">
              {eastTeams.map(team => <TeamCard key={team.id} team={team} />)}
            </VStack>
          </TabPanel>
          
          <TabPanel>
            <VStack spacing={2} align="stretch" maxH="400px" overflowY="auto">
              {westTeams.map(team => <TeamCard key={team.id} team={team} />)}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}

export default ManageTeams;
