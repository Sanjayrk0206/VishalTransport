import { Container, VStack } from "@chakra-ui/react";
import React from "react";
import ListContainer from "../../components/ListContainer/ListContainer";

const list = [
  {
    Driver: "Manikandan",
    Vehicle: "TN28BH7906",
    From: "Raman Traders, Pondy",
    To: "KRPL, Chennai",
    LoadedQuantity: "23560",
    UnloadedQuantity: "",
    isTrip: true,
  },
  {
    Driver: "Mohandoss",
    Vehicle: "TN03R4299",
    From: "Raman Traders, Pondy",
    To: "KRPL, Chennai",
    LoadedQuantity: "23560",
    UnloadedQuantity: "23550",
    isTrip: false,
  },
];

export const ViewPage = () => {
  return (
    <Container>
      <VStack>
        {list.map((element) => {
          return <ListContainer element={element} />;
        })}
      </VStack>
    </Container>
  );
};
