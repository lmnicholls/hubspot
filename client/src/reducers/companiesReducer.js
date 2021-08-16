import { ADD_COMPANY, GET_COMPANIES } from "../actions/names";

export const companiesReducer = function (state = null, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return action.payload.data;
    case ADD_COMPANY:
      //add the new company to the end of the array
      return [...state, action.payload.data];
    default:
      return state;
  }
};
