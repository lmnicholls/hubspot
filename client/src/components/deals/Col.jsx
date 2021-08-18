import React from "react";
import { StyleSheet, css } from "aphrodite";

const Col = ({ isOver, children }) => {
  return (
    <div className={css(styles.column, isOver && styles.highlightRegion)}>
      {children}
    </div>
  );
};

const styles = StyleSheet.create({
  column: {
    minHeight: "500px",
    maxWidth: "300px",
    width: "200px",
  },
  highlightRegion: {
    backgroundColor: "rgb(71, 71, 69)",
  },
});

export default Col;
