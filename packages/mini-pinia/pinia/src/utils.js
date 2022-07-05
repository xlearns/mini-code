import { isRef } from "vue";
// 合并对象与响应对象
export function mergeReactiveObject(target, partialState) {
  for (let key in partialState) {
    // 如果是原型上的不考虑
    const oldValue = target[key];
    const newValue = partialState[key];
    // 状态有可能是ref, ref也是一个对象不能递归
    if (
      isObject(oldValue) &&
      isObject(newValue) &&
      target.hasOwnProperty(key) &&
      !isRef(newValue) &&
      !isReactive(newValue)
    ) {
      target[key] = mergeReactiveObject(oldValue, newValue);
    } else {
      target[key] = newValue;
    }
  }
  return target;
}

export const isObject = (value) => {
  return typeof value === "object" && value !== null;
};

var a = { name: 1 };
var b = { age: 3, msg, test, haha };

mergeReactiveObject(a, b);
