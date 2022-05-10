// 拿到所有导出模块
import * as zrender from "mini-zrender";

let zr = zrender.init(".box",{
  backgroundColor: "red"
});
let circle = new zrender.Circle({
  shape: {
    cx: 40,
    cy: 40,
    r: 20,
  },
});
let circle1 = new zrender.Circle({
  shape: {
    cx: 60,
    cy: 60,
    r: 20,
  },
  style: {
    fill: "#00f",
  },
});
let circle2 = new zrender.Circle({
  shape: {
    cx: 100,
    cy: 100,
    r: 40,
  },
  style: {
    fill: "#0ff",
    stroke: "#f00",
  },
});

let rect = new zrender.Rect({
  shape: {
    x: 110,
    y: 110,
    width: 40,
    height: 40,
  },
  style: {
    fill: "#0ff",
    stroke: "transparent",
  },
  zLevel:2,
});
zr.add(rect, circle, circle1, circle2);
