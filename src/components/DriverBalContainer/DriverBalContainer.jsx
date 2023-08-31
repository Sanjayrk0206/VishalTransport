import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  Text,
  Box,
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
          <Box display={"inline-flex"}>
            <Text mx={"1"} fontWeight={"bold"}>
              Trips:
            </Text>
            <Text mx={"1"}>{props.element.Trips}</Text>
            <Text mx={"1"} fontWeight={"bold"}>
              Advance:
            </Text>
            <Text mx={"1"}>{props.element.TotalAdvance}</Text>
          </Box>
        </CardBody>
      </Card>
    </Container>
  );
};

export default DListContainer;
