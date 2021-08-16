import axios from "axios";

import { GET_COMPANIES, GET_ONE_COMPANY, ADD_COMPANY } from "./names";

export const getCompanies = async () => {
  const request = await axios.get("http://localhost:8000/companies");

  return {
    type: GET_COMPANIES,
    payload: request,
  };
};

export const getOneCompany = async (id) => {
  const request = await axios.get(
    `http://localhost:8000/companies?companyID=${id}`
  );

  return {
    type: GET_ONE_COMPANY,
    payload: request,
  };
};

export const addCompany = async (
  name,
  companyOwner,
  phoneNumber,
  city,
  state,
  postalCode,
  logo,
  industry
) => {
  const request = await axios.post(`http://localhost:8000/companies`, {
    name,
    companyOwner,
    phoneNumber,
    city,
    state,
    postalCode,
    logo,
    industry,
  });

  return {
    type: ADD_COMPANY,
    payload: request,
  };
};

//TODO: add editCompany()
