<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "../router";
const router: any = useRouter();
const comp = computed(() => {
  const route = router.routes.find((r: any) => r.path === router.current.value);
  return route ? route.component : null;
});
</script>
<template>
  <component :is="comp" />
</template>
