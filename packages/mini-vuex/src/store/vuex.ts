import { computed, inject, reactive } from "vue";
import { type App } from "vue";

const STORE_KEY = "__vuex__store__";
function useStore() {
  return inject(STORE_KEY);
}

function createStore(options: Op) {
  return new Store(options);
}

class Store {
  private _state: { data: any };
  private _mutations: Ob;
  private _actions: Ob;
  private _getters: Ob;
  private getters: Ob;

  constructor(options: Op) {
    this._state = reactive({
      data: options.state ? options.state() : {},
    });
    this._mutations = options.mutations || {};
    this._actions = options.actions || {};
    this._getters = options.getters || {};
    this.getters = {};
    Object.keys(this._getters).forEach((name: string) => {
      const fn = this._getters[name];
      this.getters[name] = computed(() => {
        return fn(this.state);
      });
    });
  }
  get state() {
    return this._state.data;
  }

  commit = (name: string, payload?: any) => {
    // 执行mutations
    const fn = this._mutations[name];
    fn && fn(this.state, payload);
  };
  dispatch = (name: string, payload: any) => {
    // 执行actions
    const fn = this._actions[name];
    fn && fn(this, payload);
  };

  install(app: App) {
    // app.use的时候拿到inject的值
    app.provide(STORE_KEY, this);
  }
}

export { createStore, useStore };
