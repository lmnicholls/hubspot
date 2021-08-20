import { GET_DEALS, ADD_DEAL, EDIT_DEAL_STATUS } from "../actions/names";

export const dealsReducer = function (state = null, action) {
  switch (action.type) {
    case GET_DEALS:
      return action.payload.data;
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
      console.log(newDealsList);
      return newDealsList;

    default:
      return state;
  }
};
