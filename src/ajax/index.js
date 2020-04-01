import ajax from './ajax';
import jsonp from 'jsonp';
import {WEATHER_BASE_URL,WEATHER_AK,WEATHER_LOCATION} from '../config';
import { message } from 'antd';

//请求登录
export const reqLogin = (loginObj)=> ajax.post('/login',loginObj);

//请求天气信息
export const reqWeatherData=()=>{
  const url = `${WEATHER_BASE_URL}?location=${WEATHER_LOCATION}&output=json&ak=${WEATHER_AK}`
	return new Promise((resolve)=>{
		jsonp(url,{timeout:3000},(err,data)=>{
			if(!err){
				const {error} = data
				if(error === 0) resolve(data.results[0].weather_data[0])
				else message.error('百度服务器返回天气信息有误，请联系管理员');
			}else{
				message.error('获取天气信息失败，请联系管理员！');
			}
		})
	})
}