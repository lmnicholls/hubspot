import React from "react";
import { StyleSheet, css } from "aphrodite";

export default function DealsDragAndDrop() {
  return (
    <>
      <div className={css(styles.dealTable)}>
        <div className={css(styles.tableHeaders)}>
          <div className={css(styles.headers)}>INITIATED</div>
          <div className={css(styles.headers)}>QUALIFIED</div>
          <div className={css(styles.headers)}>CONTRACT SENT</div>
          <div className={css(styles.headers)}>CLOSED WON</div>
          <div className={css(styles.headers)}>CLOSED LOST</div>
        </div>
        <div className={css(styles.dealsRow)}>
          <div className={css(styles.dealColumn)}></div>
          <div className={css(styles.dealColumn)}></div>
          <div className={css(styles.dealColumn)}></div>
          <div className={css(styles.dealColumn)}></div>
          <div className={css(styles.dealColumn)}></div>
        </div>
        <div className={css(styles.totalRow)}>
          <div className={css(styles.total)}>Total: $</div>
          <div className={css(styles.total)}>Total: $</div>
          <div className={css(styles.total)}>Total: $</div>
          <div className={css(styles.total)}>Total: $</div>
          <div className={css(styles.total)}>Total: $</div>
        </div>
      </div>
    </>
  );
}

const styles = StyleSheet.create({
  dealTable: {
    fontFamily: "Quicksand !important",
    borderBottom: "1px solid gray",
    borderTop: "1px solid gray",
    borderLeft: "1px solid gray",
    marginRight: "20px",
    marginLeft: "20px",
  },
  headers: {
    textAlign: "center",
    fontWeight: "bold",
    width: "20%",
    borderRight: "1px solid gray",
    borderBottom: "1px solid gray",
  },
  dealsRow: {
    display: "flex",
    flexFlow: "row",
    borderBottom: "1px solid gray",
  },
  dealColumn: {
    borderRight: "1px solid gray",
    minHeight: "200px",
    width: "20%",
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.075)",
    },
  },
  tableHeaders: {
    display: "flex",
    flexFlow: "row",
    backgroundColor: "rgb(220, 220, 224)",
  },
  totalRow: {
    display: "flex",
    flexFlow: "row",
  },
  total: {
    textAlign: "center",
    borderRight: "1px solid gray",
    width: "20%",
  },
});
