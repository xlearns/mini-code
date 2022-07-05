export function init(el) {
  let dom = document.querySelector(el);
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  console.log(dom.clientHeight);
  canvas.width = dom.clientWidth;
  canvas.height = dom.clientHeight;
  dom.appendChild(canvas);
  function add() {}
  return {
    add,
  };
}

export class Circle {
  constructor(options) {
    init(options);
  }
  init(options) {
    Object.assign(this, options);
  }
}
