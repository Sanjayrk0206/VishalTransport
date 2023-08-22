import { Box, Container, Divider, Heading } from "@chakra-ui/react";
import React from "react";

export const Dashboard = () => {
  return (
    <Container maxW={"90%"} h={"90vh"}>
      <Box
        display={["block", "flex"]}
        justifyContent={"center"}
        h={["fit-content", "55%"]}
      >
        <Box w={"49%"} mr={"1%"}>
          <Heading pl={"2"} size={["sm", "lg"]}>
            Vehicle Status
          </Heading>
          <Divider />
        </Box>
        <Box w={"49%"} ml={"1%"}>
          <Heading pl={"2"} size={["sm", "lg"]}>
            Driver Balance
          </Heading>
          <Divider />
        </Box>
      </Box>
      <Box w={"100%"} my={"3"}>
        <Heading pl={"2"} size={["sm", "lg"]}>
          Upcoming Dates
        </Heading>
        <Divider />
      </Box>
    </Container>
  );
};
