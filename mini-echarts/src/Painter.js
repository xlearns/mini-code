// 创建canvas
function createCanvas(dom) {
  if (typeof dom == "string") {
    dom = document.querySelector(dom);
  }
  const canvas = document.createElement("canvas");
  dom.appendChild(canvas);
  return canvas;
}
export default class Painter {
  constructor(dom, stage) {
    this.canvas = createCanvas(dom);
    this.stage = stage;
    this.ctx = this.canvas.getContext("2d");
  }
  render() {
    let eleAll = this.stage.getAll();
    eleAll.forEach((ele) => {
      ele.refresh(this.ctx);
    });
  }
}
