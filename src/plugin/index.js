import VueSmsCode from './VueSmsCheckCode'
const install = function(Vue) {
  Vue.component(VueSmsCode.name, VueSmsCode)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
}
