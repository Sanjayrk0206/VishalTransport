import {
  Box,
  Container,
  Divider,
  Heading,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { URL, BEARER_TOKEN } from "../../env";
import ListContainer from "../../components/TripListContainer/TripListContainer";
import DListContainer from "../../components/DriverBalContainer/DriverBalContainer";
import { AddTrip } from "../../components/AddTrip/AddTrip";

export const Dashboard = () => {
  const [Trip, setTrip] = useState([]);
  const [DList, setDList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch(`${URL}/search?&sheet=Trip&Unloaded=%00`, {
      method: "GET",
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    })
      .then((response) => response.json())
      .then((data) => setTrip(data));

    fetch(URL, {
      method: "GET",
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    })
      .then((response) => response.json())
      .then((data) => setDList(data));
  }, []);

  return (
    <>
      <Container maxW={"90%"} h={"90vh"}>
        <Box
          display={["block", "flex"]}
          justifyContent={"center"}
          h={["fit-content", "55%"]}
        >
          <Box w={"49%"} mr={"1%"}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Heading pl={"2"} size={["sm", "lg"]}>
                Vehicle Status
              </Heading>
              <Button colorScheme={"blue"} size={"sm"} onClick={onOpen}>
                Add Trip
              </Button>
            </Box>
            <Divider />
            <VStack mt={"2%"}>
              {Trip.map((element, index) => {
                return (
                  <div key={index}>
                    <ListContainer element={element} />
                  </div>
                );
              })}
            </VStack>
          </Box>
          <Box w={"49%"} ml={"1%"}>
            <Heading pl={"2"} size={["sm", "lg"]}>
              Driver Balance
            </Heading>
            <Divider />
            <VStack overflowY={"scroll"} mt={"2%"} h={"90%"}>
              {DList.map((element, index) => {
                return (
                  <div key={index}>
                    <DListContainer element={element} />
                  </div>
                );
              })}
            </VStack>
          </Box>
        </Box>
        <Box w={"100%"} my={"3"}>
          <Heading pl={"2"} size={["sm", "lg"]}>
            Upcoming Dates
          </Heading>
          <Divider />
        </Box>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{"Trip Details"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddTrip list={DList} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
