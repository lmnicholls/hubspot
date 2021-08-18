import { GET_DEALS, ADD_DEAL } from "../actions/names";

export const dealsReducer = function (state = null, action) {
  switch (action.type) {
    case GET_DEALS:
      return action.payload.data;
    case ADD_DEAL:
      return [action.payload.data, ...state];

    default:
      return state;
  }
};
