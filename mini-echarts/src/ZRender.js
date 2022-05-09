import State from "./State.js";
import Painter from "./Painter.js";

export default class ZRender {
  constructor(dom) {
    let state = new State();
    this.state = state;
    this.painter = new Painter(dom, state);
  }
  add(...el) {
    this.state.add(...el);
    this.render();
  }
  render() {
    this.painter.render();
  }
}
