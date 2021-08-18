import React, { useState } from "react";
import Item from "./Item";
import DropWrapper from "./DropWrapper";
import Col from "./Col";
import { dealData, statuses } from "../../data";

// need to import deals data

const Homepage = () => {
  const [items, setItems] = useState(dealData);

  const onDrop = (item, monitor, stage) => {
    const mapping = statuses.find((si) => si.status === stage);

    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i._id !== item._id)
        .concat({ ...item, stage, icon: mapping.icon });
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

  return (
    <div className={"deal_row"}>
      {statuses.map((s) => {
        return (
          <div key={s.status} className={"column-wrapper"}>
            <h2 className={"column-header"}>{s.status.toUpperCase()}</h2>
            <DropWrapper onDrop={onDrop} status={s.status}>
              <Col>
                {items
                  .filter((i) => i.stage === s.status)
                  .map((i, idx) => (
                    <Item
                      key={i._id}
                      item={i}
                      index={idx}
                      moveItem={moveItem}
                      status={s}
                    />
                  ))}
              </Col>
            </DropWrapper>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
