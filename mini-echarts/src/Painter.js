import { debounce } from "./utils.js";

// 创建canvas
function createCanvas(dom) {
  if (typeof dom == "string") {
    dom = document.querySelector(dom);
  }
  const canvas = document.createElement("canvas");
  dom.innerHTML = "";
  dom.appendChild(canvas);
  canvas.height = dom.clientHeight
  canvas.width = dom.clientWidth
  return canvas;
}
export default class Painter {
  constructor(dom, stage,opt) {
    this.canvas = createCanvas(dom);
    setCanvasStyle(this.canvas, opt)
    this.stage = stage;
    this.ctx = this.canvas.getContext("2d");
  }
  render = debounce(()=>{
    let eleAll = this.stage.getAll();
    eleAll.forEach((ele) => {
      ele.refresh(this.ctx);
    });
   },16)
}


function setCanvasStyle(canvas,opt = {}){
  if (opt.height) {
    canvas.height = opt.height
    canvas.style.height = `${opt.height}px`
  } else {
    opt.height = canvas.clientHeight
  }
  if (opt.width) {
    canvas.width = opt.width
    canvas.style.width = `${opt.width}px`
  } else {
    opt.width = canvas.clientWidth
  }
  if (opt.backgroundColor) {
    canvas.style.backgroundColor = opt.backgroundColor
  }
}