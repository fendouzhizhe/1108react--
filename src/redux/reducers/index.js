import loginReducer from "./login";
import { combineReducers } from "redux";
import titleReducer from "./title";
import categoryReducer from './category';

//combineReducers传入的对象就是rdux中的总状态
export default combineReducers({
  userInfo: loginReducer,
  title: titleReducer,
  categoryList:categoryReducer
});
