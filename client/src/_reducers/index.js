import { combineReducers } from "redux";
import user from "./user_reducer";
import books_store from "./books_reducer";

const rootReducer = combineReducers({
  user,
  books_store,
});

export default rootReducer;
