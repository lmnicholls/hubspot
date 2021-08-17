import { ADD_COMPANY, GET_COMPANIES, EDIT_COMPANY } from "../actions/names";

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

    default:
      return state;
  }
};
