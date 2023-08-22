import {
  Container,
  Box,
  Select,
  Input,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Button,
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { URL, BEARER_TOKEN } from "../../env";

export const AddTrip = (props) => {
  const toast = useToast();
  const [Advance, setAdvance] = useState("");
  const [Date, setDate] = useState();
  const [Name, setName] = useState("");
  const [Vehicle, setVehicle] = useState("");
  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");
  const [Load, setLoad] = useState();

  useEffect(() => {
    if (!Date) {
      setDate(moment().format("YYYY-MM-DD"));
    }
  }, [Date]);

  const handleSubmit = async () => {
    const data = {
      Name: Name,
      Vehicle: Vehicle,
      From: From,
      To: To,
      Loaded: Load,
      Advance: Advance,
      Date: Date,
      Payment: "Not Recieved",
    };

    if (Name && Vehicle && From && To && Load && Advance && Date) {
      await fetch(`${URL}?sheet=Trip`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({
          data: [data],
        }),
      }).then((response) => {
        if (response.status === 201) {
          toast({
            title: "Added Successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Internal Server Error",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
    } else {
      toast({
        title: "Fields are Empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      <Box>
        <Input
          placeholder="DL Expiry Date"
          w={"max(150px, 100%)"}
          type="date"
          value={Date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <Select
          mt={"2%"}
          placeholder="Select Vehicle"
          value={`${Vehicle} - ${Name}`}
          onChange={(e) => {
            setName(e.target.value.split(" - ")[1]);
            setVehicle(e.target.value.split(" - ")[0]);
          }}
        >
          {props.list.map((element) => {
            return (
              element["Vehicle Number"] && (
                <option
                  value={`${element["Vehicle Number"]} - ${element.Name}`}
                >
                  {element["Vehicle Number"]} - {element.Name}
                </option>
              )
            );
          })}
        </Select>
        <Input
          placeholder="From"
          mt={"2%"}
          value={From}
          onChange={(e) => setFrom(e.target.value)}
        />
        <Input
          placeholder="To"
          mt={"2%"}
          value={To}
          onChange={(e) => setTo(e.target.value)}
        />
        <Box my={"2%"}>
          <Text>Loading Quantity:</Text>
          <NumberInput>
            <NumberInputField
              value={Load}
              onChange={(e) => setLoad(e.target.value)}
            />
            <NumberInputStepper>
              <Text
                w={"15%"}
                h={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                Kgs.
              </Text>
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box>
          <Text>Advance:</Text>
          <NumberInput>
            <NumberInputField
              onChange={(e) => setAdvance(e.target.value)}
              value={Advance}
            />
          </NumberInput>
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"center"} p={"0.5%"}>
        <Button
          my={"2.5%"}
          mx={"1.5%"}
          colorScheme="blue"
          variant="solid"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          my={"2.5%"}
          mx={"1.5%"}
          colorScheme="blue"
          variant="outline"
          onClick={props.onClose}
        >
          Clear
        </Button>
      </Box>
    </Container>
  );
};
