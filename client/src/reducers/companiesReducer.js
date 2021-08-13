import { GET_COMPANIES } from "../actions/names";

export const companiesReducer = function (state = null, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return action.payload;

    default:
      return state;
  }
};
