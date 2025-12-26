<template>
	<v-card class="fill-height">
		<v-card-title>
			{{ title }}
		</v-card-title>

		<v-card-subtitle v-if="subtitle">
			{{ subtitle }}
		</v-card-subtitle>

		<v-card-text>
			<div v-if="loading" class="text-center py-4">
				<v-progress-circular indeterminate color="primary" size="48" />
			</div>

			<slot v-else />
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
		loading?: boolean;
	}

	defineProps<Props>();
</script>
