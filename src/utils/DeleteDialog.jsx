import React from "react";
import {
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { TOKEN, URL, USERNAME } from "../env";

const DeleteDialog = (props) => {
  const toast = useToast();
  const cancelRef = React.useRef();

  const handleDelete = () => {
    let data = [
      {
        __id: props.id,
      },
    ];

    let local_URL = "DriverDetailsApi";

    if (props.isVehicle) {
      local_URL = "VehicleDetailsApi";
    }

    if (props.id) {
      fetch(`${URL}/${local_URL}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(USERNAME + ":" + TOKEN),
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 204) {
            toast({
              title: "Deleted Successfully",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
          toast({
            title: "Internal Server Error",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    } else {
      toast({
        title: "Data is undefined",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={props.onClose}
        isOpen={props.isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Are you sure you want to discard?</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleDelete}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteDialog;
