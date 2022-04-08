const { Compilation, Compiler } = require('webpack')

function html({title,scripts}){
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    ${scripts.map(src => `<script defer src="${src}"></script>`).join('\n  ')}
  </head>
  <body>
    Hello, World
  </body>
  </html>
  `
}

function getPublicPath (compilation) {
  const compilationHash = compilation.hash

  // outputOptions.publicPath 有可能由一个函数设置，这里通过 webpack API 获取到字符串形式的 publicPath
  let publicPath = compilation.getAssetPath(compilation.outputOptions.publicPath, { hash: compilationHash })

  // 如果 output.publicPath 没有设置，则它的选项为 auto
  if (publicPath === 'auto') {
    publicPath = '/'
  }

  if (publicPath.length && publicPath.substr(-1, 1) !== '/') {
    publicPath += '/'
  }

  return publicPath
}

class HtmlWebpackPlugin{
 constructor(options){
    this.options = options || []
 }
 apply(compiler){
   const webpack = compiler.webpack
   compiler.hooks.thisCompilation.tap('HtmlWebpackPlugin',(compilation)=>{
    compilation.hooks.processAssets.tapAsync({
      name: 'HtmlWebpackPlugin',
      stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS
    },(assets, callback)=>{
      // assets 将得到所有生成的资源，如各个 chunk.js、各个 image、css
      // 如果你想要添加一些自定义的资源，可以在这里添加
      // assets['my-custom-asset'] = 'my-custom-asset'
      // callback()
      const compilation = assets

      // 获取 webpac.output.publicPath 选项，(PS: publicPath 选项有可能是通过函数设置)
      const publicPath = getPublicPath(compilation)

      // compilation.entrypoints 可获取入口文件信息
      const entryNames = Array.from(compilation.entrypoints.keys())
       // entryPoint.getFiles() 将获取到该入口的所有资源，并能够保证加载顺序！！！如 runtime-chunk -> main-chunk
      const assetsAll = entryNames.map(entryName => compilation.entrypoints.get(entryName).getFiles()).flat()
      const scripts = assetsAll.map(src => publicPath + src)
      const content = html({ title: this.options.title || 'Demo', scripts })
       // emitAsset 用以生成资源文件，也是最重要的一步
       compilation.emitAsset('index.html', new webpack.sources.RawSource(content))
       callback()
    })
   })
 }
} 

module.exports = HtmlWebpackPlugin



