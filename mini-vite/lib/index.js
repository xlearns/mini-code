const koa = require('koa')
let {promisify} = require('util')
const chalk = require('chalk');
let asyncFiglet = promisify(require('figlet'))
// 静态托管
const serverStaticPlugin = require('./plugin/serverPluginService');
// 加载资源
const moduleReWritePlugin = require('./plugin/moduleRewritePlugin');
const port = process.env.PORT || 3000

async function log(text,open=true){
  let data = await asyncFiglet(text)
  console.log(chalk.blue(open?data:text));
}

function createServer(){
  const app = new koa()

  const content = {
    // 当前koa对象
    app,
    // 根目录
    root:process.cwd()
  }
 
  // 插件
  const plugins = [serverStaticPlugin,moduleReWritePlugin]
  plugins.forEach(plugin=>plugin(content))

  return app;
}


createServer().listen(port,()=>{
  log(`vite start ${port}`,false)
})