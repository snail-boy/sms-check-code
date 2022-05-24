import VueSmsCheckCode from './VueSmsCheckCode.vue'

const install = function(Vue) {
  Vue.component(VueSmsCheckCode.name, VueSmsCheckCode)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
