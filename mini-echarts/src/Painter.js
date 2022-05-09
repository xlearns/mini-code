// 创建canvas
function createCanvas(dom){
  const canvas = document.createElement('canvas')
  dom.appendChild(canvas)
  return canvas
}
export  class Painter {
  constructor(){
    console.log('painter');
  }
}