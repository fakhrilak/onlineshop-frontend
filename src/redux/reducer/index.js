import { combineReducers } from "redux";

import auth from "./auth"
import order from "./order"
import item from "./item"
export default combineReducers({auth,order,item});