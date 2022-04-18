import InterceptorManager from './src/InterceptorManager.js'
import {dispatchRequest} from './src/utils.js'
class Axios{
  constructor(config){
    this.config = config
    // 拦截器
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    }
  }
  // 将ajax、拦截器放在一个promise链中
  request({
    method='get',
    ...config
  }){
     method = this.config.method?this.config.method.toLowerCase():method.toLowerCase()
    let promise = Promise.resolve(config)
    // 存放ajax请求
    let chains = [dispatchRequest,undefined]
    this.interceptors.request.handlers.forEach(({resolved,rejected})=>{
      chains.unshift(resolved,rejected)
    })
    this.interceptors.response.handlers.forEach(({resolved,rejected})=>{
      chains.push(resolved,rejected)
    })
    // 处理promise链
    while(chains.length){
      // 取出前两个执行
      promise = promise.then(chains.shift(),chains.shift())
    }
    return promise
  }
  // const methodsArr = ['get', 'delete', 'head', 'options', 'put', 'patch', 'post']
  
  get(url,config){
    return this.request({
      url,
      method:'get',
      ...config
    })
  }
  delete(url,config){
    return this.request({
      url,
      method:'delete',
      ...config
    })
  }
  post(url,data,config){
    return this.request({
      url,
      method:'post',
      ...config
    })
  }
  put(url,data,config){
    return this.request({
      url,
      method:'put',
      ...config
    })
  }
  
}


// createInstance
export default function createInstance(defaultConfig) {
  const context = new Axios(defaultConfig) // 此时context可以当对象使用，内部包含defaults和interceptors两个属性

  let instance = Axios.prototype.request.bind(context)  // 此时axios可以作函数调用，this指向context


  // Axios.prototype 
  // 把Axios显示原型上的属性绑定给instance
  for(item in Axios.prototype){
    console.log(1,item)
    instance[item] = Axios.prototype[item]
  }
  

  // 把context的属性(defaults和interceptors)绑定给axios
  Object.keys(context).forEach(key=>{
    instance[key] = context[key]
  })

  // 给instance绑定取消请求的函数
  instance.CancelToken = function (excutor) {
    // 声明一个变量
    let resolvePromise

    // 为实例对象添加属性
    this.promise = new Promise(resolve => {
      resolvePromise = resolve
    })

    // 调用excutor函数
    excutor(function () {
      resolvePromise()
    })
  }

  return instance
}