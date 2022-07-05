
const path = require('path')
const fs = require('fs').promises
const { parse, compileTemplate } = require('@vue/compiler-sfc')

// 匹配export default
const exportDefaultReg = /export default/

module.exports = function({app,root}){
  app.use(async (ctx,next)=>{
    if (!ctx.path.endsWith('.vue')) return next()
    // vue文件  
    const filePath = path.join(root, ctx.path)
    // 拿到vue文件的内容
    const content = await fs.readFile(filePath, 'utf8')
    const { descriptor } = parse(content)  
    // 如果不存在 说明请求的是 app.vue
    if(!ctx.query.type){
      //app.vue
      let code = ''
      if (descriptor.script) {
        let content = descriptor.script.content
        code += content.replace(exportDefaultReg, 'const __script=')
      }
      if (descriptor.template) {
        const templateRequest = ctx.path + '?type=template'
        code += `\nimport { render as __render} from '${templateRequest}'`
        code += `\n__script.render = __render`
        code += '\nexport default __script'
        ctx.type = 'js'
        ctx.body = code
      }

    }else{
      // 解析template
      if (ctx.query.type === 'template') {
        ctx.type = 'js'
        let source = descriptor.template.content
        let { code } = compileTemplate({ source })
        ctx.body = code
      }
    }
  })
}