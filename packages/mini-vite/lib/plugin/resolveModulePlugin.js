const path = require('path')
const fs = require('fs').promises
// 找到文件或者目录
const findUp = require('find-up')
// 正则匹配@modules
const moduleReg = /\/@modules\//

module.exports = function({app,root}){
  app.use(async(ctx,next)=>{
    // 如何不含@modules的话,直接跳过
    if(!moduleReg.test(ctx.path)) {return next()}
    // 模块名称
    const moduleId = ctx.path.replace(moduleReg, '')
    // 设置加载的类型
    ctx.type = 'js'
    // @modules的真实地址
    const modulePath = await resolveModule(root, moduleId)
    // 解析module里面的内容
    const content = await fs.readFile(modulePath, 'utf8')
    ctx.body = content
  })
}
async function resolveModule(root,moduleId){
  // 找到node_modules
  let nodeModulePath = await findUp('node_modules', {
    cwd: root,
    type: 'directory'
  })
  
  // 找到模块package.json的路径
  const pckPath = path.resolve(nodeModulePath, `${moduleId}/package.json`)
  // 读取 package.json
  const pckJson = JSON.parse(await fs.readFile(pckPath, 'utf8'))

  // 找到模块的真实路径
  const modulePath = pckJson.module
  if (modulePath) {
    const finalFullpath = path.resolve(
      nodeModulePath,
      `${moduleId}/${modulePath}`
    )
    return finalFullpath
  }
  throw new Error(`${pckPath}中文件中没有定义module`)
}