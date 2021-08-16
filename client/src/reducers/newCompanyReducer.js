import { ADD_COMPANY } from "../actions/names";

export const newCompanyReducer = function (state = null, action) {
  switch (action.type) {
    case ADD_COMPANY:
      return action.payload.data;

    default:
      return state;
  }
};
