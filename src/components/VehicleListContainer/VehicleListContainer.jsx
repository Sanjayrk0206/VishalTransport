import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
  Text,
  Box,
  useDisclosure,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import DeleteDialog from "../../utils/DeleteDialog";

const VListContainer = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container my={"3"}>
      <Card size={["lg", "md"]} variant={"elevated"}>
        <CardHeader
          display={["inline-block", "inline-flex"]}
          justifyContent={"space-between"}
        >
          <Heading size={"md"}>{props.element.Registration}</Heading>
          <Box>
            <Badge
              colorScheme={"linkedin"}
              h={"fit-content"}
              py={"1.5"}
              px={"3"}
              mx={"0.5"}
              my={["2", "unset"]}
            >
              {props.element["Insurance Expiry Date"]}
            </Badge>
            <Badge
              colorScheme={"green"}
              h={"fit-content"}
              py={"1.5"}
              px={"3"}
              mx={"0.5"}
              my={["2", "unset"]}
            >
              {props.element["RC Validity Date"]}
            </Badge>
          </Box>
        </CardHeader>
        <CardBody py={0} display={["inline-block", "inline-flex"]}>
          <Text mx={"1"} fontWeight={"bold"}>
            Chassis No.:
          </Text>
          <Text mx={"1"}>{props.element.Chassis}</Text>
          <Text mx={"1"} fontWeight={"bold"}>
            Engine No.:
          </Text>
          <Text mx={"1"}>{props.element.Engine}</Text>
        </CardBody>
        <CardFooter
          display={["block", "flex"]}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <VStack w={"60%"}>
            <HStack flexWrap={["wrap", "unset"]}>
              <Text mx={"1"} fontWeight={"bold"} minW={"fit-content"}>
                NP Date:
              </Text>
              <Text mx={"1"}>{props.element["NP Date"]}</Text>
              <Text mx={"1"} fontWeight={"bold"} minW={"fit-content"}>
                MP Tax Date:
              </Text>
              <Text mx={"1"}>{props.element["MP Tax Date"]}</Text>
            </HStack>
            {props.element["Loan Amount"] && props.element["Monthly Date"] ? (
              <HStack>
                <Text mx={"1"} fontWeight={"bold"} minW={"fit-content"}>
                  Load Amount:
                </Text>
                <Text mx={"1"}>{props.element["Loan Amount"]}</Text>
                <Text mx={"1"} fontWeight={"bold"} minW={"fit-content"}>
                  Monthly Date:
                </Text>
                <Text mx={"1"}>{props.element["Monthly Date"]}</Text>
              </HStack>
            ) : (
              <></>
            )}
          </VStack>

          <IconButton
            m={["3", "unset"]}
            ml={["40%", "unset"]}
            colorScheme="blue"
            aria-label="Delete Driver"
            icon={<DeleteIcon />}
            onClick={onOpen}
          />
        </CardFooter>
      </Card>

      <DeleteDialog
        Adhaar={props.element.Registration}
        isVehicle={true}
        onClose={onClose}
        isOpen={isOpen}
      />
    </Container>
  );
};

export default VListContainer;