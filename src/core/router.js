import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '',
      redirect: '/base/home'
    },
    {
      path: '/login',
      beforeEnter: (to, from, next) => {
        let token = to.query.token;
        if (token) {
          window.localStorage.setItem('token', token);
          next(`/base/home`);
        } else {
          window.location.href = process.env.VUE_APP_LOGIN_ADDRESS;
        }
      }
    },
    {
      path: '/base',
      beforeEnter: (to, from, next) => {
        let token = window.localStorage.getItem('token');
        token ? next() : (window.location.href = process.env.VUE_APP_LOGIN_ADDRESS);
      },
      component: () => import(/* webpackChunkName: "home" */ '@/base/base.vue'),
      children: [
        {
          path: 'home',
          component: () => import(/* webpackChunkName: "home" */ '@M/home/home.vue')
        },
        {
          path: 'customer',
          component: () => import(/* webpackChunkName: "customer" */ '@M/customer/customer.vue')
        },
        {
          path: 'store',
          component: () => import(/* webpackChunkName: "store" */ '@M/store/store.vue')
        },
        {
          path: 'visit',
          component: () => import(/* webpackChunkName: "visit" */ '@M/visit/visit.vue')
        },
        {
          path: 'message-send',
          component: () => import(/* webpackChunkName: "message-send" */ '@M/message/send.vue')
        },
        {
          path: 'message-template',
          component: () => import(/* webpackChunkName: "message-template" */ '@M/message/template.vue')
        },
        {
          path: 'message-record',
          component: () => import(/* webpackChunkName: "message-record" */ '@M/message/record.vue')
        },
        {
          path: 'clue-list',
          component: () => import(/* webpackChunkName: "clue-list" */ '@M/clue/list.vue')
        },
        {
          path: 'clue-activity',
          component: () => import(/* webpackChunkName: "clue-activity" */ '@M/clue/activity.vue')
        },
        {
          path: 'clue-record',
          component: () => import(/* webpackChunkName: "clue-record" */ '@M/clue/record.vue')
        },
      ]
    }
  ]
})
