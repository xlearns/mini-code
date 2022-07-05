<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <a :href="`#${to}`">
    <slot />
  </a>
</template>
