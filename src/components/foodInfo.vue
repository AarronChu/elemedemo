<template>
  <div id="food-info" v-show="foodShow">
    <div class="icon-arrow_lift" @click="toggleFood"></div>
    <div class="food-picture">
      <img :src="food.image">
    </div>
    <div class="food-detail">
      <div class="food-name">
        <h2>{{food.name}}</h2>
        <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
      </div>
      <div class="food-price">
        <span>￥</span><span>{{food.price}}</span><span>￥</span><span>{{food.oldPrice}}</span>
      </div>
      <div class="add-to-cart" @click="addToCart">
        <span>加入购物车</span>
      </div>
    </div>
    <div class="column-box">
      <div class="column-header">商品介绍</div>
      <p>{{food.info}}</p>
    </div>
    <div class="column-box">
      <div class="column-header">商品评价</div>
      <div class="food-comment-filter">
        <div @click="filterComments(0)">全部<span>{{ratings.length}}</span></div>
        <div @click="filterComments(1)">推荐<span>{{recommendCount||0}}</span></div>
        <div @click="filterComments(2)">吐槽<span>{{complainCount||0}}</span></div>
      </div>
      <div class="filter-text" @click="filterComments(3)">
        <span class="icon-check_circle" :class="hasContent?'has-content':''"></span><span>只看有内容的评价</span>
      </div>
    </div>
    <div class="food-comments-list">
      <div class="comment-detail" v-for="(rating,index) in (filteredRatings.length>0?filteredRatings:ratings)" :key="index">
        <div class="food-comment-time">{{formatTime(rating.rateTime)}}</div>
        <div class="food-comment-user">
          <span>{{rating.username}}</span>
          <div><img :src="rating.avatar"></div>
        </div>
        <div class="food-comment-text">
          <span :class="rating.rateType===0?'icon-thumb_up':'icon-thumb_down'" ></span><span v-show="rating.text">{{rating.text}}</span>
        </div>
      </div>
      <div class="no-content">没有更多了</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import shopcart from './shopcart'
import {filterComments, formatTime} from '../main.js'
export default {
  name: 'foodinfo',
  props: {
    food: {
      type: Object,
      required: true,
    },
    ratings: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      filteredRatings: [],
      hasContent: false,
      foodShow: false,
    }
  },
  components: {
    shopcart
  },
  
  methods: {
    toggleFood () {
      // this.$emit('showFood')
      this.foodShow = !this.foodShow
    },
    addToCart () {
      if(!this.food.count){
        Vue.set(this.food, 'count')
        this.food.count = 1
      }else{
        this.food.count++
      }
    },
    formatTime (time) {
      return formatTime(time)
    },
    filterComments (index) {
      let _this = this
      // 0 'all', 1 'recommend', 2 'complain', 3 'hasContent'
      filterComments(index, _this)
    },
  },
  computed: {
    recommendCount(){
      let rat = this.ratings
      let rec = rat.filter(ele => ele.rateType === 0)
      return rec.length
    },
    complainCount(){
      let rat = this.ratings
      let com = rat.filter(ele => ele.rateType === 1)
      return com.length
    }
    // commentsCount(){
    //   let rat = this.food.ratings
    //   let rec = rat.filter(ele => ele.rateType === 0)
    //   let com = rat.filter(ele => ele.rateType === 1)
    //   this.recommendCount = rec.length
    //   this.complainCount = com.length
    // }
  },
  // created(){
  //   this.ratings = this.food.ratings
  //   this.filteredRatings = this.ratings
  // },
  // beforeUpdate() {
  //   console.log(this.ratings,this.filteredRatings)
  //   this.commentsCount()
  // },
  // updated() {

  // },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
#food-info
  position fixed
  width 100%
  height 100%
  left 0
  top 0
  overflow hidden
  overflow-y scroll
  background-color #f3f5f7
  .icon-arrow_lift
    font-size 24px
    color rgba(7,17,27,0.5)
    position fixed
    top 18px
    left 18px
    z-index 10
  .food-picture
    img
      width 100%
      height 375px
  .food-detail
    background-color #ffffff
    padding 18px
    position relative
    border-1px(rgba(7,17,27,0.1))
    .food-name
      h2
        font-size 14px
        font-weight 700
        color rgb(7,17,27)
        line-height 14px
        margin-bottom 8px
      span
        font-size 10px
        color rgb(147,153,159)
        line-height 10px
        &:last-child
          margin-left 12px
    .food-price
      margin-top 18px
      span
        font-size 10px
        font-weight normal
        line-height 24px
        color rgb(147,153,159)
        vertical-align middle
        &:first-child
          color rgb(240,20,20)
        &:nth-child(2)
          font-size 14px
          font-weight 700
          color rgb(240,20,20)
        &:last-child
          font-weight 700
          text-decoration line-through
        &:nth-child(3)
          text-decoration line-through
          margin-left 4px
    .add-to-cart
      position absolute
      right 18px
      bottom 18px
      padding 6px 12px
      border-radius 24px
      background-color rgb(0,160,220)
      font-size 10px
      color rgb(255,255,255)
      line-height 24px
  .column-box
    margin-top 16px
    padding 18px 18px 12px
    background-color #ffffff
    border-top 1px solid rgba(7,17,27,0.1)
    border-1px(rgba(7,17,27,0.1))
    .column-header
      font-size 14px
      line-height 14px
      color rgb(7,17,27)
    p
      padding 6px 8px 6px
      font-size 12px
      line-height 24px
      color rgb(77,85,93)
      font-weight 200
    .food-comment-filter
      padding 18px 0
      border-1px(rgba(7,17,27,0.1))
      div
        display inline-block
        font-size 12px
        line-height 16px
        color rgb(77,85,93)
        padding 8px 12px
        border-radius 2px
        margin-right 8px
        &:first-of-type
          background-color rgb(0,160,220)
          color rgb(255,255,255)
        &:nth-of-type(2)
          background-color #d3edf8
        &:last-of-type
          background-color #e6e6e6
          margin-right 0
        span
          dont-size 8px
    .filter-text
      padding-top 12px
      font-size 12px
      color rgb(147,153,159)
      line-height 24px
      span:first-child
        font-size 24px
      span:last-child
        margin-left 4px
        vertical-align top
      .has-content
        color rgb(0,160,220)
  .food-comments-list
    background-color #ffffff
    padding 0 18px 48px
    .no-content
      padding-top 8px
      text-align center
      font-size 10px
      color rgb(147,153,159)
      line-height 24px
    .comment-detail
      position relative
      padding 16px 0
      border-1px(rgba(7,17,27,0.1))
      font-size 10px
      color rgb(147,153,159)
      line-height 12px
      .food-comment-user
        position absolute
        right 0
        top 16px
        span
          margin-right 6px
          vertical-align top
        div
          display inline-block
          border-radius 12px
          overflow hidden
          img
            width 12px
            height 12px
      .food-comment-text
        margin-top 6px
        font-size 12px
        line-height 16px
        color rgb(7,17,27)
        span
          margin-right 4px
        .icon-thumb_up
          color rgb(0,160,220)
        .icon-thumb_down
          color rgb(147,153,159)
</style>
