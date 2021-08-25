import React from "react";
import { Container, Row } from "react-bootstrap";
import FilterDealsByCompany from "./FilterDealsByCompany";
import FilterDealsByPrice from "./FilterDealsByPrice";
import { StyleSheet, css } from "aphrodite";

export default function FilterDealsContainer() {
  return (
    <>
      <Container>
        <Row className={css(styles.rowCtn)}>
          <FilterDealsByCompany />
          <FilterDealsByPrice />
        </Row>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  rowCtn: {
    fontFamily: "Quicksand",
    fontWeight: "bold",
    paddingBottom: "8px",
  },
});
