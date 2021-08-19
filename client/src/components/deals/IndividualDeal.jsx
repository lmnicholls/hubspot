import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "./Window";
import ITEM_TYPE from "../../data/types";
import { StyleSheet, css } from "aphrodite";

const Item = ({ item, index, moveItem, status }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { type: ITEM_TYPE, ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [show, setShow] = useState(false);

  const onOpenItem = () => setShow(true);

  const onClose = () => setShow(false);

  drag(drop(ref));

  return (
    <Fragment>
      <div
        ref={ref}
        style={{ opacity: isDragging ? 0 : 1 }}
        className={css(styles.item)}
        onClick={onOpenItem}
      >
        <p className={css(styles.itemTitle, styles.itemComponent)}>
          {item.name}
        </p>
        <p className={css(styles.itemComponent)}>
          <span className={css(styles.itemLabel)}> Amount:</span> ${item.amount}
        </p>
        <p className={css(styles.itemComponent)}>
          <span className={css(styles.itemLabel)}>Close Date: </span>
          {new Date(item.expectedCloseDate).toDateString()}
        </p>
        <p
          className={css(
            styles.itemCompany,
            styles.itemComponent,
            styles.itemLabel
          )}
        >
          <img
            src={item.company.logo}
            className={css(styles.itemCompanyImg)}
            alt="logo"
          />
          {item.company.companyName?.toUpperCase()}
        </p>
      </div>
      <Window item={item} onClose={onClose} show={show} />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  item: {
    fontFamily: "Quicksand",
    fontSize: "15px",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    zIndex: "1",
    backgroundColor: "white",
    ":hover": {
      cursor: "pointer",
    },
  },
  itemComponent: {
    marginBottom: "5px",
  },
  itemTitle: {
    fontWeight: "600",
    fontSize: "16px",
    color: "#193753",
  },
  itemCompanyImg: {
    width: "25px",
    paddingRight: "5px",
  },
  itemStatus: {
    textAlign: "right",
  },
  itemLabel: {
    fontWeight: "bold",
  },
});

export default Item;
