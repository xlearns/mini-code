declare global {
  type Fn = (...args) => any;
  type Ob = { [key: string]: any };
  type F<T> = (...args) => T;
  interface Op {
    state?: Fn;
    mutations?: Ob;
    actions?: Ob;
    getters?: Ob;
  }
}
export {};
