<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "./store/vuex";
import Hello from "./components/HelloWorld.vue";
let store: any = useStore();
let count = computed(() => store.state.count);
let double = computed(() => store.getters.double);
function asyncAdd() {
  store.dispatch("asyncAdd");
}
function add() {
  store.commit("add");
}
</script>

<template>
  <div>{{ count }} *2 = {{ double }}</div>
  <button @click="add">add</button>
  <button @click="asyncAdd">async add</button>
  <Hello />
</template>
