<script setup lang="ts"></script>

<template>
  <RouterLink to="/"><button>home</button></RouterLink>
  <RouterLink to="/test"><button>test</button></RouterLink>
  <div>
    <RouterView />
  </div>
</template>
