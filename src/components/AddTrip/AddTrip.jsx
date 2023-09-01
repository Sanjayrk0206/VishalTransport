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
import { USERNAME, TOKEN, URL } from "../../env";
import { useNavigate } from "react-router-dom";

export const AddTrip = (props) => {
  const toast = useToast();
  const [Advance, setAdvance] = useState("");
  const [Date, setDate] = useState();
  const [Name, setName] = useState();
  const [Vehicle, setVehicle] = useState("");
  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");
  const [Load, setLoad] = useState();
  const [Rate, setRate] = useState();
  const [Product, setProduct] = useState("");
  const [Adhaar, setAdhaar] = useState("");
  const [CAdvance, setCAdvance] = useState("");
  const [CTrips, setCTrips] = useState();

  const [Driver, setDriver] = useState();
  const [VTrips, setVTrips] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Date) {
      setDate(moment().format("YYYY-MM-DD"));
    }
    if (Driver) {
      setName(`${Driver.Name} - ${Driver.Adhaar}`);
      setCTrips((Driver.Trips ? Driver.Trips : 0) + 1);
      if (Driver.TotalAdvance) {
        setCAdvance(
          (parseInt(Driver.TotalAdvance) + parseInt(Advance)).toString()
        );
      } else {
        setCAdvance(Advance);
      }
    }

    if (Vehicle) {
      var Object = props.Vlist.find((x) => x.Registration === Vehicle);
      setVTrips((Object.TotalTrips ? Object.TotalTrips : 0) + 1);
    }
  }, [Date, Driver, Advance, Vehicle, props.Vlist]);

  const handleItem = (This) => {
    setDriver(props.Dlist.find((x) => x.Adhaar === This));
    setAdhaar(This);
  };

  const handleSubmit = async () => {
    let data = [
      {
        Date: Date,
        Driver: Name,
        Vehicle: Vehicle,
        From: From,
        To: To,
        Loaded: parseInt(Load),
        Rate: parseInt(Rate),
        Product: Product,
        Advance: Advance,
        TripDone: false,
      },
    ];

    if (Name && Vehicle && From && To && Load && Advance && Date) {
      await fetch(`${URL}/TripDetailsApi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(USERNAME + ":" + TOKEN),
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.status === 204) {
          fetch(`${URL}/DriverDetailsApi`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa(USERNAME + ":" + TOKEN),
            },
            body: JSON.stringify([
              {
                __id: Driver.__id,
                Trips: parseInt(CTrips),
                TotalAdvance: CAdvance,
              },
            ]),
          })
            .then((response) => {
              if (response.status === 204) {
                fetch(`${URL}/VehicleDetailsApi`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + btoa(USERNAME + ":" + TOKEN),
                  },
                  body: JSON.stringify([
                    {
                      __id: props.Vlist.find((x) => x.Registration === Vehicle)
                        .__id,
                      TotalTrips: VTrips,
                      isTrip: true,
                    },
                  ]),
                })
                  .then((response) => {
                    if (response.status === 204) {
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
        <Select
          mt={"2%"}
          placeholder="Select Driver"
          value={Adhaar}
          onChange={(e) => handleItem(e.target.value)}
        >
          {props.Dlist.map((element) => {
            return <option value={element.Adhaar}>{element.Name}</option>;
          })}
        </Select>
        <Select
          mt={"2%"}
          placeholder="Select Vehicle"
          value={Vehicle}
          onChange={(e) => {
            setVehicle(e.target.value);
          }}
        >
          {props.Vlist.map((element) => {
            if (!element.isTrip) {
              return (
                <option value={element.Registration}>
                  {element.Registration}
                </option>
              );
            } else {
              return <></>;
            }
          })}
        </Select>
        <Input
          placeholder="From"
          mt={"2%"}
          value={From}
          onChange={(e) => setFrom(e.target.value)}
          autoComplete={true}
        />
        <Input
          placeholder="To"
          mt={"2%"}
          value={To}
          onChange={(e) => setTo(e.target.value)}
          autoComplete={true}
        />
        <Input
          placeholder="Product"
          mt={"2%"}
          value={Product}
          onChange={(e) => setProduct(e.target.value)}
          autoComplete={true}
        />
        <Box my={"2%"}>
          <Text>Loading Quantity:</Text>
          <NumberInput value={Load}>
            <NumberInputField onChange={(e) => setLoad(e.target.value)} />
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
          <Text>Rate:</Text>
          <NumberInput value={Rate}>
            <NumberInputField onChange={(e) => setRate(e.target.value)} />
          </NumberInput>
        </Box>
        <Box>
          <Text>Advance:</Text>
          <NumberInput value={Advance}>
            <NumberInputField onChange={(e) => setAdvance(e.target.value)} />
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
