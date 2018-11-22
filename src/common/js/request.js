import axios from 'axios'
import qs from 'qs';
import {Message, MessageBox} from 'element-ui'
import store from 'store'
import {getToken, setToken, removeToken} from 'common/js/auth'
import {baseURL, tokenName} from 'api/config';

// 创建axios实例


let URL = window.location.origin;
let URL1 = '';
if (window.location.pathname == '/') {
  URL1 = '/';
} else {
  URL1 = window.location.pathname;
}
let config = {
  loginUrl: `${URL}${URL1}#/login`, /*登陆地址*/
  loginApi: `${baseURL}/login`, /*登陆API*/
  logoutApi: `${baseURL}/logout`, /*退出API*/
  indexUrl: `${URL}${URL1}/#/home` /*首页*/
};

const service = axios.create({
  baseURL, // api的base_url
  timeout: 15000, // 请求超时时间
  withCredentials: false
});

// request拦截器
service.interceptors.request.use(config => {
  if (config.headers['Content-Type'] === "application/x-www-form-urlencoded") {
    config.data = qs.stringify(config.data);
  }
  console.log(getToken());
  if (getToken()) {
    config.headers[tokenName] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */

    let token = response.headers[tokenName];
    if (token) {
      setToken(token);
      store.commit('SET_TOKEN', token)
    }
    const res = response.data;
    console.log(res);
    return res;

  },
  error => {
    console.log('err' + error) // for debug
    let errcode = String(error);
    if (errcode.indexOf('401') > 0) {
      if (location.href === config.loginUrl) {    /*登陆页面401错误，提示用户名或者密码错误*/
        Message.error({
          message: '账号或密码错误'
        });
      }
      else {
        Message.error({
          message: '超时'
        });
        console.log(config.loginUrl);
        removeToken();
        location.href = config.loginUrl;
      }
    }

    return Promise.reject(error)
  }
)

export default service
