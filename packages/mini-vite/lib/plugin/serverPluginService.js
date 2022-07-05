const static = require("koa-static")
const path = require('path')

module.exports = function({app,root}){
  // 托管root目录下的静态资源[根目录的index.html]去加载js,css,img等
  app.use(static(root))
  // 托管跟目录下的demo目录
  app.use(static(path.resolve(root,'public')))
}