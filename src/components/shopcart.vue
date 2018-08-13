<template>
  <div id="shopcart">
    <div class="content">
      <div class="chart-icon-wrapper" @click="goList">
        <div class="chart-icon icon-shopping_cart" :class="{noZChart:totalCount!==0}"></div>
        <div class="total-count" v-show="totalCount !== 0">{{totalCount}}</div>
      </div>
      <div class="delivery-fee" @click="goList">
        <div class="price border-1px-right" :class="{noZPrice:totalPrice!==0}">￥{{totalPrice}}</div>
        <div class="delivery-price">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="delivery-base" :class="{ok:totalPrice>=minPrice}">
        {{inform}}
      </div>
    </div>
    <div class="cart-list-wrapper" v-show="showList">
      <div class="cart-gray" @click="goList"></div>
      <div class="cart-list">
        <div class="cart-list-header">
          <span class="cart-title">购物车</span><span class="clear" @click="clearAll">清空</span>
        </div>
        <div class="foods-list" ref="cartScroll">
          <div class="food-item" v-for="food in selectFoods" :key="food.id">
            <span class="food-title">{{food.name}}</span>
            <span class="food-price">{{food.price}}</span>
            <cart-control class="cart-control" :food="food" :totalCount="totalCount" @clearAll="clearAll"></cart-control>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import cartcontrol from './cartControl'
import BScroll from 'better-scroll'
export default {
  name: 'shopcart',
  components: {
    'cart-control': cartcontrol
  },
  props: {
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    },
    selectFoods: {
      type: Array,
      default () {
        return [
          {count: 0, price: 0},
          {count: 0, price: 0}
        ]
      }
    }
  },
  data () {
    return {
      msg: 'helloworld',
      showList: false
    }
  },
  computed: {
    totalCount () {
      let totalCount = 0
      this.selectFoods.forEach(food => {
        totalCount += food.count
      })
      return totalCount
    },
    totalPrice () {
      let totalPrice = 0
      this.selectFoods.forEach(food => {
        totalPrice += food.count * food.price
      })
      return totalPrice
    },
    inform(){
      if (this.totalPrice === 0) {
        return `起送费￥${this.minPrice}元`
      } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
        return `还差￥${this.minPrice - this.totalPrice}元起送`
      } else {
        return '去结算'
      }
    }
  },
  methods: {
    goList(){
      if(!this.selectFoods.length){
        return
      }
      this.showList = !this.showList
      this._initScroll()
    },
    clearAll(){
      this.selectFoods.forEach(food => {
        food.count = 0
      })
      this.showList = false
    },
    _initScroll(){
      console.log(this.$refs)
      this.scroll = new BScroll(this.$refs.cartScroll,{
        click: true
      })
      this.scroll.on('scroll', pos => {})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
#shopcart
  position fixed
  height 48px
  width 100%
  bottom 0
  left 0
  z-index 100
  .content
    width 100%
    display flex
    background #141d27
    .chart-icon-wrapper
      flex 0 0 80px
      position relative
      .chart-icon
        position relative
        width 44px
        height 44px
        border-radius 44px
        border 6px solid #141d27
        background-color #2b333b
        margin-left 12px
        margin-top -10px
        font-size 24px
        color rgba(255,255,255,0.4)
        line-height 44px
        text-align center
        &.noZChart
          background-color #00a0dc
          color #ffffff
      .total-count
        position absolute
        right 12px
        top -10px
        text-align center
        background-color red
        color #ffffff
        width 24px
        height 16px
        font-size 8px
        font-weight 700
        line-height 16px
        box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
        border-radius 16px
    .delivery-fee
      flex 1
      padding 12px 0 12px 0
      height 24px
      .price
        display inline-block
        line-height 24px
        font-weight 700
        color rgba(255,255,255,0.4)
        border-1px-right (rgba(255,255,255,0.2))
        padding-right 12px
        &.noZPrice
          color #ffffff
      .delivery-price
        display inline-block
        padding-left 12px
        font-size 12px
        color rgba(255,255,255,0.4)
        line-height 20px
        font-weight 700
    .delivery-base
      flex 0 0 105px
      padding 0 8px
      line-height 48px
      font-size 12px
      text-align center
      color rgba(255,255,255,0.4)
      font-weight 700
      background-color #2b333b
      &.ok
        background-color #999966
        color #ffffff
  .cart-list-wrapper
    position fixed
    top 0px
    bottom 48px
    width 100%
    display flex
    flex-direction column
    z-index -10
    .cart-gray
      flex 1
      background-color rgba(7,17,27,0.6)
    .cart-list
      width 100%
      position fixed
      bottom 48px
      left 0
      background-color #ffffff
      .cart-list-header
        height 40px
        line-height 40px
        padding 0 18px
        border-1px(rgba(7,17,27,0.1))
        background-color #f3f5f7
        .cart-title
          font-size 14px
          font-weight 200
          color rgb(7,17,27)
        .clear
          position absolute
          right 18px
          font-size 12px
          color rgb(0,160,220)
      .foods-list
        overflow auto
        max-height 217px
        .food-item
          width 100%
          height 48px
          line-height 48px
          margin 0 18px
          border-1px(rgba(7,17,27,0.1))
          .food-title
            font-size 14px
            color rgb(7,17,27)
          .food-price
            position absolute
            right 120px
            font-size 10px
          .cart-control
            position absolute
            right 18px
            top 6px
            display inline-block
</style>
