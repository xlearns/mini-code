
const path = require('path')
function moduleRewritePlugin({app,root}){
  // 中间件
  app.use(async (ctx,next)=>{
    await next()
    console.log(1)
    // 当前请求的路径
    let path = ctx.path
    // 当前请求的路径是否是以.js结尾
    let isJs = path.endsWith('.js')
    // 当前请求的路径是否是以.css结尾
    let isCss = path.endsWith('.css')
    // 当前请求的路径是否是以.png结尾
    let isPng = path.endsWith('.png')
  })
}

module.exports = moduleRewritePlugin