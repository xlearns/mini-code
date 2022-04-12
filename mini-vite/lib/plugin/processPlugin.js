const { readBody } = require('./../utils.js')
// 解析html并且添加window.process
module.exports = function({app,root}){
  const injection = `
  <script>
    window.process = { env: { NODE_NEV: 'development' } }
  </script>
  `
  app.use(async (ctx, next) => {
    await next()
    if (ctx.response.is('html')) {
      const html = await readBody(ctx.body)
      ctx.body = html.replace(/<\/head>/, `$&${injection}`)
    }
  })

}