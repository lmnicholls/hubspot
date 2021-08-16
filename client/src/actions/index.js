import axios from "axios";

import { GET_COMPANIES } from "./names";

export const getCompanies = async () => {
  const request = await axios.get("http://localhost:8000/companies");

  return {
    type: GET_COMPANIES,
    payload: request,
  };
};
