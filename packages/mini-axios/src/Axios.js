import InterceptorManager from './InterceptorManager.js'

import {dispatchRequest,mergeConfig} from './utils.js'
function Axios(config){
  this.defaults = config
  this.interceptors = {
    request:new InterceptorManager(),
    response:new InterceptorManager()
  }
}
Axios.prototype.request = function(config){
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // hooks
  let promise = Promise.resolve(config);
  let chain = [dispatchRequest, undefined];


  this.interceptors.request.handlers.forEach(interceptor => {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  })

  this.interceptors.response.handlers.forEach(interceptor => {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  })


  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }
  return promise
};

['delete', 'get', 'head', 'options'].forEach(method => {
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url
    }));
  }
});

['post', 'put', 'patch'].forEach(method => {
  Axios.prototype[method] = function(url, data,config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data
    }));
  }
})

export default Axios;