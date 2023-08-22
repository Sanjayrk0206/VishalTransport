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
} from "@chakra-ui/react";
import React from "react";

const ListContainer = (props) => {
  return (
    <Container>
      {console.log(props.element)}
      <Card size={"md"} variant={"elevated"}>
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
            {props.element.isTrip ? <>on Trip</> : <>Trip Done</>}
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
            <Text mx={"1"}>{props.element.LoadedQuantity} kgs.</Text>
          </Box>
          {props.element.isTrip ? (
            <Button size={"sm"} colorScheme={"green"}>
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
  );
};

export default ListContainer;
