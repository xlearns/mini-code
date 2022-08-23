<script setup lang="ts">
let msg = ref("hello world");

let test = ref("hello world123 ");
</script>

<template>
	<HelloWorld />
	<A />
	<br />
	{{ msg }}
	<br />
	{{ test }}
</template>
