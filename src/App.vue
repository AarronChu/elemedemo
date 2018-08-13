<template>
  <div id="app" :class="showModel?'show-model':''">
    <!-- 头部分 -->
    <!-- <div class="header">header</div> -->
    <v-upper :seller="seller" @isShowModel="isShowModel"></v-upper>
    <!-- tab切换 goods/sellers/ratings 路由跳转-->
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="sellers">商家</router-link>
      </div>
    </div>
    <!-- content内容 -->
    <div class="content">
      <router-view :seller ="seller"></router-view>
    </div>
  </div>
</template>

<script>
import upper from "./components/upper"
import goods from "./components/goods"
import axios from 'axios'
export default {
  name: "App",
  data() {
    return {
      seller: {},
      showModel: false
    };
  },
  components: {
    "v-upper": upper,
    goods
  },
  methods: {
    isShowModel () {
      this.showModel = !this.showModel
    }    
  },
  created () {
    axios.get('/good/seller').then(res => {
      if(res.data.code === 0){
        this.seller = res.data.data
      }
    })
  }
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
/* stylus stylus-loader */
  @import 'assets/stylus/index.styl'
  #app
    .tab
      display flex
      height 40px
      line-height 40px
      border-1px(rgba(240,20,20,0.1))
      .tab-item
        flex 1
        text-align center
        font-size 14px
        color rgb(77,85,93)
        a
          width 100%
          height 100%
          display block
        a.active
          color rgb(240,20,20) !important
  // .show-model
  //   filter blur(4px)
</style>
