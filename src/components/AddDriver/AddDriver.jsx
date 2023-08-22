import {
  Container,
  Box,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BEARER_TOKEN, URL } from "../../env";

const AddDriver = (props) => {
  const toast = useToast();
  const [Name, setName] = useState();
  const [Mobile, setMobile] = useState(0);
  const [Adhaar, setAdhaar] = useState(0);
  const [Driving, setDrivingLicense] = useState();
  const [Date, setDate] = useState();

  const handleSubmit = async () => {
    const data = {
      Name: Name,
      Mobile: Mobile,
      Adhaar: Adhaar,
      "Driving License": Driving,
      "DL Expiry Date": Date,
    };

    if (Name && Mobile && Adhaar && Driving && Date) {
      if (
        props.list.find((element) => element.Adhaar === Adhaar) ||
        props.list.find((element) => element["Driving License"] === Driving)
      ) {
        toast({
          title: "Value already exists",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
      } else {
        await fetch(URL, {
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
          placeholder="Name"
          w={"max(150px, 40%)"}
          value={Name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          isRequired
        />
        <Input
          variant="flushed"
          placeholder="Attachments"
          w={"max(150px, 40%)"}
          type="file"
        />
      </Box>
      <Box display={"flex"} justifyContent={"space-around"} p={"0.5%"}>
        <NumberInput variant="flushed" w={"max(150px, 40%)"}>
          <NumberInputField
            placeholder="Mobile Number"
            minLength={10}
            maxLength={10}
            value={Mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            isRequired
          />
        </NumberInput>
        <NumberInput variant="flushed" w={"max(150px, 40%)"}>
          <NumberInputField
            placeholder="Adhaar Number"
            minLength={12}
            maxLength={12}
            value={Adhaar}
            onChange={(e) => {
              setAdhaar(e.target.value);
            }}
            isRequired
          />
        </NumberInput>
      </Box>
      <Box display={"flex"} justifyContent={"space-around"} p={"0.5%"}>
        <Input
          variant="flushed"
          placeholder="Driving License"
          w={"max(150px, 40%)"}
          value={Driving}
          onChange={(e) => {
            setDrivingLicense(e.target.value);
          }}
          isRequired
        />
        <Input
          variant="flushed"
          placeholder="DL Expiry Date"
          w={"max(150px, 40%)"}
          type="date"
          value={Date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
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
          Close
        </Button>
      </Box>
    </Container>
  );
};

export default AddDriver;
