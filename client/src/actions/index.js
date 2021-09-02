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

export const getCompanies = async (page, sortType) => {
  const request =
    page || sortType
      ? await axios.get(`/api/companies?page=${page}&sortType=${sortType}`)
      : await axios.get("/api/companies");

  return {
    type: GET_COMPANIES,
    payload: request,
  };
};

export const getOneCompany = async (id) => {
  const request = await axios.get(`/api/companies/${id}`);

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
  const request = await axios.post(`/api/companies`, {
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
  const request = await axios.put(`/api/companies/${id}`, {
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

export const getDeals = async (companyID, priceRange) => {
  if (!companyID && !priceRange) {
    let request = await axios.get(`/api/deals`);
    return {
      type: GET_DEALS,
      payload: request,
    };
  }

  if (companyID && priceRange) {
    let priceRangeArr = priceRange?.split(",");
    let request = axios.get(
      `/api/deals?companyID=${companyID}&min=${parseInt(
        priceRangeArr[0]
      )}&max=${parseInt(priceRangeArr[1])}`
    );
    return {
      type: GET_DEALS,
      payload: request,
    };
  }
  if (companyID && !priceRange) {
    let request = await axios.get(`/api/deals?companyID=${companyID}`);
    return {
      type: GET_DEALS,
      payload: request,
    };
  }
  if (!companyID && priceRange) {
    let priceRangeArr = priceRange?.split(",");
    let request = await axios.get(
      `/api/deals?min=${parseInt(priceRangeArr[0])}&max=${parseInt(
        priceRangeArr[1]
      )}`
    );
    return {
      type: GET_DEALS,
      payload: request,
    };
  }
};

export const addDeal = async (
  companyID,
  user,
  name,
  status,
  amount,
  expectedCloseDate
) => {
  const request = await axios.post(`/api/deals`, {
    companyID,
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
  const request = await axios.put(`/api/deals/${id}`, {
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
  const request = await axios.put(`/api/deals/${id}/edit`, {
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

export const deleteDeal = async (id) => {
  axios.delete(`/api/deals/${id}`);
};
