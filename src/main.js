import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import jquery from 'jquery'
window.$ = jquery
window.jQuery = jquery

new Vue({
  render: h => h(App),
}).$mount('#app')
