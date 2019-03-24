import { combineReducers } from "redux";
import { concerts } from "./concertReducer";
import { menu } from "./menuReducer";
import { user } from "./userReducer";

export const rootReducer = combineReducers({
  concerts,
  menu,
  user
});
