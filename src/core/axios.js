/**
 * @module Axios 配置信息
 */

import axios from 'axios';
import VueAxios from 'vue-axios';
import Qs from 'qs';
import ElementUI from 'element-ui';


export default (Vue) => {
  axios.interceptors.request.use(res => {
    /* ------------ 序列化参数 ------------- */
    res.data = res.data || {};
    res.data.token = window.localStorage.getItem('token') || '';
    if (res.method === 'post') { res.data = Qs.stringify(res.data); }
    if (res.url.indexOf('@es') > -1) { res.url = res.url.replace(/@es/, process.env.VUE_APP_ES_URL); }
    return res;
  });

  /* ----------------- 返回结果拦截, 如未登录直接跳转到登录页 ----------------- */
  axios.interceptors.response.use(res => {
    if (res.data.code == 3000) {
      window.location.href = process.env.VUE_APP_LOGIN_ADDRESS;
    }
    return res.data;
  }, err => {
    ElementUI.Message({ type: 'error', message: '网络错误，请刷新重试' });
    return err;
  });

  /* ------------------------- 默认请求格式, 和全局请求地址 ------------------------- */
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

  Vue.use(VueAxios, axios);
}