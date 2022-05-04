import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import errorReducer from "./errorReducer";
import studentReducer from "./adminReducer";

export default combineReducers({
  admin: adminReducer,
  errors: errorReducer,
  student: studentReducer,
});
