<template>	
	<section class="loginContainer">
		<div class="loginInner">
			<div class="login_header">
				<h2 class="login_logo">7-11外賣</h2>
				<div class="login_header_title">
					<a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登入</a>
					<a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密碼登入</a>
				</div>
			</div>
			<div class="login_content">
				<form @submit.prevent="login">
					<div :class="{on: loginWay}">
						<section class="login_message">
							<input type="tel" maxlength="11" placeholder="手機號" v-model="phone">
							<button :disabled="!rightPhone" class="get_verification" 
                      :class="{right_phone: rightPhone}" @click.prevent="getCode">
                      {{computeTime>0? `已發送(${computeTime}s)`:'獲取驗證碼'}}
              </button>
						</section>
						<section class="login_verification">
							<input type="tel" maxlength="8" placeholder="驗證碼" v-model="code">              
						</section>
						<section class="login_hint">
							溫馨提示：未註冊7-11外賣帳號的手機號，登入時將自動註冊，且代表已同意
							<a href="javascript:;">《用戶服務協議》</a>
						</section>
					</div>
					<div :class="{on: !loginWay}">
						<section>
							<section class="login_message">
								<input type="tel" maxlength="11" placeholder="手機/郵箱/用戶名" v-model="name">
							</section>
							<section class="login_verification">
								<input type="tel" maxlength="8" placeholder="密碼" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密碼" v-else v-model="pwd">
								<div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
									<div class="switch_circle" :class="{right: showPwd}"></div>
									<span class="switch_text">{{showPwd? 'abc': '...'}}</span>
								</div>
							</section>
							<section class="login_message">
								<input type="text" maxlength="11" placeholder="驗證碼" v-model="captcha">
								<img class="get_verification" src="./images/captcha.svg" alt="captcha">
							</section>
						</section>
					</div>
					<button class="login_submit">登入</button>
				</form>
				<a href="javascript:;" class="about_us">關於我們</a>
			</div>
			<a href="javascript:" class="go_back" @click="$router.back()">
				<i class="iconfont icon-jiantou2"></i>
			</a>
		</div>
    <alert-tip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></alert-tip>
	</section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue'
export default {
    data() {
      return {
        loginWay: true,   // true:短信登入，false:密碼登入
        computeTime: 0,   // 計時的時間
        showPwd: false,   // 是否顯示密碼
        phone: '',        // 手機號
        code: '',         // 短信驗證碼
        name: '',         // 用戶名
        pwd: '',          // 密碼
        captcha: '',      // 圖形驗證碼
        alertText: '',    // 提示文本
        alertShow: false, // 是否顯示警告框
      }
    },

    computed: {
      rightPhone() {
        return /^1\d{10}$/.test(this.phone)
      }
    },

    methods: {
      // 異步獲取短信驗證碼
      getCode() {
        // 啟動倒計時
        if(!this.computeTime){
          this.computeTime = 30
          const intervalId = setInterval(()=>{
            this.computeTime--
            if(this.computeTime<=0){
              // 停止計時
              clearInterval(intervalId)
            }
          },1000)

          // 發送ajax請求(向指定手機號發送驗證碼短信)
        }        
      },

      showAlert(alertText) {
        this.alertShow = true
        this.alertText = alertText
      },

      // 異步登入
      login() {
        // 前台表單驗證
        if(this.loginWay) { // 短信登入
          const {rightPhone, phone, code} = this  
          if(!rightPhone) {
            this.showAlert('手機號不正確')
          }else if(!/%\d{6}$/.test(code)) {
            // 驗證碼必須是6位數字
            this.showAlert('驗證碼必須是6位數字')
          }
        }else { // 密碼登入
          const {name, pwd, captcha} = this
          if(!name) { 
            // 用戶名必須指定
            this.showAlert('用戶名必須指定')
          }else if(!pwd) {
            // 密碼必須指定
            this.showAlert('密碼必須指定')
          }else if(!captcha) {
            // 驗證碼必須指定
            this.showAlert('驗證碼必須指定')
          }
        }
      },

      closeTip() {
        this.alertShow = false
        this.alertText = ''
      }
    },

    components: {
      AlertTip
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.stylus"
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_phone
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform: translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>