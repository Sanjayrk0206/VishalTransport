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
import { TOKEN, URL, USERNAME } from "../../env";

const AddDriver = (props) => {
  const toast = useToast();
  const [Name, setName] = useState();
  const [Mobile, setMobile] = useState(0);
  const [Adhaar, setAdhaar] = useState(0);
  const [Driving, setDrivingLicense] = useState();
  const [Date, setDate] = useState();

  const handleSubmit = async () => {
    let data = [
      {
        Name: Name,
        Mobile: Mobile,
        Adhaar: Adhaar,
        DrivingLicense: Driving,
        DLExpiry: Date,
      },
    ];

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
        await fetch(`${URL}/DriverDetailsApi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(USERNAME + ":" + TOKEN),
          },
          body: JSON.stringify(data),
        }).then((response) => {
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
      <Box
        display={["block", "flex"]}
        justifyContent={"space-around"}
        p={["2.5%", "0.5%"]}
      >
        <Input
          variant="flushed"
          placeholder="Name"
          w={["100%", "40%"]}
          value={Name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          isRequired
        />
      </Box>
      <Box
        display={["block", "flex"]}
        justifyContent={"space-around"}
        p={["2.5%", "0.5%"]}
      >
        <NumberInput variant="flushed" w={["100%", "40%"]}>
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
        <NumberInput variant="flushed" w={["100%", "40%"]} pt={["2.5%", "0"]}>
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
      <Box
        display={["block", "flex"]}
        justifyContent={"space-around"}
        p={["2.5%", "0.5%"]}
      >
        <Input
          variant="flushed"
          placeholder="Driving License"
          w={["100%", "40%"]}
          value={Driving}
          onChange={(e) => {
            setDrivingLicense(e.target.value);
          }}
          isRequired
        />
        <Input
          variant="flushed"
          placeholder="DL Expiry Date"
          w={["100%", "40%"]}
          type="date"
          value={Date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          pt={["2.5%", "0"]}
        />
      </Box>
      <Box display={"flex"} justifyContent={"center"} p={["2.5%", "0.5%"]}>
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
