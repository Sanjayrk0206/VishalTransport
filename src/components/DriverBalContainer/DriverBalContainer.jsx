import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";

const DListContainer = (props) => {
  return (
    <Container w={"100%"}>
      <Card size={["lg", "md"]} variant={"elevated"}>
        <CardHeader
          display={["inline-block", "inline-flex"]}
          justifyContent={"space-between"}
        >
          <Heading size={"md"}>{props.element.Name}</Heading>
        </CardHeader>
        <CardBody py={0} mb={"4%"} display={"inline-flex"} flexWrap={"wrap"}>
          <Text mx={"1"} fontWeight={"bold"}>
            Unpaid:
          </Text>
          <Text mx={"1"}>{props.element.UnpaidTrip}</Text>
          <Text mx={"1"} fontWeight={"bold"}>
            Total:
          </Text>
          <Text mx={"1"}>{props.element.TotalTrip}</Text>
          <Text mx={"1"} fontWeight={"bold"}>
            Advance:
          </Text>
          <Text mx={"1"}>{props.element.TotalAdvance}</Text>
          <Text mx={"1"} fontWeight={"bold"}>
            Batta:
          </Text>
          <Text mx={"1"}>{props.element.Batta}</Text>
        </CardBody>
      </Card>
    </Container>
  );
};

export default DListContainer;
