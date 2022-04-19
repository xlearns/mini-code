

// ajax适配器
export function xhrAdaper({
  method='get',
  url='',
  cancelToken,
  async=true,
  CancelToken,
  data=null,
}){
  return new Promise((resolve,reject)=>{
    const xhr = new XMLHttpRequest()
    xhr.open(method,url,async)
    xhr.send(data&&JSON.stringify(data))
    xhr.onreadystatechange  = function(){
      if(xhr.readyState===4){
          if(xhr.status>=200 && xhr.status<300){
            resolve({
              code:200,
              data:JSON.parse(xhr.response),
              header:xhr.getAllResponseHeaders,
              request:xhr,
              status:xhr.status,
              statusText:xhr.statusText
            })
          }else{
            reject(new Error(xhr.status))
          }
      }
    }

    // 取消xhr
    if(CancelToken){
      // 对cancelToken上的promise绑定成功的回调
      CancelToken.promise.then(reason=>{
        xhr.abort()
        reject(new Error(reason))
      })
    }
  })
}

// dispatchRequest函数
export function dispatchRequest(config) {
    return xhrAdaper(config).then(res=>{
      return res
    },error=>{
      throw error
    })
}


// 将A对象添加到B对象上
export function extend(target,...sources){
  sources.forEach(source=>{
    for(let key in source){
      target[key] = source[key]
    }
  })
  return target
}

export  function mergeConfig (config1,config2){
  return Object.assign(config1,config2)
}