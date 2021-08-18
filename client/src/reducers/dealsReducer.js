import { GET_DEALS } from "../actions/names";

export const dealsReducer = function (state = null, action) {
  switch (action.type) {
    case GET_DEALS:
      return action.payload.data;

    default:
      return state;
  }
};
