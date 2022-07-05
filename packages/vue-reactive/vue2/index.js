import Vue from './Vue.js'
var vm = new Vue({
  el : '#app',
  data:{
      name : 'xiaoming',
      age : 18,
      sex : '男',
      msg: 'nihao'
  },
  methods: {
      handleClick(){
          console.log(123)
          this.name = 'xiaoming555555555555'
      }
  },
})
