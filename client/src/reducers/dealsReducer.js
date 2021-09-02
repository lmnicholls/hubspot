import {
  GET_DEALS,
  ADD_DEAL,
  EDIT_DEAL_STATUS,
  EDIT_DEAL_DETAILS,
  DELETE_DEAL,
} from "../actions/names";

export const dealsReducer = function (state = null, action) {
  switch (action.type) {
    case GET_DEALS:
      return action.payload.data;
    case ADD_DEAL:
      return [action.payload.data, ...state];
    case DELETE_DEAL:
      const deletedID = action.payload.data.deletedDeal._id;
      const newDealsState = state.filter((deal) => deal._id !== deletedID);

      return newDealsState;
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
