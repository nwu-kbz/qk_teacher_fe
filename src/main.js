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


Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(iView);
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
