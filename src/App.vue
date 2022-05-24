<template>
  <div id="app">
    <vue-sms-check-code
        title='请输入验证码'
        :code-num='6'
        :is-error='isError'
        error-color='#D81A1A'
        @finish='getSmsCode'
    />
    {{msg}}
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      isError: false, // 验证码错误
      msg: ''
    }
  },
  methods: {
    getSmsCode(val) {
      this.isError = false
      this.msg = val
      setTimeout(() => {
        this.isError = val !== '888888';
        if(val === '888888') {
          this.msg = '验证码输入成功'
        }
      }, 1000)
    }
  }
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
}
</style>
