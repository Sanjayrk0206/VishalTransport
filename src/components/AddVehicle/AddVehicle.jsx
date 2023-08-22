import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { URL, BEARER_TOKEN } from "../../env";

const AddVehicle = (props) => {
  const toast = useToast();

  const [isloan, setisloan] = useState(false);
  const [Registration, setRegistration] = useState();
  const [Engine, setEngine] = useState();
  const [Chassis, setChassis] = useState();
  const [Insurance, setInsurance] = useState();
  const [RC, setRC] = useState();
  const [NP, setNP] = useState();
  const [MP, setMP] = useState();
  const [Loan, setLoan] = useState();
  const [Date, setDate] = useState();

  const handleSubmit = async () => {
    const data = {
      Registration: Registration,
      Engine: Engine,
      Chassis: Chassis,
      "Insurance Expiry Date": Insurance,
      "RC Validity Date": RC,
      "NP Date": NP,
      "MP Tax Date": MP,
      "Load Amount": Loan,
      "Monthly Date": Date,
    };

    console.log(data);
    if (
      Registration &&
      Engine &&
      Chassis &&
      Insurance &&
      RC &&
      NP &&
      MP &&
      (!isloan || (Loan && Date))
    ) {
      if (
        props.list.find((element) => element.Registration === Registration) ||
        props.list.find((element) => element.Engine === Engine) ||
        props.list.find((element) => element.Chassis === Chassis)
      ) {
        toast({
          title: "Value already exists",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
      } else {
        await fetch(`${URL}?sheet=${"Vehicle Details"}`, {
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
      }
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
    <Container maxW={"100%"} mb={"5vh"}>
      <Box display={"flex"} justifyContent={"space-around"} p={"0.5%"}>
        <Input
          variant="flushed"
          placeholder="Registration Number"
          w={"max(150px, 40%)"}
          value={Registration}
          onChange={(e) => {
            setRegistration(e.target.value);
          }}
        />
        <Input
          variant="flushed"
          placeholder="Attachments"
          w={"max(150px, 40%)"}
          type="file"
        />
      </Box>
      <Box display={"flex"} justifyContent={"space-around"} p={"0.5%"}>
        <Input
          variant="flushed"
          placeholder="Engine Number"
          w={"max(150px, 40%)"}
          value={Engine}
          onChange={(e) => setEngine(e.target.value)}
        />
        <Input
          variant="flushed"
          placeholder="Chassis Number"
          w={"max(150px, 40%)"}
          minLength={17}
          maxLength={17}
          value={Chassis}
          onChange={(e) => setChassis(e.target.value)}
        />
      </Box>
      <Box display={"flex"} justifyContent={"space-around"} p={"0.5%"}>
        <Box w={"max(150px, 40%)"}>
          <Text>Insurance Expiry Date:</Text>
          <Input
            variant="flushed"
            placeholder="Insurance Expiry Date"
            type="date"
            value={Insurance}
            onChange={(e) => setInsurance(e.target.value)}
          />
        </Box>
        <Box w={"max(150px, 40%)"}>
          <Text>RC Validity Date:</Text>
          <Input
            variant="flushed"
            placeholder="RC Validity Date"
            type="date"
            value={RC}
            onChange={(e) => setRC(e.target.value)}
          />
        </Box>
      </Box>
      <Box
        my={"2.5%"}
        mx={"2.5%"}
        w={"95%"}
        borderBottom={"1.5px solid gray"}
        px={"2.5%"}
        py={"3px"}
      >
        <Heading size={"md"}>Secondary Details</Heading>
      </Box>
      <Box display={"flex"} justifyContent={"space-around"} p={"0.5%"}>
        <Box display={"block"} w={"max(150px, 40%)"}>
          <Text>NP Date:</Text>
          <Input
            variant="flushed"
            placeholder="NP Date"
            type="date"
            value={NP}
            onChange={(e) => setNP(e.target.value)}
          />
        </Box>
        <Box display={"block"} w={"max(150px, 40%)"}>
          <Text>MP Tax Date:</Text>
          <Input
            variant="flushed"
            placeholder="MP Tax Date"
            type="date"
            value={MP}
            onChange={(e) => setMP(e.target.value)}
          />
        </Box>
      </Box>
      <Box
        my={"2.5%"}
        mx={"2.5%"}
        w={"95%"}
        borderBottom={"1.5px solid gray"}
        px={"2.5%"}
        py={"3px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Heading size={"md"}>Loan Details</Heading>
        <Switch
          size="sm"
          mx={"10px"}
          onChange={(e) => {
            setisloan(!isloan);
          }}
        />
      </Box>
      <Box
        display={isloan ? "flex" : "none"}
        justifyContent={"space-around"}
        p={"0.5%"}
      >
        <Input
          variant="flushed"
          placeholder="Loan Amount"
          w={"max(150px, 40%)"}
          value={Loan}
          onChange={(e) => setLoan(e.target.value)}
        />
        <Input
          variant="flushed"
          placeholder="Monthly Date"
          w={"max(150px, 40%)"}
          type="date"
          value={Date}
          onChange={(e) => setDate(e.target.value)}
        />
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

export default AddVehicle;
