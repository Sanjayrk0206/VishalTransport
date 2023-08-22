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
import { URL, BEARER_TOKEN } from "../env";

const DeleteDialog = (props) => {
  const toast = useToast();
  const cancelRef = React.useRef();

  const handleDelete = () => {
    let local_URL = `${URL}/Adhaar/${props.Adhaar}`;

    if (props.isVehicle) {
      local_URL = `${URL}/Registration/${
        props.Adhaar
      }?sheet=${"Vehicle Details"}`;
    }

    if (props.Adhaar) {
      fetch(local_URL, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
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
