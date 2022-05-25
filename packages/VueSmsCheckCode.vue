<template>
  <div class='sms-check-code-wrapper' @click='handleClick'>
    <div class="sms-code-container">
      <div :class="['sms-code-title', {'error': error}]"
           :style="{'color': error ? errorColor : errorColorDefault}">
      {{ title }}</div>
      <div class='sms-code-box'>
        <div class="sms-code-input-box" :style="{'transform': `translate(${inputBoxActive}%)`}">
          <input
              ref='refInout'
              v-show='isShowInputBox'
              type='number'
              v-model='inputValue'
              class='sms-code-input'
              :style="{
                 'width': style.smsCodeItemWidth + '%',
                 'paddingLeft': style.inputPL + '%'
               }"
              @keyup="onKeyUp"
              @keydown='onKeyDown'
              v-focus
              :maxlength='codeNum'
              autocomplete="one-time-code"
              inputmode="numeric"
              value=''
          />
        </div>
        <div class='sms-code-bottom flex-sb'>
          <div class='sms-code-item'
               :style="{
                 'width': style.smsCodeItemWidth + '%'
               }"
               v-for='(item, index) in smsCodeList' :key='index'>
            <span :class="['sms-value', {'error': item.isError }]"
                  :style="{'color': item.isError ? errorColor : errorColorDefault}">
            {{ item.val }}</span>
            <span :class="['sms-line', {'error': item.isError}]"
                  :style="{'backgroundColor': item.isError ? errorColor : errorColorDefault}">
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let defaultCodeNum = 6
let defaultMoveUnit = 17.2
let defaultInputPL = 7
let defaultSmsCodeItemWidth = 14
export default {
  name: "VueSmsCheckCode",
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  props: {
    title: {
      type: String,
      default: '请录入验证码'
    },
    codeNum: { // 验证码个数
      type: Number,
      default: 6
    },
    isError: { // 验证码错误显示错误提示
      type: Boolean,
      default: false
    },
    errorColor: {
      type: String,
      default: '#D81A1A'
    }
  },
  data() {
    return {
      smsCodeList: [],
      inputValue: '',
      smsValue: '',
      moveUnit: 17.2, // input 位移单位

      inputBoxActive: 0,
      currentIndex: 0,
      isShowInputBox: true,
      error: false, // 验证码错误报红
      errorColorDefault: '#b1b1b1',
      style: {
        inputPL: 0,
        smsCodeItemWidth: 0,
      }
    }
  },
  created() {
    this.reDomRender()
    this.compareList()
    this.inputPaving()
  },
  methods: {
    reDomRender() {
      this.style = {
        inputPL: Math.round(defaultCodeNum / (this.codeNum / defaultInputPL)),
        smsCodeItemWidth:  Math.round(defaultCodeNum / this.codeNum * defaultSmsCodeItemWidth)
      }
      this.moveUnit =  Math.round(defaultCodeNum / (this.codeNum / (defaultMoveUnit - .3333)))
    },
    compareList() {
      for (let i = 0; i < this.codeNum; i++) {
        if (this.smsCodeList.length < this.codeNum) {
          this.smsCodeList.push({
            val: '',
            isError: this.isError
          })
        }
      }
    },
    initAll() {
      this.smsCodeList = []
      this.compareList()
      this.inputValue = ''
      this.smsValue = ''
      this.inputBoxActive = 0
      this.currentIndex = 0
      this.isShowInputBox = true
      // 延时解决光标聚焦
      setTimeout(() => {
        this.$refs.refInout.focus()
      })
    },
    // 当点击验证码时，inputBoxActive，值要分铺在每个输入框里
    inputPaving() {
      let v = this.inputValue
      if (v.length > 0) {
        v.split('').forEach((item, index) => {
          if (index <= v.length) {
            this.smsCodeList[index].val = item
            const inputPosition = (index + 1) * this.moveUnit
            this.inputBoxActive = inputPosition >= 100 ? 100 : inputPosition
            this.currentIndex = index + 1
            this.smsValue += item
            this.inputValue = ''
            if (index + 1 === this.codeNum) {
              this.isShowInputBox = false
              this.sendFun()
            }
          }
        })
      }
    },
    onKeyDown(e) {
      let key = e.key;
      e.returnValue = !(key === 'e' || key === 'E' || key === '+' || key === '-');
    },
    onKeyUp(e) {
      if (this.currentIndex < 1) return
      if (e.code === 'Backspace' || e.key === 'Backspace') { // 会退
        this.currentIndex = this.currentIndex - 1

        this.inputBoxActive = this.inputBoxActive - this.moveUnit

        this.smsCodeList = this.smsCodeList.map((val, index) => {
          if (index === this.currentIndex) {
            val.val = ''
            val.isError = this.isError
            return val
          }
          return val
        })
      }
    },
    handleClick() {
      this.$refs.refInout.focus()
    },
    sendFun() {
      this.$emit('finish', this.smsValue)
    }
  },
  watch: {
    inputValue(v) {
      if (!v) return
      // 初始化时，点击软键盘上的验证码自动填充时分铺input数据
      if (v.length > 1) {
        this.inputPaving()
        return;
      }
      this.inputBoxActive = this.inputBoxActive + this.moveUnit
      this.smsCodeList.map((val, index) => {
        if (this.currentIndex === index) {
          if(val) {
            val.isError = false
          }
          val.val = v
          return val
        }
        return val
      })
      this.currentIndex += 1
      this.inputValue = ''
      if (this.currentIndex >= this.codeNum) { // 当最后一位时发
        this.isShowInputBox = false
        this.smsCodeList.forEach(val => {
          this.smsValue += val.val
        })
        this.sendFun()
      }
    },
    isError(v) {
      this.error = v
      if (v) {
        this.smsCodeList.map(value => {
          value.isError = true
          return value
        })
        this.initAll()
      }
    },
    smsApiError() {
      this.error = false
      this.initAll()
    }
  },
}
</script>

<style scoped>
@import "index.css";
</style>
