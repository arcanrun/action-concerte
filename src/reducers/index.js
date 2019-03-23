import { combineReducers } from "redux";
import { conserts } from "./concertReducer";
import { menu } from "./menuReducer";
import { user } from "./userReducer";

export const rootReducer = combineReducers({
  conserts,
  menu,
  user
});
