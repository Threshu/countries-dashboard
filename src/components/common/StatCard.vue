<template>
	<v-card class="fill-height stat-card" :elevation="elevation">
		<v-card-text>
			<div class="d-flex align-center justify-space-between">
				<div>
					<p class="text-body-1 mb-1 text-grey">
						{{ title }}
					</p>
					<p class="text-h3 font-weight-bold">
						{{ value }}
					</p>
				</div>
				<v-avatar :color="color" size="56">
					<v-icon :icon="icon" size="32" color="white" />
				</v-avatar>
			</div>
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
	interface Props {
		title: string;
		value: string | number;
		icon: string;
		color?: string;
		elevation?: number;
	}

	withDefaults(defineProps<Props>(), {
		color: "primary",
		elevation: 5,
	});
</script>

<style lang="scss" scoped>
	.stat-card {
		transition: transform 0.2s ease-in-out;

		&:hover {
			transform: translateY(-4px);
		}
	}
</style>
