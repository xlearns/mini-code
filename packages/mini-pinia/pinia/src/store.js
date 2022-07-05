//todo:defineStore('data', { msg: 'state数据' })
/*
use: 
const useCounterStore  = defineStore(xx); 
const store = useCounterStore()
console.log(store)
*/
import { activePinia, SymbolPinia, setActivePinia, Pinia } from "./rootStore";

export function defineStore(idOrOptions, setup) {
  let id, options;
  id = idOrOptions;
  options = setup;

  function useStore() {
    let pinia = inject(SymbolPinia);
    if (pinia) {
      setActivePinia(pinia);
    }
    pinia = activePinia;

    // 没有该 store 就创建
    if (!pinia._s.has(id)) {
      createOptionsStore(id, options, pinia);
    }

    const store = pinia._s.get(id);

    return store;
  }
  return useStore;
}

function createOptionsStore(id, options, pinia) {
  let { state, getters, actions } = options
  const store 
  return store
}
