<template>
  <div id="discounts">
    <div class="background"></div>
    <div class="header">
      <div class="seller-name">{{seller.name}}</div>
      <stars :score="seller.score"></stars>
    </div>
    <div class="discounts">
      <div class="title">
        <span class="title-line"></span>
        <span class="title-name">优惠信息</span>
        <span class="title-line"></span>
      </div>
      <ul class="discount-list">
        <li class="discount-item" v-for="(item, index) in seller.supports" :key="index">
          <span class="icon" :class="classMap[seller.supports[index].type]"></span>
          <span class="discount-info">{{item.description}}</span>
        </li>
      </ul>
    </div>
    <div class="notice">
      <div class="title">
        <span class="title-line"></span>
        <span class="title-name">商家公告</span>
        <span class="title-line"></span>
      </div>
      <p class="notice-detail">{{seller.bulletin}}</p>
    </div>
    <div class="icon-close" @click="closeDiscounts"></div>
  </div>
</template>

<script>
import stars from './stars'
export default {
  name: 'discounts',
  props: {
    seller: {
      require: true,
      type: Object
    }
  },
  components: {
    stars
  },
  data () {
    return {
    }
  },
  methods: {
    closeDiscounts (e) {
      this.$emit('showDiscounts')
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    // setTimeout(()=>{console.log(this.seller.foodScore),1000})
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
#discounts
  width 100%
  height 100vh
  position fixed
  left 0
  top 0
  z-index 300
  color rgb(255,255,255)
  text-align center
  font-size 12px
  .background
    width 100%
    height 100%
    background rgba(7,17,27,0.8)
    filter blur(0)
  .header
    width 100%
    .seller-name
      width 100%
      font-size 16px
      font-weight 700
      line-height 16px
      margin-top 64px
  .discounts, .notice
    width 100%
    margin-top 28px
    .title
      white-space nowrap
      .title-name
        margin 0 12px
        font-size 14px
        font-weight 700
        line-height 14px
      .title-line
        display inline-block
        width 112px
        border-bottom 1px solid rgba(255,255,255,0.2)
        vertical-align middle
    .discount-list
      margin-top 24px
      text-align left
      font-weight 200
      padding 0 48px
      .discount-item
        margin-bottom 12px
        .icon
          float left
          width 16px
          height 16px
          background-size 16px 16px
          &.decrease
            bg-image('decrease_2')
          &.discount
            bg-image('discount_2')
          &.guarantee
            bg-image('guarantee_2')
          &.invoice
            bg-image('invoice_2')
          &.special
            bg-image('special_2')
        .discount-info
          line-height 12px
          margin-left 22px
    .notice-detail
      padding 24px 48px 0
      text-align left
      line-height 24px
      font-weight 200
  .icon-close
    font-size 32px
    color rgba(255,255,255,0.5)
    position absolute
    bottom 32px
    left 0
    right 0
</style>