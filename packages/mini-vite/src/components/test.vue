<script>
import { ref } from "vue";
export default {
	setup() {
		let count = ref(100);
		const add = function () {
			count.value++;
		};
		return {
			count,
			add,
		};
	},
};
</script>
<template>
	<div>
		<button @click="add">+</button>
		{{ count }}
	</div>
</template>
