// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../mock/index'

Vue.config.productionTip = false

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  methods: {
    formatTime (time) {
      let date = new Date(time)
      date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getSeconds()}`
      return date
    },
    filterComments (index, context) {
      let _this = context
      let filtered = _this.ratings
      if(!index){
        _this.hasContent = false
      }else if(index === 1){
        _this.hasContent = false
        filtered = _this.ratings.filter(ele => ele.rateType === 0)
      }else if(index === 2){
        _this.hasContent = false
        filtered = _this.ratings.filter(ele => ele.rateType === 1)
      }else if(index === 3){
        _this.hasContent = !_this.hasContent
        if(_this.hasContent){
          if(_this.filteredRatings && _this.filteredRatings.length > 0){
            filtered = _this.filteredRatings.filter(ele => ele.text !== '')
          }else{
            filtered = _this.ratings.filter(ele => ele.text !== '')
          }
        }
      }
      _this.filteredRatings = filtered
    }
  }
})

let filterComments = vm.filterComments
let formatTime = vm.formatTime

export {
  filterComments,
  formatTime,
}


