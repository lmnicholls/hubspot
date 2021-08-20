import {
  ADD_COMPANY,
  GET_COMPANIES,
  EDIT_COMPANY,
  ADD_DEAL,
} from "../actions/names";

export const companiesReducer = function (state = null, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return action.payload.data;

    case ADD_COMPANY:
      return [action.payload.data, ...state];

    case EDIT_COMPANY:
      const updatedCompany = action.payload.data;

      const newCompaniesList = state.map((company) => {
        if (company._id === updatedCompany._id) {
          return updatedCompany;
        } else {
          return company;
        }
      });
      return newCompaniesList;

    case ADD_DEAL:
      const newDeal = action.payload.data;
      const companyID = action.payload.data.company;

      const updatedCompaniesList = state.map((company) => {
        if (company._id === companyID) {
          company.deals = [newDeal, ...company.deals];
          return company;
        } else {
          return company;
        }
      });

      return updatedCompaniesList;

    default:
      return state;
  }
};
