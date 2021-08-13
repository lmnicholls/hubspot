import NavigationTabs from "../Navigation/NavigationTabs";
import CompaniesListView from "./CompaniesListView";

export default function CompaniesContainer() {
  return (
    <>
      <NavigationTabs defaultActiveKey="/companies" />
      <button>add company</button>
      <CompaniesListView />
    </>
  );
}
