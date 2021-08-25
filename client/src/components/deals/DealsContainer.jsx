import React from "react";
import { useState } from "react";
import NavigationTabs from "../Navigation/NavigationTabs";
import DealsPage from "./DealsPage";
import { Button } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./deals.css";
import CreateDeal from "./CreateDeal";
import FilterDealsByCompany from "./FilterDealsByCompany";

export default function DealsContainer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className={css(styles.nav_buttons)}>
          <NavigationTabs defaultActiveKey="/deals" />
          <Button className={css(styles.addDealButton)} onClick={handleShow}>
            Add Deal
          </Button>
        </div>
        <FilterDealsByCompany />
        <DealsPage />
      </DndProvider>
      <CreateDeal
        setShow={setShow}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
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
