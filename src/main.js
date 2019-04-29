// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './theme/index.less';
import axios from 'axios';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import Fly from 'node_modules/flyio/dist/npm./';

import store from './store';

// let fly = new Fly();
// fly.config.baseURL = 'http://qk.heniankj.com/public/index.php/home/';
Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://qk.heniankj.com/public/index.php/home/';
// axios.defaults.withCredentials = false;
//设置拦截参数
axios.interceptors.request.use(
  config => {
    let localStore = JSON.parse(localStorage.getItem("userInfo"));
    let token = localStore && localStore.token || (store.getters.teacherInfo&&store.getters.teacherInfo.token) || null;
    if (config.method == 'post') {
      config.data = {
        ...config.data,
        token
      }
    } else if (config.method == 'get') {
      config.params = {
        ...config.params,
        token
      }
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  }
);

axios.interceptors.response.use(function (response) {
// token 已过期，重定向到登录页面
  if (response.data.code == 8) {
    localStorage.clear();
    router.replace({
      path: '/login',
      query: {redirect: router.currentRoute.fullPath}
    })
  }
  return response
}, function (error) {
  return Promise.reject(error)
});

Vue.prototype.$http = axios;
Vue.use(iView);
Vue.use(ElementUI);
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  store
});


