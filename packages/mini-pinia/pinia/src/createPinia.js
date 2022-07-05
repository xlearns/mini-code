import { effectScope, markRaw, ref } from "vue";
import { SymbolPinia, setActivePinia } from "./rootStore";

// 用于 main.js 内  app.use( createPinia() )
export function createPinia() {
  // true 范围不会被外部effectScope收集和停止
  const scope = effectScope(true);
  // run 方法的返回值就是这个fn的返回结果
  const state = scope.run(() => ref({}));

  const _p = [];

  // markRaw 标记一个对象，使其永远不会转换为代理。返回对象本身。
  const pinia = markRaw({
    install(app) {
      // pinia 希望能被共享出去
      setActivePinia(pinia);
      pinia._a = app;
      // 将pinia实例暴露到app上，所有的组件都可以通过inject注入进来
      app.provide(SymbolPinia, pinia);
      app.config.globalProperties.$pinia = pinia;
    },
    use(plugin) {
      _p.push(plugin);
      return this;
    },
    _p, // 插件在状态改变便利调用 例如：本地存储插件
    _a: null,
    state, // 所有的状态
    _e: scope, // 用来管理这个应用的effectScope
    _s: new Map(), // 记录所有的store
  });

  return pinia;
}
