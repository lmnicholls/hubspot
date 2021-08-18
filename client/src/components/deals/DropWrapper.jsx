import React from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPE from "../../data/types";
import { statuses } from "../../data";
import { StyleSheet, css } from "aphrodite";

const DropWrapper = ({ onDrop, children, status }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    canDrop: (item, monitor) => {
      const itemIndex = statuses.findIndex((si) => si.stage === item.status);
      const statusIndex = statuses.findIndex((si) => si.stage === status);
      return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={css(styles.dropWrapper)}>
      {React.cloneElement(children, { isOver })}
    </div>
  );
};

const styles = StyleSheet.create({
  dropWrapper: {
    flex: "1 20%",
    width: "100%",
    height: "100%",
  },
});

export default DropWrapper;
