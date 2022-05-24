import Vue from 'vue'
import App from './App.vue'
import VueSmsCheckCode from "./plugin/index";

Vue.use(VueSmsCheckCode)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
