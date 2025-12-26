<template>
	<div
		class="d-flex flex-column align-center justify-center"
		style="min-height: 150px"
	>
		<v-progress-circular indeterminate color="primary" size="64" />
		<p class="text-h6 mt-4">{{ message }}</p>
	</div>
</template>

<script setup lang="ts">
	interface Props {
		message?: string;
	}

	withDefaults(defineProps<Props>(), {
		message: "Loading...",
	});
</script>
