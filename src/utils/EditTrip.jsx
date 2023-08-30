import {
  Container,
  Box,
  Input,
  Text,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { URL, USERNAME, TOKEN } from "../env";

const EditTrip = (props) => {
  const toast = useToast();
  const [Date, setDate] = useState(props.element.Date.toString().slice(0, 10));
  const [Invoice, setInvoice] = useState(props.element.Invoice);
  const [From, setFrom] = useState(props.element.From);
  const [To, setTo] = useState(props.element.To);
  const [Driver, setDriver] = useState(props.element.Driver);
  const [Vehicle, setVehicle] = useState(props.element.Vehicle);
  const [Rate, setRate] = useState(props.element.Rate);
  const [Loaded, setLoaded] = useState(props.element.Loaded);
  const [Unloaded, setUnloaded] = useState(props.element.Unloaded);
  const [Batta, setBatta] = useState(props.element.Batta);
  const [Product, setProduct] = useState(props.element.Product);
  const [Advance, setAdvance] = useState(props.element.Advance);
  const [Diesel, setDiesel] = useState(props.element.DieselConsumption);
  const [Payment, setPayment] = useState(props.element.Payment);

  const [DList, setDList] = useState({});
  const [UnpaidBatta, setUnpaidBatta] = useState();

  const base64 = require("base-64");

  useEffect(() => {
    fetch(
      `${URL}/DriverDetailsApi?Adhaar=${Driver.split(" - ")[1]}&Name=${
        Driver.split(" - ")[0]
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + base64.encode(USERNAME + ":" + TOKEN),
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setDList(data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [Driver, base64]);

  const handleSubmit = () => {
    let Amount = Unloaded - Loaded > 0 ? Loaded * Rate : Unloaded * Rate;
    Amount /= 1000;

    let data = [
      {
        __id: props.element.__id,
        Date: Date,
        Driver: Driver,
        Vehicle: Vehicle,
        From: From,
        To: To,
        Product: Product,
        Loaded: parseInt(Loaded),
        TripDone: props.element.TripDone,
        UnloadedDate: props.element.UnloadedDate.toString().slice(0, 10),
        Unloaded: parseInt(Unloaded),
        Shortage: Unloaded - Loaded > 0 ? 0 : Loaded - Unloaded,
        Amount: Amount,
        Rate: parseInt(Rate),
        Invoice: Invoice,
        Payment: Payment,
        Advance: Advance,
        DriverBatta: Batta,
        DieselConsumption: parseInt(Diesel),
      },
    ];

    if (
      Date &&
      Driver &&
      Vehicle &&
      From &&
      Product &&
      Loaded &&
      Unloaded &&
      Rate &&
      To
    ) {
      fetch(`${URL}/TripDetailsApi`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(USERNAME + ":" + TOKEN),
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.status === 204) {
          if (Batta) {
            fetch(`${URL}/DriverDetailsApi`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + btoa(USERNAME + ":" + TOKEN),
              },
              body: JSON.stringify([
                {
                  __id: DList.__id,
                  UnpaidBatta: UnpaidBatta,
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
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          } else {
            toast({
              title: "Updated Successfully",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }
        } else {
          toast({
            title: "Internal Server Error",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
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

  const handleClear = () => {
    setDate("");
    setInvoice("");
    setFrom("");
    setTo("");
    setAdvance("");
    setBatta("");
    setProduct("");
    setLoaded("");
    setUnloaded("");
    setDriver("");
    setVehicle("");
    setDiesel("");
    setPayment("");
    setRate("");
  };

  return (
    <Container mt={"5"} maxW={"90%"}>
      <Box
        display={["block", "flex"]}
        justifyContent={"space-between"}
        p={["2.5%", "0.5%"]}
      >
        <Input
          variant="flushed"
          placeholder="Date"
          type="date"
          w={["100%", "40%"]}
          value={Date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <Input
          variant="flushed"
          placeholder="Invoice"
          w={["100%", "40%"]}
          value={Invoice}
          onChange={(e) => {
            setInvoice(e.target.value);
          }}
        />
      </Box>
      <Box
        display={["block", "flex"]}
        justifyContent={"space-between"}
        p={["2.5%", "0.5%"]}
      >
        <Input
          variant="flushed"
          placeholder="From"
          w={["100%", "30%"]}
          value={From}
          onChange={(e) => {
            setFrom(e.target.value);
          }}
        />
        <Input
          variant="flushed"
          placeholder="To"
          w={["100%", "30%"]}
          value={To}
          onChange={(e) => {
            setTo(e.target.value);
          }}
        />
        <Input
          variant="flushed"
          placeholder="Product"
          w={["100%", "20%"]}
          value={Product}
          onChange={(e) => {
            setProduct(e.target.value);
          }}
        />
      </Box>
      <Box
        display={["block", "flex"]}
        justifyContent={"space-between"}
        p={["2.5%", "0.5%"]}
      >
        <Box my={1} w={["100%", "40%"]}>
          <Text>Loading Qty.:</Text>
          <NumberInput variant={"flushed"} value={Loaded}>
            <NumberInputField
              onChange={(e) => {
                setLoaded(e.target.value);
              }}
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
        <Box my={1} w={["100%", "40%"]}>
          <Text>Unloading Qty.:</Text>
          <NumberInput variant="flushed" value={Unloaded}>
            <NumberInputField
              onChange={(e) => {
                setUnloaded(e.target.value);
              }}
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
      </Box>
      <Box
        display={["block", "flex"]}
        justifyContent={"space-between"}
        p={["2.5%", "0.5%"]}
      >
        <Box my={1} w={["100%", "30%"]}>
          <Text>Rate:</Text>
          <NumberInput variant="flushed" value={Rate}>
            <NumberInputField
              onChange={(e) => {
                setRate(e.target.value);
              }}
            />
            <NumberInputStepper w={"fit-content"}>
              <Text display={"inline-block"}>per Kgs.</Text>
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </Box>
      <Box
        display={["block", "flex"]}
        justifyContent={"space-between"}
        p={["2.5%", "0.5"]}
        my={["0", "4"]}
      >
        <Select
          w={["100%", "40%"]}
          variant={"flushed"}
          placeholder="Select Driver"
          value={Driver}
          onChange={(e) => {
            setDriver(e.target.value);
          }}
        >
          {props.Dlist.map((element) => {
            return <option value={element.Name}>{element.Name}</option>;
          })}
        </Select>
        <Select
          w={["100%", "40%"]}
          variant={"flushed"}
          placeholder="Select Vehicle"
          value={Vehicle}
          onChange={(e) => {
            setVehicle(e.target.value);
          }}
        >
          {props.Vlist.map((element) => {
            return (
              <option value={element.Registration}>
                {element.Registration}
              </option>
            );
          })}
        </Select>
      </Box>
      <Box
        display={["block", "flex"]}
        justifyContent={"space-between"}
        p={["2.5%", "0.5%"]}
      >
        <Box my={1} w={["100%", "40%"]}>
          <Text>Advance:</Text>
          <NumberInput variant="flushed" value={Advance}>
            <NumberInputField
              onChange={(e) => {
                setAdvance(e.target.value);
              }}
            />
          </NumberInput>
        </Box>
        <Box my={1} w={["100%", "40%"]}>
          <Text>Diesel Consumption:</Text>
          <NumberInput variant="flushed" value={Diesel}>
            <NumberInputField
              onChange={(e) => {
                setDiesel(e.target.value);
              }}
            />
            <NumberInputStepper>
              <Text
                w={"15%"}
                h={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                Lts.
              </Text>
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </Box>
      <Box
        display={["block", "flex"]}
        justifyContent={"space-between"}
        p={["2.5%", "0.5%"]}
      >
        <Box my={1} w={["100%", "40%"]}>
          <Text>Payment:</Text>
          <NumberInput variant="flushed">
            <NumberInputField
              value={Payment}
              onChange={(e) => {
                setPayment(e.target.value);
              }}
            />
          </NumberInput>
        </Box>
        <Box my={1} w={["100%", "40%"]}>
          <Text>Batta:</Text>
          <NumberInput variant="flushed">
            <NumberInputField
              value={Batta}
              onChange={(e) => {
                setBatta(e.target.value);
                if (e.target.value && DList) {
                  if (DList.UnpaidBatta) {
                    setUnpaidBatta(
                      (
                        parseInt(DList.UnpaidBatta) + parseInt(e.target.value)
                      ).toString()
                    );
                  } else {
                    setUnpaidBatta(e.target.value);
                  }
                }
              }}
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
          onClick={handleClear}
        >
          Clear
        </Button>
      </Box>
    </Container>
  );
};

export default EditTrip;
