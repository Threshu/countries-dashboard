<template>
	<div
		class="d-flex flex-column align-center justify-center"
		role="status"
		:aria-label="message"
	>
		<v-icon :icon="icon" size="64" color="grey" aria-hidden="true" />
		<p class="text-h6 mt-4 text-grey">{{ message }}</p>
	</div>
</template>

<script setup lang="ts">
	interface Props {
		message: string;
		icon?: string;
	}

	withDefaults(defineProps<Props>(), {
		icon: "mdi-inbox",
	});
</script>
