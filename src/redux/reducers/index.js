import loginReducer from './login';
import {combineReducers} from 'redux';
//combineReducers传入的对象就是rdux中的总状态
export default combineReducers({
	userInfo:loginReducer
})