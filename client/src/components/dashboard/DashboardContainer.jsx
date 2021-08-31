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
        <Row className={css(styles.statsCtn)}>
          <Col className={css(styles.stats, styles.statsTitleCtn)}>
            <h3 className={css(styles.statsTitle)}>Overall</h3>
            <h3 className={css(styles.statsTitle)}>Stats</h3>
          </Col>
          <Col className={css(styles.stats)}>
            <h5 className={css(styles.statsTitle)}>Deals Created</h5>
            <h4 className={css(styles.statsData)}>{deals.length}</h4>
          </Col>
          <Col className={css(styles.stats)}>
            <h5 className={css(styles.statsTitle)}>Deals Won</h5>
            <h4 className={css(styles.statsData, styles.statsDealsWon)}>
              {
                deals.filter(
                  (deal) => deal.stage.status.toLowerCase() === "closed won"
                ).length
              }
            </h4>
          </Col>
          <Col className={css(styles.stats)}>
            <h5 className={css(styles.statsTitle)}>Revenue Earned</h5>
            <h4 className={css(styles.statsData, styles.statsDealsWon)}>
              $
              {deals
                ?.filter(
                  (deal) => deal.stage.status.toLowerCase() === "closed won"
                )
                .reduce((a, { amount }) => a + amount || 0, 0)}
            </h4>
          </Col>
          <Col className={css(styles.stats)}>
            <h5 className={css(styles.statsTitle)}>Potential Revenue</h5>
            <h4 className={css(styles.statsData, styles.statsDealsPotential)}>
              $
              {deals
                ?.filter(
                  (deal) =>
                    deal.stage.status.toLowerCase() === "initiated" ||
                    deal.stage.status.toLowerCase() === "qualified" ||
                    deal.stage.status.toLowerCase() === "contract sent"
                )
                .reduce((a, { amount }) => a + amount || 0, 0)}
            </h4>
          </Col>
          <Col className={css(styles.stats)}>
            <h5 className={css(styles.statsTitle)}>Deals Lost</h5>
            <h4 className={css(styles.statsData, styles.statsDealsLost)}>
              {
                deals.filter(
                  (deal) => deal.stage.status.toLowerCase() === "closed lost"
                ).length
              }
            </h4>
          </Col>
          <Col className={css(styles.stats)}>
            <h5 className={css(styles.statsTitle)}>Revenue Lost</h5>
            <h4 className={css(styles.statsData, styles.statsDealsLost)}>
              $
              {deals
                ?.filter(
                  (deal) => deal.stage.status.toLowerCase() === "closed lost"
                )
                .reduce((a, { amount }) => a + amount || 0, 0)}
            </h4>
          </Col>
        </Row>
        <Row>
          <Col xs={5} className={css(styles.graphContainer)}>
            <DealsClosedVsLost className={css(styles.chart)} />
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
    margin: "auto",
    maxWidth: "85vw",
    marginBottom: "50px",
  },
  graphContainer: {
    border: "1px solid gray",
    margin: "auto",
  },
  stats: {
    backgroundColor: "gray",
    color: "white",
    fontFamily: "Quicksand",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  statsTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
  statsTitleCtn: {
    backgroundColor: "black",
  },
  statsData: {
    textAlign: "center",
    fontWeight: "bold",
  },
  statsDealsLost: {
    color: "#e8a9af",
  },
  statsDealsWon: {
    color: "#abe8a9",
  },
  statsDealsPotential: {
    color: "#f0f0a3",
  },
});
