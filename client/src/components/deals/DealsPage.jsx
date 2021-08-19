import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import IndividualDeal from "./IndividualDeal";
import DropWrapper from "./DropWrapper";
import Col from "./Col";
import { statuses } from "../../data";
import spinner from "../../images/Spinner.gif";
import { StyleSheet, css } from "aphrodite";

// need to import deals data

const Homepage = () => {
  const deals = useSelector((state) => state.deals);

  const [items, setItems] = useState(deals);

  useEffect(() => {
    setItems(deals);
  }, [deals]);

  const onDrop = (item, monitor, stage) => {
    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i._id !== item._id)
        .concat({
          ...item,
          stage: { status: stage },
        });
      console.log("newItems", newItems);
      return [...newItems];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (!items) {
    return (
      <div className={css(styles.loadingText)}>
        <img src={spinner} className={css(styles.spinner)} alt="spinner" />
        Loading Deals...
      </div>
    );
  }

  return (
    <div className={css(styles.dealRow)}>
      {statuses.map((s) => {
        return (
          <div key={s.status} className={css(styles.columnWrapper)}>
            <div className={css(styles.columnHeader)}>
              <h2 className={css(styles.columnHeaderText)}>
                {s.status.toUpperCase()}
              </h2>
              <h2 className={css(styles.columnHeaderText)}>
                {items?.filter((item) => item.stage.status === s.status).length}
              </h2>
            </div>
            <DropWrapper onDrop={onDrop} status={s.status}>
              <Col>
                {items
                  ?.filter((i) => i.stage.status.toLowerCase() === s.status)
                  .map((i, idx) => (
                    <IndividualDeal
                      key={i._id}
                      item={i}
                      index={idx}
                      moveItem={moveItem}
                      status={s}
                    />
                  ))}
              </Col>
            </DropWrapper>
            <div className={css(styles.total)}>
              TOTAL: $
              {numberWithCommas(
                items
                  ?.filter((i) => i.stage.status === s.status)
                  .reduce((pv, cv) => {
                    return pv + cv.amount;
                  }, 0)
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const styles = StyleSheet.create({
  dealRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  columnWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    backgroundColor: "rgb(220, 220, 224)",
    borderTop: "1px solid gray",
    borderBottom: "1px solid gray",
    borderRight: "1px solid gray",
    ":nth-child(5n + 1)": {
      borderLeft: "1px solid gray",
    },
  },
  columnHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "Quicksand",
    fontWeight: "600",
    marginBottom: "20px",
    marginTop: "0",
  },
  columnHeaderText: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  spinner: {
    height: "40px",
    paddingLeft: "20px",
  },
  total: {
    fontFamily: "Quicksand",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "white",
  },
});

export default Homepage;
