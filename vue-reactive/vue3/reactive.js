import {isObject} from './utils.js'

// 装有所有effect的数组
const stack = []

const weakmap = new WeakMap()

const config = {
  get(obj,key){
    let data = Reflect.get(obj,key)
     // 收集依赖
    track(obj,key)
    return isObject(data)?reactive(data):data
  },
  set(obj,key,val){
    Reflect.set(obj,key,val)
     // 触发依赖
    trigger(obj,key,val)
    return true
  }
}

export const reactive = function reactive(obj){
  return new Proxy(obj,config)
}

export const effect = function effect(fn,option){
  let ef = createEffect(fn,option)
  if(!ef.lazy){
    ef()
  }
  return ef
}

function track(obj,key){
  let effect = stack[stack.length - 1]
  if(effect){
    let depsMap = weakmap.get(obj)
    if(!depsMap){
      depsMap = new Map()
      weakmap.set(obj,depsMap)
    }
    let deps = depsMap.get(key)
    if(!deps){
      deps = new Set()
      depsMap.set(key,deps)
    }
    if(!deps.has(effect)){
        deps.add(effect)
        effect.deps.push(effect)
    }
  }
}

function trigger(obj,key,value){
  let depsMap = weakmap.get(obj)
  let computed = new Set()
  let effects  = new Set()
  if(key){
    let deps = depsMap.get(key)
    deps.forEach(effect=>{
      if(effect.computed){
        computed.add(effect)
      }else{
        effects.add(effect)
      }
    }) 
  }
  computed.forEach(effect=>{
    effect()
  })
  effects.forEach(effect=>{
    effect()
  })
}

export const computed = function computed(fn){
  let ef = effect(fn,{lazy:true,computed:true})
  return {
    runner:ef,
    get value(){
      return ef()
    }
  }
}

function createEffect(fn,option = {}){
  const effect = function(...args){
    return run(effect,fn,args)
  }
  effect.deps = []
  effect.lazy = option.lazy
  effect.computed = option.computed
  return effect
}

function run(effect,fn,args){
  if(stack.indexOf(effect)===-1){
    try{
      stack.push(effect)
      return fn.apply(this,args)
    }finally{
      // 确保上面执行完一定会执行这句话
      stack.pop()
    }
  }
}



