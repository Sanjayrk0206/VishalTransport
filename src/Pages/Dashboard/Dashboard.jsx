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
  Spinner,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { USERNAME, TOKEN, URL } from "../../env";
import ListContainer from "../../components/TripListContainer/TripListContainer";
import DListContainer from "../../components/DriverBalContainer/DriverBalContainer";
import { AddTrip } from "../../components/AddTrip/AddTrip";

const base64 = require("base-64");

export const Dashboard = () => {
  const [Trip, setTrip] = useState([]);
  const [DList, setDList] = useState([]);
  const [Vlist, setVlist] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${URL}/TripDetailsApi?TripDone=false`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + base64.encode(USERNAME + ":" + TOKEN),
      },
    })
      .then((response) => response.json())
      .then((data) => setTrip(data));

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

  return Loading ? (
    <>
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
    </>
  ) : (
    <>
      <Container maxW={"90%"} h={"90vh"}>
        <Box
          display={["block", "flex"]}
          justifyContent={"center"}
          h={["fit-content", "55%"]}
        >
          <Box w={["100%", "49%"]} mr={[0, "1%"]}>
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
          <Box w={["100%", "49%"]} ml={[0, "1%"]} mt={["5%", 0]}>
            <Heading pl={"2"} size={["sm", "lg"]}>
              Driver Balance
            </Heading>
            <Divider />
            <VStack overflowY={"scroll"} mt={"5%"} pb={"5%"}>
              {DList.map((element, index) => {
                return (
                  <Box key={index} w={"100%"}>
                    <DListContainer element={element} />
                  </Box>
                );
              })}
            </VStack>
          </Box>
        </Box>
        {/* <Box w={"100%"} my={"3"}>
          <Heading pl={"2"} size={["sm", "lg"]}>
            Upcoming Dates
          </Heading>
          <Divider />
        </Box> */}
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{"Trip Details"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddTrip Dlist={DList} Vlist={Vlist} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
