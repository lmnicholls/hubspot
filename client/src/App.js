import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route path="/companies" component={CompaniesContainer} />
        <Route path="/companies/:id" component={CompanyViewContainer} />
        <Route path="/deals" component={DealsContainer} />
        <Route path="/deals/:id" component={DealViewContainer} />
        <Route path="/dashboard" component={DashboardContainer} />
        <Redirect to="/companies" />
      </Switch>
    </>
  );
}

export default App;
