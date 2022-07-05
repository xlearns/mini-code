const Koa = require('koa');
let {promisify} = require('util')
const chalk = require('chalk');
let asyncFiglet = promisify(require('figlet'))
const open = require('open');


// 静态托管
const serverPluginService = require('./plugin/serverPluginService');
// 加载js资源,遇到import外部导入的包的话,替换成/@modules/xxx
const moduleReWritePlugin = require('./plugin/moduleRewritePlugin');
// 解析html
const processPlugin = require('./plugin/processPlugin');
// 解析带有@modules的路径
const resolveModulePlugin = require('./plugin/resolveModulePlugin');
// 解析vue
const vuePlugin = require('./plugin/vuePlugin.js');
// 解析图片
const ImagePlugin = require('./plugin/imagePlugin');

const port = process.env.PORT || 3000

async function log(text,open=true){
  let data = await asyncFiglet(text)
  console.log(chalk.blue(open?data:text));
}

function createServer(){
  const app = new Koa()
  const root = process.cwd()
  const content = {
    // 当前koa对象
    app,
    // 根目录
    root
  }
  
  
  // 插件
  const plugins = [processPlugin,moduleReWritePlugin,resolveModulePlugin,vuePlugin,ImagePlugin,serverPluginService]
  plugins.forEach(plugin=>plugin(content))
  


  return app;
}


createServer().listen(port,()=>{
  log(`vite start ${port}`,false)
  // open(`http://localhost:${port}`)
})