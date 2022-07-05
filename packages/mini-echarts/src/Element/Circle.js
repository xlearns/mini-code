import Element from "./Element.js";
export default class Circle extends Element {
  constructor(opt) {
    super(opt);
  }
  render(ctx) {
    let shape = this.shape;
    ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2, true);
  }
}
