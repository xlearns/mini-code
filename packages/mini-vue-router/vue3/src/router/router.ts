import { type App, inject, ref } from "vue";
import RouterLink from "./template/RouterLink.vue";
import RouterView from "./template/RouterView.vue";

const ROUTER_KEY = "__router__";

function createRouter(options: any) {
  return new Router(options);
}
function createWebHashHistory() {
  //获取初始化的hash
  const url = window.location.hash.slice(1) || "/";

  function bindEvent(fn: () => void) {
    window.addEventListener("hashchange", fn);
  }
  return {
    url,
    bindEvent,
  };
}
function useRouter() {
  return inject(ROUTER_KEY);
}

class Router {
  history: {
    url: string;
    bindEvent: (F: () => void) => void;
  };
  routes: {};
  current: { value: any };
  constructor(options: any) {
    this.history = options.history;
    this.routes = options.routes;
    this.current = ref(this.history.url);
    this.history.bindEvent(() => {
      //匹配hash#后面的路由
      this.current.value = window.location.hash.slice(1);
    });
  }
  install(app: App) {
    app.provide(ROUTER_KEY, this);
    app.component("RouterView", RouterView);
    app.component("RouterLink", RouterLink);
  }
}
export { createRouter, createWebHashHistory, useRouter };
