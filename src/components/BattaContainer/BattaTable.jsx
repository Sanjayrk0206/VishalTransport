import React, { useState, useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import AddBatta from "../AddBatta/AddBatta";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
  Box,
  Input,
  Select,
  TableContainer,
  Table,
  Td,
  Thead,
  Tbody,
  Tr,
  Th,
  IconButton,
} from "@chakra-ui/react";
import { URL, USERNAME, TOKEN } from "../../env";
import moment from "moment";

const base64 = require("base-64");

const BattaTable = (props) => {
  const [DList, setDList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Date, setDate] = useState("");
  const [Driver, setDriver] = useState("");
  const [BList, setBList] = useState([]);

  useEffect(() => {
    fetch(`${URL}/DriverDetailsApi`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + base64.encode(USERNAME + ":" + TOKEN),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setDList(data);
      })
      .catch((error) => {
        console.error(error);
      });
    if (!Date) setDate(moment().format("YYYY-MM-DD"));
  }, [Date]);

  const handleSearch = () => {
    fetch(`${URL}/BattaDetailsApi?Date=${Date}&Name=${Driver}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + base64.encode(USERNAME + ":" + TOKEN),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => setBList(data))
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Box>
        <Box display={"flex"} justifyContent={"center"} mt={2} mb={4}>
          <Button onClick={onOpen} colorScheme={"blue"}>
            Add Batta{" "}
          </Button>
        </Box>
        <Box display={["block", "flex"]} justifyContent={"space-around"}>
          <Input
            mx={2}
            variant="flushed"
            placeholder="Date"
            type="date"
            w={["100%", "40%"]}
            value={Date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Select
            mx={2}
            w={["100%", "40%"]}
            variant={"flushed"}
            placeholder="Select Driver"
            value={Driver}
            onChange={(e) => setDriver(e.target.value)}
          >
            {DList.map((element) => {
              return <option value={element.Name}>{element.Name}</option>;
            })}
          </Select>
          <Button
            my={[3, "unset"]}
            mx={["40%", "unset"]}
            colorScheme={"blue"}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
        <TableContainer mt={5}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Name</Th>
                <Th>From</Th>
                <Th isNumeric>Amount</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {BList.map((element, index) => {
                return (
                  <Tr>
                    <Td>{element.Date.toString().slice(0, 10)}</Td>
                    <Td>{element.Name}</Td>
                    <Td>{element.From}</Td>
                    <Td>{element.Amount}</Td>
                    <Td
                      id={element.__id}
                      onClick={(e) => {
                        props.setSelected(e.currentTarget.id);
                        props.setisTrip(false);
                        props.setisBatta(true);
                      }}
                    >
                      <IconButton
                        ml={2}
                        colorScheme="blue"
                        aria-label="Delete Driver"
                        icon={<DeleteIcon />}
                        onClick={props.onOpen}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{"Batta Details"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddBatta DList={DList} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BattaTable;
