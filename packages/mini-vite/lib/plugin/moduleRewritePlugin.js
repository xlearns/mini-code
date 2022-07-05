
const path = require('path')
const { readBody } = require('./../utils.js')
// 根据start and end替换字符串
const MagicString = require('magic-string')
// 解析esm import
const { parse } = require('es-module-lexer')

module.exports = function({app,root}){
  app.use(async (ctx,next)=>{
    await next()
    if (ctx.body && ctx.response.is('js')) {
      // 解析js
      const js = await readBody(ctx.body)
      const res = await rewriteImports(js)
      ctx.body = res
    }
  })
}

async function rewriteImports(source){
  const test = await parse(source)
  const [imports] = await parse(source)

  if (imports.length > 0) {
    const magicString = new MagicString(source)


    for (let i = 0; i < imports.length; i++) {
      // name start end
      const { n, s, e } = imports[i]
      
      // 如果不是以.或/开头
      if (/^[^\/\.]/.test(n)) {
        magicString.overwrite(s, e, `/@modules/${n}`)
      }
    }

    return magicString.toString()
  }
  return source
}