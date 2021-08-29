import axios from "axios";
import URI from "urijs";
import moment from "moment";
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

export const getDeals = async (companyID, priceRange, filterDateBy) => {
  var uri = new URI("/deals");
  let request = axios.get(uri);

  if (!companyID && !priceRange && !filterDateBy) {
    return {
      type: GET_DEALS,
      payload: request,
    };
  }

  if (companyID) {
    uri.addQuery("companyID", companyID);
  }

  if (priceRange) {
    let priceRangeArr = priceRange?.split(",");
    uri.addQuery({ min: priceRangeArr[0], max: priceRangeArr[1] });
  }

  if (filterDateBy) {
    if (filterDateBy === "year") {
      let year = moment(new Date(), "YYYY").format("YYYY");
      console.log(year);
      uri.addQuery("filterYear", year);
    }
    if (filterDateBy === "month") {
      let year = moment(new Date(), "YYYY").format("YYYY");
      let month = moment(new Date(), "M").format("M");
      uri.addQuery({ filterYear: year, filterMonth: month });
    }
    if (filterDateBy === "day") {
      let year = moment(new Date(), "YYYY").format("YYYY");
      let month = moment(new Date(), "M").format("M");
      let day = moment(new Date(), "D").format("D");
      uri.addQuery({ filterYear: year, filterMonth: month, filterDay: day });
    }
  }

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
