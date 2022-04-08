import Compile from './Compile.js'
import {observer} from './Reactive.js'
export default class Vue{
  constructor(options){
     // 获取传入的参数
     this.$options = options
     // 获取数据data
     this.$data = options.data
     // 获取挂载点
     this.$el = document.querySelector(options.el)
     // 数据劫持
     observer(this.$data,this)
     // 编译
     new Compile(this.$el , this)
  }
}