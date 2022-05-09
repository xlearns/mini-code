// 拿到所有导出模块
import * as zrender from "mini-zrender";

let zr = zrender.init("#app");


let circle = new zrender.Circle({
  shape: {
    cx: 40,
    cy: 40,
    r: 20,
  },
});
zr.add(circle);
