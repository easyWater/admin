import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import jquery from 'jquery'
window.$ = jquery
window.jQuery = jquery

import router from './router/router'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
