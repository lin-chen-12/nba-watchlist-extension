import { useState } from "preact/hooks";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import TabBar from "./components/TabBar";
import TabContent from "./components/TabContent";


function App() {
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };
  return (
    <Box p={6} maxW="md" mx="auto">
      <VStack spacing={6}>
        <Heading size="lg">NBA Watchlist</Heading>
        <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
        <TabContent activeTab={activeTab} />
        
      </VStack>
    </Box>
  );
}

export default App;


