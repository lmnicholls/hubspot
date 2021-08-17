import React from "react";
import NavigationTabs from "../Navigation/NavigationTabs";
import DealsDragAndDrop from "./DealsDragAndDrop";
import { Button } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";

export default function DealsContainer() {
  return (
    <>
      <div className={css(styles.nav_buttons)}>
        <NavigationTabs defaultActiveKey="/companies" />
        <Button className={css(styles.addDealButton)}>Add Deal</Button>
      </div>
      <DealsDragAndDrop />
    </>
  );
}

const styles = StyleSheet.create({
  addDealButton: {
    backgroundColor: "#25537d !important",
    fontFamily: "Quicksand ",
    borderColor: "#25537d",
    fontWeight: "bold",
    color: "white",
    ":hover": {
      backgroundColor: "#193753",
    },
  },
  nav_buttons: {
    paddingLeft: "15px",
    paddingRight: "15px",
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
