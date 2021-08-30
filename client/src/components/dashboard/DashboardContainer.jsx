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
import RevenueByRegion from "./RevenueByRegion";

export default function DashboardContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeals());
  }, [dispatch]);

  const dealsFromState = useSelector((state) => state.deals);
  const [deals, setDeals] = useState(dealsFromState);

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

      <Container className={css(styles.container)}>
        <Row>
          <Col xs={5} className={css(styles.graphContainer)}>
            <DealsClosedVsLost />
          </Col>
          <Col xs={7} className={css(styles.graphContainer)}>
            <RevenueByRegion />
          </Col>
        </Row>

        <Row>
          <Col xs={7} className={css(styles.graphContainer)}>
            <PotentialForRevenueByCompany />
          </Col>
          <Col xs={5} className={css(styles.graphContainer)}>
            <OpportunityForRevenue />
          </Col>
        </Row>

        <Row>
          <Col xs={5} className={css(styles.graphContainer)}>
            <GrossRevenueByCompany />
          </Col>
          <Col xs={7} className={css(styles.graphContainer)}>
            <StatusGraph />
          </Col>
        </Row>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "85vw",
  },
  graphContainer: {
    border: "1px solid gray",
    margin: "auto",
  },
});
