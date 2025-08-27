import { useState } from "preact/hooks";
import { Box, Tabs, TabList, Tab } from "@chakra-ui/react";

function TabBar({ activeTab, onTabChange }) {
  return (
    <Box width="100%" mb={4}>
      <Tabs
        index={activeTab}
        onChange={onTabChange}
        variant="enclosed"
        colorScheme="blue"
      >
        <TabList>
          <Tab>Favorite Teams</Tab>
          {/* <Tab>All Teams</Tab> */}
          <Tab>Manage Teams</Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}

export default TabBar;
