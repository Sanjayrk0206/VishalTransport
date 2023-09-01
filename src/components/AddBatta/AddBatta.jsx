import {
  Box,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { TOKEN, URL, USERNAME } from "../../env";
import { useNavigate } from "react-router-dom";

const AddBatta = (props) => {
  const toast = useToast();
  const [Date, setDate] = useState("");
  const [Driver, setDriver] = useState();
  const [Amount, setAmount] = useState();
  const [From, setFrom] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!Date) setDate(moment().format("YYYY-MM-DD"));
  }, [Date]);

  const handleSubmit = async () => {
    let data = [
      {
        Date: Date,
        Name: Driver,
        Amount: Amount,
        From: From,
      },
    ];
    await fetch(`${URL}/BattaDetailsApi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(USERNAME + ":" + TOKEN),
      },
      body: JSON.stringify(data),
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
          navigate("/VishalTransport/Details");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleClear = () => {
    setDate("");
    setDriver("");
    setAmount("");
    setFrom("");
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-around"}>
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
          {props.DList.map((element) => {
            return <option value={element.Name}>{element.Name}</option>;
          })}
        </Select>
      </Box>
      <Box display={"flex"} justifyContent={"space-around"}>
        <Box my={1} w={["100%", "40%"]}>
          <Text>Amount:</Text>
          <NumberInput variant="flushed" value={Amount}>
            <NumberInputField
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </NumberInput>
        </Box>
        <Input
          variant={"flushed"}
          w={["100%", "40%"]}
          placeholder="From"
          mt={"2%"}
          value={From}
          onChange={(e) => setFrom(e.target.value)}
          autoComplete={true}
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
          onClick={handleClear}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default AddBatta;
