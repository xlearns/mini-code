import Dep from "./Dep.js";

export default class Watcher{
  constructor(node,vm,exp,cb){
    this.$vm = vm;
    this.$exp = exp;
    this.cb = cb;
    
    Dep.target = this
    this.$vm[this.$exp] // 触发get 将this也就是当前watcher添加到Dep中
    Dep.target = null
  }
  // 触发依赖的时候触发
  update(){
    this.cb.call(this.$vm,this.$vm[this.$exp])
  }
}