<template>
  <div id="ratings">
    <div class="ratings-all">
      <div class="total-score">
        <div class="score">{{seller.score}}</div>
        <div class="title">综合评分</div>
        <div class="compare">高于周边商家{{seller.rankRate}}%</div>
      </div><div class="detail-score">
        <div class="item-detail">
          <span class="detail-title">服务态度</span>
          <div class="star-box"><stars :score="seller.serviceScore"></stars></div>
          <span class="item-score">{{seller.serviceScore}}</span>
        </div>
        <div class="item-detail">
          <span class="detail-title">餐品味道</span>
          <div class="star-box"><stars :score="seller.foodScore"></stars></div>
          <span class="item-score">{{seller.foodScore}}</span>
        </div>
        <div class="item-detail">
          <span class="detail-title">送达时间</span>
          <span class="time">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <div class="comments">
      <div class="comments-count">
        <div class="satisfied">
          <div @click="filterComments(0)">全部<span>{{ratings.length}}</span></div>
          <div @click="filterComments(1)">满意<span>{{satisfiedCount}}</span></div>
          <div @click="filterComments(2)">不满意<span>{{unsatisfiedCount}}</span></div>
        </div>
        <div class="filter-comments" @click="filterComments(3)">
          <span class="icon-check_circle check-icon" :class="hasContent?'has-content':''"></span>
          <span class="check-info">只看有内容的评价</span>
        </div>
      </div>
      <div class="comments-wrapper" v-for="(rating,index) in (filteredRatings.length?filteredRatings:ratings)" :key="index">
        <div class="user-picture">
          <img :src="rating.avatar">
        </div>
        <div class="comments-detail">
          <div class="comment-title">
            <span class="user-name">{{rating.username}}</span>
            <span class="comment-time">{{formatTime(rating.rateTime)}}</span>
          </div>
          <div class="comment-score">
            <div class="comment-star"><stars :score="rating.score"></stars></div>
            <span class="receive-time" v-show="rating.deliveryTime" >{{rating.deliveryTime}}分钟送达</span>
          </div>
          <div class="comment-content" v-show="rating.text!==''">
            <p>{{rating.text}}</p>
          </div>
          <div class="comment-food">
            <span class="comment-icon" :class="rating.rateType===0?'icon-thumb_up':'icon-thumb_down'"></span>
            <span class="food-orded" v-for="food in rating.recommend" :key="food">{{food}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import stars from './stars'
import {filterComments, formatTime} from '../main.js'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  name: 'ratings',
  components: {
    stars
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      ratings: [],
      filteredRatings: [],
      hasContent: false
    }
  },
  methods: {
    formatTime (time) {
      return formatTime(time)
    },
    filterComments (index) {
      // console.log(vm)
      // 0 'all', 1 'satisfied', 2 'unsatisfied', 3 'hasContent'
      let _this = this
      filterComments(index, _this)
    }
  },
  computed: {
    satisfiedCount () {
      let sat = this.ratings.filter(ele => ele.rateType === 0)
      return sat.length
    },
    unsatisfiedCount () {
      let uns = this.ratings.filter(ele => ele.rateType === 1)
      return uns.length
    }
  },
  created () {
    axios.get('/good/ratings').then(res => {
      if(res.data.code === 0){
        this.ratings = res.data.data
      }
    })
    // setTimeout(() => {
    //   console.log(this.formatTime())
    // },1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
#ratings
  width 100%
  background-color #f3f5f7
  .ratings-all
    margin-bottom 16px
    border-1px(rgba(7,17,27,0.1))
    font-size 12px
    color rgb(7,17,27)
    background #ffffff
    .total-score, .detail-score
      display inline-block
      margin 18px 0
    .total-score
      border-1px-right(rgba(7,17,27,0.1))
      text-align center
      width 137px
      .score
        color rgb(255,163,0)
        font-size 24px
        line-height 28px
        font-weight 500
        margin-bottom 6px
      .title
        line-height 12px
        margin-bottom 8px
      .compare
        font-size 10px
        color rgb(147,153,159)
        line-height 10px
        margin-bottom 6px
    .detail-score
      padding 0 24px
      .item-detail
        padding 4px 0
        .detail-title
          line-height 18px
        .star-box
          display inline-block
          margin 0 12px
          vertical-align top
          #star
            height 18px
            margin 0
            padding 0
            .star-icon
              display inline-block
              width 14px
              height 14px
              margin 0 2px
              background-size 14px 14px
              .item-score
                line-height 18px
                color rgb(255,153,0)
              .time
                color rgb(147,153,159)
                margin-left 12px
  .comments
    background #ffffff
    .comments-count
      border-1px-top(rgba(7,17,27,0.1))
      border-1px(rgba(7,17,27,0.1))
      .satisfied
        margin 0 18px
        padding 18px 0
        border-1px(rgba(7,17,27,0.1))
        div
          display inline-block
          margin-right 8px
          padding 8px 12px
          border-radius 2px
          font-size 12px
          color rgb(77,85,93)
          span
            font-size 8px
        div:nth-of-type(1)
          background-color rgb(0,160,220)
          color rgb(255,255,255)
        div:nth-of-type(2)
          background-color #d3edf8
        div:nth-of-type(3)
          background-color #e6e6e6
      .filter-comments
        margin 0 18px
        padding 12px 0
        color rgb(147,153,159)
        font-size 12px
        line-height 24px
        .check-icon
          font-size 24px
          &.has-content
            color rgb(0,160,220)
        .check-info
          vertical-align top
    .comments-wrapper
      margin 0 18px
      padding 18px 0
      border-1px(rgba(7,17,27,0.1))
      .user-picture
        float left
        border-radius 28px
        overflow hidden
        img
          width 28px
          height 28px
      .comments-detail
        margin-left 40px
        .comment-title
          font-size 10px
          line-height 12px
          .user-name
            color rgb(7,17,27)
          .comment-time
            color rgb(147,153,159)
            font-weight 200
            float right
        .comment-score
          margin-top 4px
          .comment-star
            display inline-block
            #star
              height 12px
              margin 0
              padding 0
              .star-icon
                display inline-block
                width 12px
                height 12px
                margin 0 2px
                background-size 12px 12px
          .receive-time
            font-size 10px
            font-weight 200
            color rgb(147,153,159)
            line-height 12px
        .comment-content
          margin-top 6px
          font-size 12px
          color rgb(7,17,27)
          line-height 18px
        .comment-food
          margin-top 8px
          .comment-icon
            font-size 12px
            line-height 16px
          .icon-thumb_up
            color rgb(0,160,220)
          .icon-thumb_down
            color rgb(183,187,191)
          .food-orded
            padding 0 6px
            border .5px solid rgba(7,17,27,0.1)
            border-radius 1px
            font-size 9px
            color rgb(147,153,159)
            line-height 16px
            margin-left 8px
</style>
