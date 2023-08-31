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
import { USERNAME, TOKEN, URL } from "../../env";

const base64 = require("base-64");

export const Details = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(true);
  const [Dlist, setDList] = useState([]);
  const [Vlist, setVlist] = useState([]);
  const [Loading, setLoading] = useState();
  const [Driver, setDriver] = useState();
  const [Vehicle, setVehicle] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(`${URL}/DriverDetailsApi`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + base64.encode(USERNAME + ":" + TOKEN),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setDList(data);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch(`${URL}/VehicleDetailsApi`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + base64.encode(USERNAME + ":" + TOKEN),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setVlist(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
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
                  <VStack
                    onClick={
                      title
                        ? () => {
                            setTitle(false);
                          }
                        : undefined
                    }
                  >
                    {Dlist.map((element, index) => {
                      return (
                        <Box
                          id={element.__id}
                          key={index}
                          w={"full"}
                          onClick={(e) => {
                            setDriver(
                              Dlist.find(
                                (x) => x.__id === parseInt(e.currentTarget.id)
                              )
                            );
                          }}
                        >
                          <DListContainer
                            element={element}
                            Vehicle={Vlist}
                            onOpen={onOpen}
                          />
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
                  <VStack
                    onClick={
                      title
                        ? () => {
                            setTitle(true);
                          }
                        : undefined
                    }
                  >
                    {Vlist.map((element, index) => {
                      return (
                        <Box
                          id={element.Registration}
                          key={index}
                          w={"full"}
                          onClick={(e) => {
                            setVehicle(
                              Vlist.find(
                                (x) => x.Registration === e.currentTarget.id
                              )
                            );
                          }}
                        >
                          <VListContainer element={element} onOpen={onOpen} />
                        </Box>
                      );
                    })}
                  </VStack>
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
                  <AddVehicle list={Vlist} element={Vehicle} />
                ) : (
                  <AddDriver list={Dlist} element={Driver} />
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};
