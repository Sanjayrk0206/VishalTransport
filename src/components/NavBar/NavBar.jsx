import { Container, Heading } from "@chakra-ui/react";
import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <Container
      maxW={"full"}
      height={"max(8vh, fit-content)"}
      bgColor={"dodgerblue"}
      m={0}
      mb={"5"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      className={styles.NavBarContainer}
      flexFlow={"wrap"}
    >
      <Heading w={["100%", "unset"]} textAlign={["center", "unset"]}>
        Vishal Transport
      </Heading>
      <ul className={styles.NavBarList}>
        <li>
          <Link to="/">DashBoard</Link>
        </li>
        <li>
          <Link to="/Details">Details</Link>
        </li>
        <li>
          <Link to="/Payment">Payment</Link>
        </li>
      </ul>
    </Container>
  );
};
