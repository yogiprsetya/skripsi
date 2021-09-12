import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import modal from "./ModalControl";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  modal
});
