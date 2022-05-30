<template>
  <div id="app">
    <vue-sms-check-code
        title='验证码'
        :code-num='6'
        :is-error='isError'
        @finish='finish'
    />
    {{msg}}
  </div>
</template>

<script>
import VueSmsCheckCode from "../packages/SmsCheckCode";
export default {
  name: 'App',
  components: {
    VueSmsCheckCode
  },
  data() {
    return {
      isError: false,
      msg: ''
    }
  },
  methods: {
    finish(v) {
      this.isError = false
      this.msg = v
      setTimeout(() => { // 模拟请求
        this.isError = v !== '888888';
        if( v === '888888') {
          this.msg = '验证码输入成功'
        }
      }, 1000)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
