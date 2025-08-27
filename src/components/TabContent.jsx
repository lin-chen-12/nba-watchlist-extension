import { Box, Text, VStack } from "@chakra-ui/react";
import ManageTeams from "./ManageTeams";
import FavoriteGames from "./FavoriteGames";
// import AllGames from "./AllGames";

function TabContent({ activeTab }) {
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <FavoriteGames />;
        
      // case 1:

      //   return <AllGames />;

        // return (
        //   <VStack spacing={4}>
        //     <Text fontSize="lg" fontWeight="semibold">
        //       All Teams Scores
        //     </Text>
        //     <Text color="gray.600">All NBA games will be displayed here</Text>
        //   </VStack>
        // );
      case 1:
        return (
          <VStack spacing={4}>

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
