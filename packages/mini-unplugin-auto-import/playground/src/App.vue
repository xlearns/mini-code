<script setup lang="ts">
let msg = $ref("hello world");
</script>

<template>
	<HelloWorld />
	<A />
	<br />
	{{ msg }}
</template>
