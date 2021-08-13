import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CompaniesContainer from "./components/companies/CompaniesContainer";
import CompanyPage from "./components/companies/CompanyPage";
import DealsContainer from "./components/deals/DealsContainer";
import DealPage from "./components/deals/DealPage";
import DashboardContainer from "./components/dashboard/DashboardContainer";

function App() {
  return (
    <>
      <Switch>
        <Route path="/companies" component={CompaniesContainer} />
        <Route path="/companies/:id" component={CompanyPage} />
        <Route path="/deals" component={DealsContainer} />
        <Route path="/deals/:id" component={DealPage} />
        <Route path="/dashboard" component={DashboardContainer} />
        <Redirect to="/companies" />
      </Switch>
    </>
  );
}

export default App;