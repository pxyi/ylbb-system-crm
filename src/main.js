import Vue from 'vue';
import App from './base/app.vue';
import router from './core/router';
import store from './core/store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$ELEMENT = { size: 'medium' };

Vue.config.productionTip = false;

import Axios from './core/axios';
Axios(Vue);


import Filter from './core/filter';
Filter(Vue);

import AppComponents from './core/components';
Vue.use(AppComponents);

import Request from './core/request';
Vue.use(Request);

import Directive from './core/directive';
Directive(Vue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

