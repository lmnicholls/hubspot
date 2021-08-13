import React from "react";
import NavigationTabs from "../Navigation/NavigationTabs";

export default function DashboardContainer() {
  return (
    <>
      <NavigationTabs defaultActiveKey="/dashboard" />
      <h1>"This is the Dashboard Container"</h1>
    </>
  );
}
