<template>	
	<section class="loginContainer">
		<div class="loginInner">
			<div class="login_header">
				<h2 class="login_logo">7-11外賣</h2>
				<div class="login_header_title">
					<a href="javascript:;" class="on">短信登入</a>
					<a href="javascript:;">密碼登入</a>
				</div>
			</div>
			<div class="login_content">
				<form>
					<div class="on">
						<section class="login_message">
							<input type="tel" maxlength="11" placeholder="手機號">
							<button disabled="disabled" class="get_verification">獲取驗證碼</button>
						</section>
						<section class="login_verification">
							<input type="tel" maxlength="8" placeholder="驗證碼">
						</section>
						<section class="login_hint">
							溫馨提示：未註冊7-11外賣帳號的手機號，登入時將自動註冊，且代表已同意
							<a href="javascript:;">《用戶服務協議》</a>
						</section>
					</div>
					<div>
						<section>
							<section class="login_message">
								<input type="tel" maxlength="11" placeholder="手機/郵箱/用戶名">
							</section>
							<section class="login_verification">
								<input type="tel" maxlength="8" placeholder="密碼">
								<div class="switch_button off">
									<div class="switch_circle"></div>
									<span class="switch_text">...</span>
								</div>
							</section>
							<section class="login_message">
								<input type="text" maxlength="11" placeholder="驗證碼">
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
	</section>
</template>

<script>
export default {
    props: {
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