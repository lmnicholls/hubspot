import {
  ADD_COMPANY,
  GET_COMPANIES,
  EDIT_COMPANY,
  EDIT_DEAL_STATUS,
  ADD_DEAL,
} from "../actions/names";

export const companiesReducer = function (state = {}, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return action.payload.data;

    case ADD_COMPANY:
      const addCompanyState = { ...state };
      addCompanyState.companies = [
        action.payload.data,
        ...addCompanyState.companies,
      ];
      return addCompanyState;

    case EDIT_COMPANY:
      const updatedCompany = action.payload.data;
      const updatedCompanyState = { ...state };

      const newCompaniesList = state.companies.map((company) => {
        if (company._id === updatedCompany._id) {
          return updatedCompany;
        } else {
          return company;
        }
      });

      updatedCompanyState.companies = newCompaniesList;
      return updatedCompanyState;

    case EDIT_DEAL_STATUS:
      const updatedDeal = action.payload.data;
      const dealID = action.payload.data._id;
      const companyID = action.payload.data.company._id;
      const editDealStatusState = { ...state };

      editDealStatusState.companies = state.companies.map((company) => {
        if (company._id === companyID) {
          company.deals = company.deals.map((deal) => {
            if (deal._id === dealID) {
              return updatedDeal;
            } else {
              return deal;
            }
          });
          return company;
        } else {
          return company;
        }
      });

      return editDealStatusState;

    case ADD_DEAL:
      const newDeal = action.payload.data;
      const companyId = action.payload.data.company._id;
      const addDealState = { ...state };

      addDealState.companies = state.companies.map((company) => {
        if (company._id === companyId) {
          company.deals = [newDeal, ...company.deals];
          return company;
        } else {
          return company;
        }
      });

      return addDealState;

    default:
      return state;
  }
};
