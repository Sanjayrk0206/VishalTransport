import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { EndTrip } from "../EndTrip/EndTrip";

const ListContainer = (props) => {
  const [isTrip, setisTrip] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (props.element.Unloaded) {
      setisTrip(false);
    }
  }, [props.element.Unloaded]);

  return (
    <>
      <Container px={0}>
        <Card size={["lg", "md"]} variant={"elevated"}>
          <CardHeader display={"inline-flex"} justifyContent={"space-between"}>
            <Heading size={"md"}>
              {props.element.Name} | {props.element.Vehicle}
            </Heading>
            <Badge
              colorScheme={props.element.isTrip ? "yellow" : "green"}
              h={"fit-content"}
              py={"1.5"}
              px={"3"}
            >
              {isTrip ? <>on Trip</> : <>Trip Done</>}
            </Badge>
          </CardHeader>
          <CardBody py={0} display={"inline-flex"}>
            <Text mx={"1"} fontWeight={"bold"}>
              From:
            </Text>
            <Text mx={"1"}>{props.element.From}</Text>
            <Text mx={"1"} fontWeight={"bold"}>
              To:
            </Text>
            <Text mx={"1"}>{props.element.To}</Text>
          </CardBody>
          <CardFooter display={"flex"} pt={0} justifyContent={"space-between"}>
            <Box display={"inline-flex"} fontSize={"sm"}>
              <Text mx={"1"} fontWeight={"bold"}>
                Loaded Quantity:
              </Text>
              <Text mx={"1"}>{props.element.Loaded} kgs.</Text>
            </Box>
            {isTrip ? (
              <Button size={"sm"} colorScheme={"green"} onClick={onOpen}>
                Trip Done
              </Button>
            ) : (
              <Box display={"inline-flex"} fontSize={"sm"}>
                <Text mx={"1"} fontWeight={"bold"}>
                  Unloaded Quantity:
                </Text>
                <Text mx={"1"}>{props.element.UnloadedQuantity} kgs.</Text>
              </Box>
            )}
          </CardFooter>
        </Card>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{"Trip Details"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EndTrip element={props.element} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ListContainer;
