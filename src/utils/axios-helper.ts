import axios from 'axios';
import store from '@/redux/store';
import { set } from 'lodash';

const service = axios.create({
  timeout: 5000, //超时时间
  baseURL: import.meta.env.BASE_URL, // 我们在请求接口的时候就不同写前面 会自动我们补全
  // transformRequest: (data) => qs.stringify(data), //post请求参数处理,防止post请求跨域
  headers: {
    Accept: 'application/prs.hal-forms+json, application/hal+json, application/json, */*',
    'Content-Type': 'application/json; charset=UTF-8',
  },
});
// http request 拦截器
service.interceptors.request.use(
  (config) => {
    //如果存在jwt，则将jwt添加到每次请求之中..
    if (store.getState().login?.appUser?.token) {
      config.params = {
        ...config.params,
        jwt: store.getState().login?.appUser?.token,
      };
      set(config, 'headers.Authorization', 'Bearer ' + store.getState().login?.appUser?.token);
      set(config, 'headers.X-User-Id', store.getState().login?.appUser?.token);
    }
    return config;
  },
  (err) => {
    return err;
  }
);
// http response 拦截器
service.interceptors.response.use(
  (response) => {
    //接收返回数据..
    const res = response.data;
    //判断返回数据是否存在状态code和错误提示信息..
    // if (!res?.code || !res?.data || !res?._embedded) {
    //   return showMessage('响应数据格式错误');
    // }
    //判断状态code是否为指定数值(200)..
    if (res?.code !== 200 && res?.msg) {
      return showMessage(res.msg);
    }
    return response;
  },
  (err) => {
    return showMessage(err.message);
  }
);

//封装错误提示信息..
const showMessage = (msg: any) => {
  // Message({
  //   message: msg, //错误提示信息
  //   type: 'error', //显示类型
  //   duration: 3 * 1000, //展示时间
  // });
  return Promise.reject(msg);
};
export default service;
