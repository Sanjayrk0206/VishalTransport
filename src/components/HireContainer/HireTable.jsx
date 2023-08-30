import {
  Box,
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Button,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Select,
  Input,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { URL, USERNAME, TOKEN } from "../../env";
import EditTrip from "../../utils/EditTrip";

const base64 = require("base-64");

const HireTable = () => {
  const [Trip, setTrip] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Data, setData] = useState();
  const [Dlist, setDList] = useState([]);
  const [Vlist, setVlist] = useState([]);
  const [Date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [Driver, setDriver] = useState("");
  const [Vehicle, setVehicle] = useState("");
  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");
  const [Product, setProduct] = useState("");
  const [Submit, setSubmit] = useState(false);

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

    fetch(`${URL}/VehicleDetailsApi`, {
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
        setVlist(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (Submit) {
      fetch(
        `${URL}/TripDetailsApi?TripDone=true&Date=${Date}&Driver=${Driver}&Vehicle=${Vehicle}&From=${From}&To=${To}&Product=${Product}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + base64.encode(USERNAME + ":" + TOKEN),
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setTrip(data);
          setSubmit(false);
        });
    }
  }, [Date, To, From, Vehicle, Driver, Product, Submit]);

  return (
    <Box>
      <Box my={2} display={"flex"}>
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
          {Dlist.map((element) => {
            return <option value={element.Name}>{element.Name}</option>;
          })}
        </Select>
        <Select
          mx={2}
          w={["100%", "40%"]}
          variant={"flushed"}
          placeholder="Select Vehicle"
          value={Vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        >
          {Vlist.map((element) => {
            return (
              <option value={element.Registration}>
                {element.Registration}
              </option>
            );
          })}
        </Select>
        <Input
          mx={2}
          variant="flushed"
          placeholder="From"
          w={["100%", "40%"]}
          value={From}
          onChange={(e) => setFrom(e.target.value)}
        />
        <Input
          mx={2}
          variant="flushed"
          placeholder="To"
          w={["100%", "40%"]}
          value={To}
          onChange={(e) => setTo(e.target.value)}
        />
        <Input
          mx={2}
          variant="flushed"
          placeholder="Product"
          w={["100%", "40%"]}
          value={Product}
          onChange={(e) => setProduct(e.target.value)}
        />
      </Box>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Button
          my={"2.5%"}
          mx={"1.5%"}
          colorScheme="blue"
          variant="solid"
          onClick={() => {
            setSubmit(true);
          }}
        >
          Search
        </Button>
      </Box>
      <TableContainer mt={5}>
        {Trip.map((element, index) => {
          return (
            <Table mt={2} variant="simple" key={index}>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Invoice</Th>
                  <Th>Particulars</Th>
                  <Th isNumeric>Loaded Qty.</Th>
                  <Th isNumeric>Unloaded Qty.</Th>
                  <Th isNumeric>Shortage</Th>
                  <Th isNumeric>Rate</Th>
                  <Th isNumeric>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr key={index}>
                  <Td>{element.Date.toString().slice(0, 10)}</Td>
                  <Td>{element.Invoice}</Td>
                  <Td>
                    {element.From} - {element.To}
                  </Td>
                  <Td isNumeric>{element.Loaded}</Td>
                  <Td isNumeric>{element.Unloaded}</Td>
                  <Td isNumeric>{element.Shortage}</Td>
                  <Td isNumeric>{element.Rate}</Td>
                  <Td isNumeric>{element.Amount}</Td>
                </Tr>
              </Tbody>
              <Thead>
                <Th>Product</Th>
                <Th>Driver</Th>
                <Th>Vehicle Number</Th>
                <Th isNumeric>Advance</Th>
                <Th isNumeric>Batta</Th>
                <Th isNumeric>Payment</Th>
                <Th isNumeric>Diesel</Th>
                <Th></Th>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{element.Product}</Td>
                  <Td>{element.Driver}</Td>
                  <Td>{element.Vehicle}</Td>
                  <Td isNumeric>{element.Advance}</Td>
                  <Td isNumeric>{element.DriverBatta}</Td>
                  <Td>{element.Payment}</Td>
                  <Td isNumeric>{element.DieselConsumption}</Td>
                  <Td
                    p={"2"}
                    display={"flex"}
                    justifyContent={"center"}
                    onClick={() => {
                      setData(element);
                    }}
                  >
                    <Button colorScheme="whatsapp" onClick={onOpen}>
                      Edit
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          );
        })}
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{"Trip Details"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditTrip element={Data} Dlist={Dlist} Vlist={Vlist} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HireTable;
