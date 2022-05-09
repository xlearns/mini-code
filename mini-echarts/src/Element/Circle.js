import Element from "./Element.js";
export default class Circle extends Element {
  constructor(opt) {
    super(opt);
    this.shape = {
      cx: 0,
      cy: 0,
      r: 100,
    };
  }
  render(ctx) {
    let shape = this.shape;
    ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2, true);
  }
}
