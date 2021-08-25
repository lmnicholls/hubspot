import React from "react";
import { Container, Row } from "react-bootstrap";
import FilterDeals from "./FilterDeals";
// import FilterDealsByPrice from "./FilterDealsByPrice";
import { StyleSheet, css } from "aphrodite";

export default function FilterDealsContainer() {
  return (
    <>
      <Container>
        <Row className={css(styles.rowCtn)}>
          <FilterDeals />
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
