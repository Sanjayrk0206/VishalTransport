import { DeleteIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
  Text,
  IconButton,
  Box,
  InputGroup,
  InputRightAddon,
  useToast,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { URL, BEARER_TOKEN } from "../../env";
import DeleteDialog from "../../utils/DeleteDialog";

const DListContainer = (props) => {
  const toast = useToast();
  const [Vehicle, setVehicle] = useState(props.element["Vehicle Number"]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleVehicle = async () => {
    fetch(`${URL}/Adhaar/${props.element.Adhaar}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          "Vehicle Number": Vehicle,
        },
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          toast({
            title: "Updated Successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Internal Server Error",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <Container>
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
            {props.element.Adhaar.slice(0, 4)}-
            {props.element.Adhaar.slice(4, 8)}-
            {props.element.Adhaar.slice(8, 12)}
          </Badge>
        </CardHeader>
        <CardBody py={0} display={["inline-block", "inline-flex"]}>
          <Text mx={"1"} fontWeight={"bold"}>
            Mobile:
          </Text>
          <Text mx={"1"}>{props.element.Mobile}</Text>
          <Text mx={"1"} fontWeight={"bold"}>
            Expiry Date:
          </Text>
          <Text mx={"1"}>{props.element["DL Expiry Date"]}</Text>
        </CardBody>
        <CardFooter
          display={["block", "flex"]}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box w={["100%", "60%"]}>
            <InputGroup size="sm">
              <Select
                value={Vehicle}
                placeholder="Assign Vehicle"
                onChange={(e) => setVehicle(e.target.value)}
                w={"100%"}
              >
                {props.Vehicle.map((element) => {
                  return (
                    <option value={element.Registration}>
                      {element.Registration}
                    </option>
                  );
                })}
              </Select>
              <InputRightAddon
                children={<ArrowRightIcon size={"sm"} />}
                cursor={"pointer"}
                onClick={handleVehicle}
              />
            </InputGroup>
          </Box>
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
        Name={props.element.Name}
        Adhaar={props.element.Adhaar}
        onClose={onClose}
        isOpen={isOpen}
      />
    </Container>
  );
};

export default DListContainer;
