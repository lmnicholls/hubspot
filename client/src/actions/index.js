import testData from "./testData.json";
import { GET_COMPANIES } from "./names";

export const getCompanies = () => {
  const companyTestData = testData;

  return {
    type: GET_COMPANIES,
    payload: companyTestData,
  };
};
