import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import HireTable from "../../components/HireContainer/HireTable";
import BattaTable from "../../components/BattaContainer/BattaTable";

export const Batta = () => {
  return (
    <Container maxW={"85%"} m={0} mx={"7.5%"}>
      <Tabs isFitted>
        <TabList>
          <Tab>Hire</Tab>
          <Tab>Batta</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <HireTable />
          </TabPanel>
          <TabPanel>
            <BattaTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
