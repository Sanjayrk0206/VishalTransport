import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import HireTable from "../../components/HireContainer/HireTable";
import BattaTable from "../../components/BattaContainer/BattaTable";
import DeleteDialog from "../../utils/DeleteDialog";

export const Batta = () => {
  const [Selected, setSelected] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isTrip, setisTrip] = useState(false);
  const [isBatta, setisBatta] = useState(false);

  return (
    <Container maxW={"85%"} m={0} mx={"7.5%"}>
      <Tabs isFitted>
        <TabList>
          <Tab>Hire</Tab>
          <Tab>Batta</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <HireTable
              onOpen={onOpen}
              setSelected={setSelected}
              setisTrip={setisTrip}
              setisBatta={setisBatta}
            />
          </TabPanel>
          <TabPanel>
            <BattaTable
              onOpen={onOpen}
              setSelected={setSelected}
              setisTrip={setisTrip}
              setisBatta={setisBatta}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <DeleteDialog
        id={Selected}
        isTrip={isTrip}
        isBatta={isBatta}
        onClose={onClose}
        isOpen={isOpen}
      />
    </Container>
  );
};
