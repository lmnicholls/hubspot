import { combineReducers } from "redux";
import { companiesReducer } from "./companiesReducer";
import { selectedCompanyReducer } from "./selectedCompanyReducer";
import { dealsReducer } from "./dealsReducer";

export const rootReducer = combineReducers({
  companies: companiesReducer,
  deals: dealsReducer,
  selectedCompany: selectedCompanyReducer,
});
