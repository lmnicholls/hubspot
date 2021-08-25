import axios from "axios";

import {
  GET_COMPANIES,
  GET_ONE_COMPANY,
  ADD_COMPANY,
  EDIT_COMPANY,
  GET_DEALS,
  ADD_DEAL,
  EDIT_DEAL_STATUS,
  EDIT_DEAL_DETAILS,
} from "./names";

export const getCompanies = async () => {
  const request = await axios.get("/companies");

  return {
    type: GET_COMPANIES,
    payload: request,
  };
};

export const getOneCompany = async (id) => {
  const request = await axios.get(`/companies/${id}`);

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
  state,
  postalCode,
  logo,
  industry
) => {
  const request = await axios.post(`/companies`, {
    companyName,
    owner,
    phone,
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
  const request = await axios.put(`/companies/${id}`, {
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

export const getDeals = async (companyName) => {
  const request = !companyName
    ? await axios.get(`/deals`)
    : await axios.get(`/deals?companyName=${companyName}`);

  return {
    type: GET_DEALS,
    payload: request,
  };
};

export const addDeal = async (
  companyName,
  user,
  name,
  status,
  amount,
  expectedCloseDate
) => {
  const request = await axios.post(`/deals`, {
    companyName,
    user,
    name,
    status,
    amount,
    expectedCloseDate,
  });

  return {
    type: ADD_DEAL,
    payload: request,
  };
};

export const editDealStatus = async (id, newStatus) => {
  const request = await axios.put(`/deals/${id}`, {
    status: newStatus,
  });

  return {
    type: EDIT_DEAL_STATUS,
    payload: request,
  };
};

export const editDealDetails = async (
  id,
  name,
  status,
  amount,
  companyName,
  user,
  expectedCloseDate
) => {
  const request = await axios.put(`/deals/${id}/edit`, {
    name,
    stage: { status: status },
    amount,
    companyName,
    user,
    expectedCloseDate,
  });

  return {
    type: EDIT_DEAL_DETAILS,
    payload: request,
  };
};
