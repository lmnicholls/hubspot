import React from "react";
import "../../style/index.css";

const Col = ({ isOver, children }) => {
  const className = isOver ? " highlight-region" : "";

  return <div className={`column${className}`}>{children}</div>;
};

export default Col;
