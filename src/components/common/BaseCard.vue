<template>
	<v-container fluid class="pa-4">
		<v-card class="mx-auto" elevation="2">
			<v-card-title class="text-h4 font-weight-bold pa-6 pb-2">
				{{ title }}
			</v-card-title>

			<v-card-subtitle v-if="subtitle" class="px-6 pb-4 text-subtitle-1">
				{{ subtitle }}
			</v-card-subtitle>

			<v-divider />

			<v-card-text class="pa-6">
				<div v-if="loading" class="text-center py-12">
					<v-progress-circular indeterminate color="primary" size="64" />
				</div>

				<slot v-else />
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script setup lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
		loading?: boolean;
	}

	defineProps<Props>();
</script>
