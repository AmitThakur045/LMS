import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import awsReducer from "./awsReducer";
import errorReducer from "./errorReducer";
import studentReducer from "./studentReducer";

export default combineReducers({
  admin: adminReducer,
  errors: errorReducer,
  student: studentReducer,
  aws: awsReducer,
});
