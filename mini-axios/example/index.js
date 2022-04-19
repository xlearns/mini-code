import axios from 'axios'
axios.interceptors.request.use((res)=>{
  console.log('请求拦截器 成功');
  return res;
},error=>{
  console.log('请求拦截器 失败');
  return error;
})

axios.interceptors.response.use((response)=>{
    console.log('响应拦截器 成功');
    return response;
  }, (error)=>{
    console.log('响应拦截器 失败')
    return Promise.reject(error);
  });
document.querySelector('.btn').onclick = function(){
  axios.post('http://baidu.com')
}