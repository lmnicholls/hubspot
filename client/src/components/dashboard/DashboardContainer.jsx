import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavigationTabs from "../Navigation/NavigationTabs";
import { StyleSheet, css } from "aphrodite";
import spinner from "../../images/Spinner.gif";
import DealsClosedVsLost from "./DealsClosedVsLost";
import "./dashboard.css";
import { getDeals } from "../../actions";

export default function DashboardContainer() {
  const dealsFromState = useSelector((state) => state.deals);
  const [deals, setDeals] = useState(dealsFromState);
  console.log(deals);

  useEffect(() => {
    getDeals();
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
      <div className={css(styles.graphsContainer)}>
        <div className={css(styles.graphContainer)}>
          <DealsClosedVsLost />
        </div>
        <div className={css(styles.graphContainer)}>Graph Container</div>
      </div>
      <div className={css(styles.graphsContainer)}>
        <div className={css(styles.graphContainer)}>Graph Container</div>
        <div className={css(styles.graphContainer)}>Graph Container</div>
      </div>
      <div className={css(styles.graphsContainer)}>
        <div className={css(styles.graphContainer)}>Graph Container</div>
        <div className={css(styles.graphContainer)}>Graph Container</div>
      </div>
    </>
  );
}

const styles = StyleSheet.create({
  graphsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  graphContainer: {
    width: "500px",
    border: "1px solid gray",
  },
});
