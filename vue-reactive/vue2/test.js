import { observer } from "./Reactive.js";
import Watcher from "./Watcher.js";
window.state = {
  name: "hello world",
  count: 0,
};
observer(window.state);

new Watcher(window.state, "count", (newVal) => {
  document.querySelector(
    "#app"
  ).innerHTML = `name:${state.name}<br/> count:${newVal}`;
});

new Watcher(window.state, "name", (newVal) => {
  document.querySelector(
    "#app"
  ).innerHTML = `name:${newVal}<br/> count:${state.count}`;
});

window.addEventListener("click", () => {
  state.count++;
});
