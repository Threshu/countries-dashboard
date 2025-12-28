<template>
	<v-card elevation="2">
		<v-card-title class="pa-4">
			<div class="d-flex align-center flex-wrap ga-3">
				<span class="text-h4 font-weight-bold">
					<v-icon
						v-if="icon"
						:icon="icon"
						:color="iconColor"
						size="large"
						class="mr-2"
					/>
					{{ title }}
				</span>
				<span v-if="subtitle" class="text-body-1 text-medium-emphasis">
					• {{ subtitle }}
				</span>
			</div>
		</v-card-title>

		<v-divider />

		<v-card-text class="pa-4">
			<div v-if="loading" class="text-center py-8">
				<v-progress-circular indeterminate color="primary" size="64" />
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
		icon?: string;
		iconColor?: string;
	}

	defineProps<Props>();
</script>
