<template>
	<img alt="Vue logo" src="./assets/logo.png" />
	<h1>hello world</h1>
	<HelloWorld msg="Hello Vue 3.0 + Vite" />
	<test></test>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import test from "./components/test.vue";
export default {
	name: "App",
	components: {
		HelloWorld,
		test,
	},
};
</script>
<style scoped>
h1 {
	color: red;
}
</style>
