import { combineReducers } from "redux";
import { companiesReducer } from "./companiesReducer";
import { currentCompanyReducer } from "./currentCompanyReducer";
import { newCompanyReducer } from "./newCompanyReducer";

export const rootReducer = combineReducers({
  companies: companiesReducer,
  currentCompany: currentCompanyReducer,
  newCompany: newCompanyReducer,
});
