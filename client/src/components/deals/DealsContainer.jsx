import React from "react";
import NavigationTabs from "../Navigation/NavigationTabs";
import DealsPage from "./DealsPage";
import { Button } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./deals.css";

export default function DealsContainer() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className={css(styles.nav_buttons)}>
          <NavigationTabs defaultActiveKey="/companies" />
          <Button className={css(styles.addDealButton)}>Add Deal</Button>
        </div>
        <DealsPage />
      </DndProvider>
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
