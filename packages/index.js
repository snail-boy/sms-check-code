import SmsCheckCode from './SmsCheckCode.vue'

const install = function(Vue) {
  Vue.component(SmsCheckCode.name, SmsCheckCode)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
