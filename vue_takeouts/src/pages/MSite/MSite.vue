<template>
  <section class="msite">
    <!--首頁頭部-->
    <header-top :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo':'/login'">
        <span class="header_login_text" v-if="!userInfo._id">
          登入|註冊
        </span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </span>        
      </router-link>
    </header-top>
    
    <!--首頁導航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key=index>
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key=index>
              <div class="food_container">
                <img :src="baseImageUrl+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>            
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首頁附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <shop-list></shop-list>
    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'

export default {

  data(){
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },

  mounted() {

    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
    
  },

  computed: {
    ...mapState(['address','categorys','userInfo']),

    // 根據categorys一維數組生成一個2維數組
    // 小數組中的元素個數最大是8
    categorysArr() {
      const {categorys} = this
      // 准備空的2維數組
      const arr = []
      // 准備一個小數組(最大長度為8)
      let minArr = []
      // 遍歷categorys
      categorys.forEach(c => {
        // 如果當前小數組已經滿了，創建一個新的
        if(minArr.length === 8){
          minArr = []
        }

        // 如果minArr是空的，將小數組保存到大數組中
        if(minArr.length === 0){
          arr.push(minArr)
        }        

        // 將當前分類保存到小數組中
        minArr.push(c)        
      })

      return arr
    }
  },

  watch: {
    categorys(value) {
      // 界面更新就立即創建Swiper對象
      this.$nextTick(()=>{
        // 創建一個Swiper實例對象，來實現輪播
        new Swiper ('.swiper-container', {
          loop: true, // 循环模式选项
          
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          }
        }) 
      })       
    }
  },

  components:{
    HeaderTop,
    ShopList
  } 
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.stylus"
  .msite  //首頁
    width 100%    
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
      
  
</style>
