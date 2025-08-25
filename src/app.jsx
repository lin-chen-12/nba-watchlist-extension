import { useState } from "preact/hooks";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Box p={6} maxW="md" mx="auto">
      <VStack spacing={4}>
        <Heading size="lg">NBA Watchlist</Heading>
        <Button
          colorScheme="blue"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </Button>
      </VStack>
    </Box>
  );
}

export default App;