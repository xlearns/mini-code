import Element from "./Element.js";
export default class Rect extends Element {
  constructor(opt) {
    super(opt);
  }
  render(ctx) {
    let shape = this.shape;
    ctx.rect(shape.x, shape.y, shape.width, shape.height);
  }
}
