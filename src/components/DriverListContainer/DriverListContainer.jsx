import { DeleteIcon } from "@chakra-ui/icons";
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
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import DeleteDialog from "../../utils/DeleteDialog";

const DListContainer = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            {props.element.Adhaar.toString().slice(0, 4)}-
            {props.element.Adhaar.toString().slice(4, 8)}-
            {props.element.Adhaar.toString().slice(8, 12)}
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
          <Text mx={"1"}>{props.element.DLExpiry.toString().slice(0, 10)}</Text>
        </CardBody>
        <CardFooter
          display={["block", "flex"]}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
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

      <DeleteDialog id={props.element.__id} onClose={onClose} isOpen={isOpen} />
    </Container>
  );
};

export default DListContainer;
