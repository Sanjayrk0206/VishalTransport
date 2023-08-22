import React, { useEffect, useState } from "react";
import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Button,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
import DListContainer from "../../components/DriverListContainer/DriverListContainer";
import VListContainer from "../../components/VehicleListContainer/VehicleListContainer";
import AddVehicle from "../../components/AddVehicle/AddVehicle";
import AddDriver from "../../components/AddDriver/AddDriver";
import { URL, BEARER_TOKEN } from "../../env";

export const Details = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(true);
  const [Dlist, setDList] = useState([]);
  const [Vlist, setVlist] = useState([]);
  const [Loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(URL, {
      method: "GET",
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    })
      .then((response) => response.json())
      .then((data) => setDList(data));

    fetch(`${URL}?sheet=${"Vehicle Details"}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setVlist(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {Loading ? (
        <Container
          w={"100%"}
          my={"20%"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Container>
      ) : (
        <>
          <Container maxW={["100%", "75%"]}>
            <Tabs isFitted>
              <TabList mb="1em">
                <Tab>Driver</Tab>
                <Tab>Vehicle</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <VStack>
                    {Dlist.map((element, index) => {
                      return (
                        <Box key={index} w={"full"}>
                          <DListContainer element={element} Vehicle={Vlist} />
                        </Box>
                      );
                    })}
                  </VStack>
                  <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    onClick={
                      title
                        ? () => {
                            setTitle(false);
                          }
                        : undefined
                    }
                  >
                    <Button colorScheme={"blue"} onClick={onOpen} mt={"5%"}>
                      Add Driver
                    </Button>
                  </Box>
                </TabPanel>
                <TabPanel>
                  {Vlist.map((element, index) => {
                    return (
                      <Box key={index} w={"full"}>
                        <VListContainer element={element} />
                      </Box>
                    );
                  })}
                  <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    onClick={
                      !title
                        ? () => {
                            setTitle(true);
                          }
                        : undefined
                    }
                  >
                    <Button colorScheme={"blue"} onClick={onOpen} mt={"5%"}>
                      Add Vehicle
                    </Button>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Container>

          <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {title ? "Vehicle Details" : "Driver Details"}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {title ? (
                  <AddVehicle list={Vlist} onClose={onClose} />
                ) : (
                  <AddDriver list={Dlist} onClose={onClose} />
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};