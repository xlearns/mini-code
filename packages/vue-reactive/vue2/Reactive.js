import Dep from "./Dep.js";

export const observe = function observe(value) {
  if (!value || typeof value !== "object") return;
  return observer(value);
};

export const observer = function observer(target) {
  Object.keys(target).forEach((key) => {
    defineRective(target, key, target[key]);
  });
};

function defineRective(target, key, val) {
  observe(val);
  let dep = new Dep();
  Object.defineProperty(target, key, {
    // 可枚举  
    enumerable: true,
    // 不可配置
    configurable: false,
    get() {
      // 收集依赖
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set(newVal) {
      if (val === newVal) return;
      val = newVal;
      // 触发依赖
      dep.notify();
    },
  });
}
