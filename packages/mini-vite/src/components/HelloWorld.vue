<template>
	<h1>{{ msg }}</h1>
	<button @click="count++">count is: {{ count }}</button>
	<p>
		Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
	</p>
	<img alt="Vue logo" src="./../assets/xue.jpg" />
</template>

<script>
export default {
	name: "HelloWorld",
	props: {
		msg: String,
	},
	data() {
		return {
			count: 0,
		};
	},
};
</script>
