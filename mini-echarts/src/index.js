import Redner from "./ZRender.js";
export { default as Circle } from "./Element/Circle.js";
export { default as Rect } from "./Element/Rect.js";
export function init(dom,opt) {
  return new Redner(dom,opt);
}
