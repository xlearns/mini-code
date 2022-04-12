const { Readable } = require('stream')
exports.readBody = async function(body){
  // 二进制文件
  if(body instanceof Readable){
    return new Promise(r => {
      let buffers = []
      body
        .on('data', chunk => {
          buffers.push(chunk)
        })
        .on('end', () => {
          r(Buffer.concat(buffers).toString())
        })
    })
  }
  return body.toString()
}