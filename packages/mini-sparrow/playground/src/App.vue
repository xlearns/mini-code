<script setup lang="ts">
import { onMounted } from "vue";
import { render } from "../../packages";
onMounted(() => {
  render();
});
</script>
<template>
  <canvas class="canvas"></canvas>
</template>
<style scoped>
.canvas {
  height: 100%;
}
</style>
