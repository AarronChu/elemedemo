<template>
  <div id="star">
    <div class="star-icon" v-for="(star, index) in starArr" :key="index" :class="star"></div>
  </div>
</template>

<script>
export default {
  props:{
    score: {
      type: Number
    }
  },
  data () {
    return {
      starArr: []
    }
  },
  computed: {
    countStar () {
      let score = this.score
      let starArr = []
      if(score < 0.3){
        starArr = ['off','off','off','off','off']
      }else if(score >= 0.3 && score < 0.8){
        starArr = ['half','off','off','off','off']
      }else if(score >= 0.8 && score < 1.3){
        starArr = ['on','off','off','off','off']
      }else if(score >= 1.3 && score < 1.8){
        starArr = ['on','half','off','off','off']
      }else if(score >= 1.8 && score < 2.3){
        starArr = ['on','on','off','off','off']
      }else if(score >= 2.3 && score < 2.8){
        starArr = ['on','on','half','off','off']
      }else if(score >= 2.8 && score < 3.3){
        starArr = ['on','on','on','off','off']
      }else if(score >= 3.3 && score < 3.8){
        starArr = ['on','on','on','half','off']
      }else if(score >= 3.8 && score < 4.3){
        starArr = ['on','on','on','on','off']
      }else if(score >= 4.3 && score < 4.8){
        starArr = ['on','on','on','on','half']
      }else{
        starArr = ['on','on','on','on','on']
      }
      return starArr
    }
  },
  created () {
    this.starArr = this.countStar
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
#star
  width 100%
  height 24px
  margin-top 16px
  .star-icon
    display inline-block
    width 24px
    height 24px
    margin 0 10px
    background-size 24px 24px
    &.on
      bg-image('star48_on')
    &.half
      bg-image('star48_half')
    &.off
      bg-image('star48_off')
</style>