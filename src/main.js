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
// import Fly from 'node_modules/flyio/dist/npm./';

import store from './store';

// let fly = new Fly();
// fly.config.baseURL = 'http://qk.heniankj.com/public/index.php/home/';
Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://qk.heniankj.com/public/index.php/home/';
// axios.defaults.withCredentials = false;
Vue.prototype.$http = axios;
Vue.use(iView);

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
});
