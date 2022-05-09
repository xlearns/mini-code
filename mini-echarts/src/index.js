import Redner from './ZRender.js'
export { default as Circle } from './Element/Circle.js'

export function init (dom) {
  return new Redner(dom)
}