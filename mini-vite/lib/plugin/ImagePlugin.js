const { readBody } = require('./../utils.js')
const path = require('path')
const fs = require('fs').promises
// const { createArrayExpression } = require('_@vue_compiler-core@3.2.31@@vue/compiler-core')
// 正则 匹配ping,jpg
const reg = /(png|jpg)$/
module.exports = function({app,root}){
    app.use(async (ctx,next)=>{
      if(!reg.test(ctx.path)) {return next()}
      // ctx.type = RegExp.$1
      // const imgPath = path.join(root,ctx.path )
      // const file = await fs.readFile(imgPath)
      // ctx.body = file
      const imgPath = path.join(root,ctx.path )
      const file = await fs.readFile(imgPath)
      let url = `data:image/${RegExp.$1};base64,${file.toString('base64')}`
      ctx.type = 'js'
      ctx.body = `export default ${JSON.stringify(url)}`
    
    })
}