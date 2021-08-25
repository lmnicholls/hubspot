import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavigationTabs from "../Navigation/NavigationTabs";
import { StyleSheet, css } from "aphrodite";
import spinner from "../../images/Spinner.gif";
import DealsClosedVsLost from "./DealsClosedVsLost";
import StatusGraph from "./StatusGraph";
import OpportunityForRevenue from "./OpportunityForRevenue";
import "./dashboard.css";
import { getDeals } from "../../actions";
import { Container, Row, Col } from "react-bootstrap";
import PotentialForRevenueByCompany from "./PotentialRevenueByCompany";
import GrossRevenueByCompany from "./GrossRevenueByCompany";

export default function DashboardContainer() {
  const dealsFromState = useSelector((state) => state.deals);
  const [deals, setDeals] = useState(dealsFromState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeals());
  }, [dispatch]);

  useEffect(() => {
    setDeals(dealsFromState);
  }, [dealsFromState]);

  if (!deals) {
    return (
      <div className={css(styles.loadingText)}>
        <img src={spinner} className={css(styles.spinner)} alt="spinner" />
        Loading Dashboard...
      </div>
    );
  }

  return (
    <>
      <NavigationTabs defaultActiveKey="/dashboard" />

      <Container>
        <Row>
          <Col className={css(styles.graphContainer)}>
            <DealsClosedVsLost />
          </Col>
          <Col className={css(styles.graphContainer)}>
            <StatusGraph />
          </Col>
        </Row>

        <Row>
          <Col className={css(styles.graphContainer)}>
            <PotentialForRevenueByCompany />
          </Col>
          <Col className={css(styles.graphContainer)}>
            <OpportunityForRevenue />
          </Col>
        </Row>

        <Row>
          <Col className={css(styles.graphContainer)}>
            <GrossRevenueByCompany />
          </Col>
          <Col className={css(styles.graphContainer)}></Col>
        </Row>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  graphContainer: {
    width: "500px",
    border: "1px solid gray",
  },
});
