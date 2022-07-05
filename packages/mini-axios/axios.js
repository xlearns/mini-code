import Axios from './src/Axios.js'
import {extend,mergeConfig} from './src/utils.js'
import defaults from './src/default.js'
function createInstance(config){
  let context = new Axios(config);
  let instance = Axios.prototype.request.bind(context);
  // 挂在Axios.prototype上的属性
  extend(instance,Axios.prototype)
  // 挂载defaults和interceptors
  extend(instance,context)
  return instance;
}



let axios = createInstance(defaults)

axios.Axios = Axios

axios.create = function create(config){
  return createInstance(mergeConfig(defaults,config))
}

// 取消操作
axios.CancelToken = function(excutor){
  let resolvePromise
  this.promise = new Promise(resolve => {
    resolvePromise = resolve
  })
  excutor(resolvePromise)
}


export default axios