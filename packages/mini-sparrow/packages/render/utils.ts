// 创建 SVG 元素
export function createSVGElement(type) {
  return document.createElementNS("http://www.w3.org/2000/svg", type);
}
// 将 child 节点挂载到 parent 节点上面
export function mount(parent, child) {
  if (parent) {
    parent.appendChild(child);
  }
}

export function applyAttributes(element, attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    const kebabCaseKey = key.replace(
      /[A-Z]/g,
      (d) => `-${d.toLocaleLowerCase()}`
    );
    element.setAttribute(kebabCaseKey, value);
  }
}
