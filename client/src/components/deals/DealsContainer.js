import React from "react";
import NavigationTabs from "../Navigation/NavigationTabs";
import DealsDragAndDrop from "./DealsDragAndDrop";

export default function DealsContainer() {
  return (
    <>
      <NavigationTabs defaultActiveKey="/companies" />
      <button>Add Deal</button>
      <DealsDragAndDrop />
    </>
  );
}
