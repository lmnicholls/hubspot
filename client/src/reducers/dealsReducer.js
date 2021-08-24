import {
  GET_DEALS,
  ADD_DEAL,
  EDIT_DEAL_STATUS,
  EDIT_DEAL_DETAILS,
} from "../actions/names";

export const dealsReducer = function (state = null, action) {
  switch (action.type) {
    case GET_DEALS:
      return action.payload.data.deals;
    case ADD_DEAL:
      return [action.payload.data, ...state];
    case EDIT_DEAL_STATUS:
      const updatedDeal = action.payload.data;

      const newDealsList = state.map((deal) => {
        if (deal._id === updatedDeal._id) {
          return updatedDeal;
        } else {
          return deal;
        }
      });
      return newDealsList;

    case EDIT_DEAL_DETAILS:
      const updatedDealDetails = action.payload.data;

      const newDealList = state.map((deal) => {
        if (deal._id === updatedDealDetails._id) {
          return updatedDealDetails;
        } else {
          return deal;
        }
      });
      return newDealList;

    default:
      return state;
  }
};
