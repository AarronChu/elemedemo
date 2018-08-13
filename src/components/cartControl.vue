<template>
  <div id="cart-control">
    <span class="reduce icon-remove_circle_outline" v-show="food.count > 0" @click.stop="remove"></span>
    <span class="count" v-show="food.count > 0">{{food.count}}</span>
    <span class="add icon-add_circle" @click.stop="add"></span>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    },
    totalCount: {
      type: Number
    }
  },
  methods: {
    add (event) {
      if(event._constructed){
        if(!this.food.count){
          Vue.set(this.food, 'count')
          this.food.count = 1
        }else{
          this.food.count ++
          console.log(this.food.count)
        }
      }
      // console.log(this.food)
    },
    remove (event) {
      if(event._constructed){
        if(this.food.count === 0){
          if(this.totalCount <= 1){
            this.$emit('clearAll')
          }
        }else{
          this.food.count --
        }
      }
    }
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
#cart-control
  font-size 0
  .icon-remove_circle_outline, .icon-add_circle
    display inline-block
    width 24px
    height 24px
    line-height 24px
    font-size 24px
  .reduce, .add
    color #00a0dc
    display inline-block
    padding 6px
  .count
    font-size 10px
    display inline-block
    width 12px
    text-align center
    line-height 36px
    color rgb(147,153,159)
    vertical-align top
</style>
