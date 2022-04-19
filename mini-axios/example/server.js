var express = require('express');
var cors = require("cors")
var app = express();
app.use(cors())

function sleep(time=3000){
  return new Promise(resolve=>setTimeout(resolve,time))
}

//发送请求，获取客户端ip
app.get('/posts', async function (req, res) {
  await sleep(1000)
  res.send({
    msg:"'Hello World'"
  });
})
app.put('/posts', function (req, res) {
  res.send('Hello World');
})
app.delete('/posts', function (req, res) {
  res.send('Hello World');
})
app.put('/posts', function (req, res) {
  res.send('Hello World');
})
app.listen(3000,function () {
  console.log('http://localhost:3000')
})