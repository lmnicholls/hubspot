import { combineReducers } from "redux";
import { companiesReducer } from "./companiesReducer";
import { selectedCompanyReducer } from "./selectedCompanyReducer";

export const rootReducer = combineReducers({
  companies: companiesReducer,
  selectedCompany: selectedCompanyReducer,
});
