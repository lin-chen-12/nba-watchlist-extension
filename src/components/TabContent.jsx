import { Box, Text, VStack } from "@chakra-ui/react";
import ManageTeams from "./ManageTeams";

function TabContent({ activeTab }) {
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <VStack spacing={4}>
            <Text fontSize="lg" fontWeight="semibold">
              Favorite Games Scores
            </Text>
            <Text color="gray.600">
              Your favorited teams' games will appear here
            </Text>
          </VStack>
        );
      case 1:
        return (
          <VStack spacing={4}>
            <Text fontSize="lg" fontWeight="semibold">
              All Games Scores
            </Text>
            <Text color="gray.600">All NBA games will be displayed here</Text>
          </VStack>
        );
      case 2:
        return (
          <VStack spacing={4}>
            <Text fontSize="lg" fontWeight="semibold">
              Manage Teams
            </Text>
            <Text color="gray.600">
              Favorite/unfavorite NBA teams to customize your watchlist
            </Text>


            return <ManageTeams />;
          </VStack>
        );
      default:
        return <Text>Content not found</Text>;
    }
  };

  return (
    <Box p={4} minH="300px">
      {renderContent()}
    </Box>
  );
}

export default TabContent;
