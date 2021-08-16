import { GET_ONE_COMPANY } from "../actions/names";

export const selectedCompanyReducer = function (state = null, action) {
  switch (action.type) {
    case GET_ONE_COMPANY:
      return action.payload.data;

    default:
      return state;
  }
};
