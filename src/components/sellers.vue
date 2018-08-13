<template>
  <div id="seller">
    <div class="seller-box">
      <div class="seller-top-up">
        <div class="column-header">{{seller.name}}</div>
        <div class="seller-star-box">
          <div class="seller-star">
            <stars :score="seller.score"></stars>
          </div>
          <span class="rating-count">({{seller.ratingCount}})</span><span class="sell-count">月售{{seller.sellCount}}单</span>
        </div>
        <div class="is-like" @click="setFavorite">
          <span class="icon-favorite" :class="isLike?'liked':''"></span><span>{{isLike?'已收藏':'点击收藏'}}</span>
        </div>
      </div>
      <div class="seller-top-down">
        <div class="seller-delivery-box">
          <span>起送价</span><span>{{seller.minPrice}}</span><span>元</span>
        </div>
        <div class="seller-delivery-box">
          <span>商家配送</span><span>{{seller.deliveryPrice}}</span><span>元</span>
        </div>
        <div class="seller-delivery-box">
          <span>平均配送时间</span><span>{{seller.deliveryTime}}</span><span>分钟</span>
        </div>
      </div>
    </div>
    <div class="seller-box">
      <div class="seller-notes-info">
        <div class="column-header">公告与活动</div>
        <p>{{seller.bulletin}}</p>
      </div>
      <div class="seller-notes-detail">
        <div v-for="(support, index) in seller.supports" :key="index" class="column-list">
          <span class="column-list-icon" :class="supportsIcon[support.type]"></span><span>{{support.description}}</span>
        </div>
      </div>
    </div>
    <div class="seller-box">
      <div class="column-header">商家实景</div>
      <div class="seller-real-pictures">
        <div class="real-pictures"  v-for="pics in seller.pics" :key="pics">
          <img :src="pics">
        </div>
      </div>
    </div>
    <div class="seller-box">
      <div class="column-header">商家信息</div>
      <div class="seller-more-detail">
        <div class="column-list" v-for="info in seller.infos" :key="info">{{info}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import stars from './stars'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isLike: false
    }
  },
  components: {
    stars
  },
  methods: {
    setFavorite () {
      this.isLike = !this.isLike
    }
  },
  created () {
    this.supportsIcon = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
#seller
  background-color #f3f5f7
  .seller-box
    padding 18px
    background-color #ffffff
    margin-bottom 16px
    .seller-top-up
      position relative
      padding-bottom 18px
      border-1px(rgba(7,17,27,0.1))
      .seller-star-box
        margin-top 8px
        font-size 10px
        line-height 18px
        color rgb(77,85,93)
        .seller-star
          display inline-block
          #star
            margin 0
            padding 0
            .star-icon
              display inline-block
              width 18px
              height 18px
              margin 0 4px
              background-size 18px 18px
              &.on
                bg-image('star36_on')
              &.half
                bg-image('star36_half')
              &.off
                bg-image('star36_off')
        span
          display inline-block
          vertical-align top
        .rating-count
          margin 0 12px 0 4px
      .is-like
        position absolute
        right 0
        top 0
        text-align center
        font-size 10px
        color rgb(77,85,93)
        line-height 10px
        .icon-favorite
          display block
          margin-bottom 4px
          font-size 24px
          color rgba(147,153,159,0.3)
          line-height 24px
          &.liked
            color rgb(240,20,20)
    .seller-top-down
      display flex
      padding-top 18px
      .seller-delivery-box
        flex 1
        text-align center
        border-1px-right(rgba(7,17,27,0.1))
        &:last-of-type
          border-1px-right(transparent)
        span
          font-size 24px
          font-weight 200
          color(7,17,27)
          line-height 24px
          &:first-child
            display block
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
            margin-bottom 2px
          &:last-child
            font-size 10px
    .seller-notes-info
      border-1px(rgba(7,17,27,0.1))
      p
        padding 8px 12px 16px 12px
        font-size 12px
        font-weight 200
        color rgb(240,20,20)
        line-height 24px
    .seller-real-pictures
      white-space nowrap
      overflow hidden
      overflow-x: scroll
      margin-top 12px
      .real-pictures
        display inline-block
        margin-right 6px
        &:last-child
          margin-right 0
        img
          width 120px
          height 90px
.column-list-icon
  display inline-block
  width 16px
  height 16px
  background-size 16px 16px
  margin-right 6px
  vertical-align middle
.decrease
  bg-image('decrease_4')
.discount
  bg-image('discount_4')
.special
  bg-image('special_4')
.invoice
  bg-image('invoice_4')
.guarantee
  bg-image('guarantee_4')

.column-header
  font-size 14px
  font-weight 500
  color rgb(7,17,27)
  line-height 14px
.column-list
  padding 16px 12px
  border-1px(rgba(7,17,27,0.1))
  font-size 12px
  font-weight 200
  color rgb(7,17,27)
  line-height 16px
  vertical-align middle
  &:last-child
    border-1px(transparent)
    padding-bottom 0
</style>
