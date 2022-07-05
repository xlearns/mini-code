<script setup lang="ts">
import { useStore } from "../store/vuex";

let store: any = useStore();
</script>

<template>
  <h1>{{ store.state.count }}</h1>
</template>
