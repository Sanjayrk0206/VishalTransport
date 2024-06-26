import {
  Container,
  Box,
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
import { USERNAME, TOKEN, URL } from "../../env";
import { useNavigate } from "react-router-dom";

export const EndTrip = (props) => {
  const toast = useToast();
  const [Date, setDate] = useState("");
  const [Unload, setUnload] = useState("");
  const [Invoice, setInvoice] = useState();
  const [Consumption, setConsumption] = useState();
  const [VConsumption, setVConsumption] = useState();
  const navigate = useNavigate();

  const Rate = props.element.Rate;

  const VehicleDetails = props.Vlist.find(
    (x) => x.Registration === props.element.Vehicle
  );

  useEffect(() => {
    if (!Date) {
      setDate(moment().format("YYYY-MM-DD"));
    }
    if (Consumption && VehicleDetails) {
      setVConsumption(Consumption + VehicleDetails.DieselConsumption);
    } else {
      setVConsumption(Consumption);
    }
  }, [Date, Consumption, VehicleDetails]);

  const handleSubmit = async () => {
    const Loaded = props.element.Loaded;
    const Shortage = Unload - Loaded > 0 ? 0 : Loaded - Unload;

    let Amount = Unload - Loaded > 0 ? Loaded * Rate : Unload * Rate;
    Amount /= 1000;

    let data = [
      {
        __id: props.element.__id,
        TripDone: true,
        UnloadedDate: Date,
        Unloaded: parseInt(Unload),
        Shortage: Shortage,
        Amount: Amount.toString(),
        Invoice: Invoice,
        DieselConsumption: parseInt(Consumption),
      },
    ];

    if (Unload) {
      await fetch(`${URL}/TripDetailsApi`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(USERNAME + ":" + TOKEN),
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.status === 204) {
          fetch(`${URL}/VehicleDetailsApi`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa(USERNAME + ":" + TOKEN),
            },
            body: JSON.stringify([
              {
                __id: VehicleDetails.__id,
                DieselConsumption: VConsumption,
                isTrip: false,
              },
            ]),
          })
            .then((response) => {
              if (response.status === 204) {
                toast({
                  title: "Updated Successfully",
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
                navigate("/VishalTransport/");
              }, 2000);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else {
          toast({
            title: "Internal Server Error",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
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
        <Input
          placeholder="Invoice/Challen (if any...)"
          mt={"2%"}
          value={Invoice}
          onChange={(e) => setInvoice(e.target.value)}
        />
        <Box my={"2%"}>
          <Text>Unloading Quantity:</Text>
          <NumberInput value={Unload}>
            <NumberInputField onChange={(e) => setUnload(e.target.value)} />
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
          <Text>Diesel Consumption</Text>
          <NumberInput value={Consumption}>
            <NumberInputField
              onChange={(e) => setConsumption(e.target.value)}
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
          Close
        </Button>
      </Box>
    </Container>
  );
};
