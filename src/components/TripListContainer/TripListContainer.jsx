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
import React from "react";
import { EndTrip } from "../EndTrip/EndTrip";

const ListContainer = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Container px={0}>
        <Card size={["lg", "md"]} variant={"elevated"}>
          <CardHeader display={"inline-flex"} justifyContent={"space-between"}>
            <Heading size={"md"}>
              {props.element.Driver} | {props.element.Vehicle}
            </Heading>
            <Badge
              colorScheme={props.element.isTrip ? "yellow" : "green"}
              h={"fit-content"}
              py={"1.5"}
              px={"3"}
            >
              On Trip
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
            <Button size={"sm"} colorScheme={"green"} onClick={onOpen}>
              Trip Done
            </Button>
          </CardFooter>
        </Card>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{"Trip Details"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EndTrip
              element={props.element}
              Vlist={props.Vlist}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ListContainer;
