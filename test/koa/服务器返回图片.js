const Koa = require('koa');
const app = new Koa()
const fs = require('fs').promises
let port = 3000

app.use(async (ctx,next)=>{
  // 加载字符串
  // ctx.body = "hello world"
  
  // 加载html标签
  // ctx.body = "<h1>123</h1>"

  // 读取html 并加载
  // let file = await fs.readFile('./test.html')
  // ctx.type = 'html'
  // ctx.body = file


  // 加载json
  // let json = await fs.readFile('./hah.json')
  // ctx.type = 'json'
  // ctx.body = json

  // 读取图片 并加载 
  // readFile只能读取本地文件
  let file = await fs.readFile('./xue.jpeg')
  ctx.type = 'jpg'
  ctx.body = file
})

app.listen(port,()=>{
  console.log(`http://localhost:${port}`)
})