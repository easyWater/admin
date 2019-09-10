import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import jquery from 'jquery'
window.$ = jquery
window.jQuery = jquery

import router from './router/router'
import store from './vuex/store'

import axios from './tools/http'
Vue.prototype.$http = axios

Vue.prototype.$baseUrl = 'http://47.106.79.168:10002'
// baseURL: 'http://192.168.1.103:8882'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
