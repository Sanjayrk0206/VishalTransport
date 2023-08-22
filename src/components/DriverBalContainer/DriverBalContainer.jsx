import {
  Badge,
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
          <Badge
            colorScheme={"linkedin"}
            h={"fit-content"}
            py={"1.5"}
            px={"3"}
            my={["2", "unset"]}
          >
            {props.element["Vehicle Number"]}
          </Badge>
        </CardHeader>
        <CardBody py={0} mb={"4%"} display={"inline-flex"} flexWrap={"wrap"}>
          <Text mx={"1"} fontWeight={"bold"}>
            Paid:
          </Text>
          <Text mx={"1"}>{props.element.Trip_Paid}</Text>
          <Text mx={"1"} fontWeight={"bold"}>
            Unpaid:
          </Text>
          <Text mx={"1"}>{props.element.Trip_Unpaid}</Text>
          <Text mx={"1"} fontWeight={"bold"}>
            Total:
          </Text>
          <Text mx={"1"}>{props.element.Trip_Total}</Text>
        </CardBody>
      </Card>
    </Container>
  );
};

export default DListContainer;
