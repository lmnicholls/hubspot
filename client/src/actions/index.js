import axios from "axios";

import {
  GET_COMPANIES,
  GET_ONE_COMPANY,
  ADD_COMPANY,
  EDIT_COMPANY,
  GET_DEALS,
} from "./names";

export const getCompanies = async () => {
  const request = await axios.get("http://localhost:8000/companies");

  return {
    type: GET_COMPANIES,
    payload: request,
  };
};

export const getOneCompany = async (id) => {
  const request = await axios.get(`http://localhost:8000/companies/${id}`);

  return {
    type: GET_ONE_COMPANY,
    payload: request,
  };
};

export const addCompany = async (
  companyName,
  owner,
  phone,
  city,
  state_region,
  postalCode,
  logo,
  industry
) => {
  const request = await axios.post(`http://localhost:8000/companies`, {
    companyName,
    owner,
    phone,
    city,
    state_region,
    postalCode,
    logo,
    industry,
  });

  return {
    type: ADD_COMPANY,
    payload: request,
  };
};

export const editCompany = async (
  id,
  companyName,
  owner,
  phone,
  city,
  state_region,
  postalCode,
  logo,
  industry
) => {
  const request = await axios.put(`http://localhost:8000/companies/${id}`, {
    companyName,
    owner,
    phone,
    city,
    state_region,
    postalCode,
    logo,
    industry,
  });

  return {
    type: EDIT_COMPANY,
    payload: request,
  };
};

export const getDeals = async () => {
  const request = await axios.get("http://localhost:8000/deals");

  return {
    type: GET_DEALS,
    payload: request,
  };
};
