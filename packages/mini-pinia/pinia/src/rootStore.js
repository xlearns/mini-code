export const SymbolPinia = Symbol();

export let activePinia;

export const setActivePinia = (pinia) => (activePinia = pinia);
