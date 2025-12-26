<template>
	<v-card
		class="country-card fill-height d-flex flex-column rounded-lg overflow-hidden"
		ripple
		role="button"
		tabindex="0"
		elevation="3"
		:aria-label="`View details for ${country.name}`"
		@click="handleClick"
		@keydown.enter="handleClick"
		@keydown.space.prevent="handleClick"
	>
		<div class="flag-container">
			<v-img
				:src="flagUrl"
				:alt="`${country.name} flag`"
				class="country-flag"
				aspect-ratio="2"
				cover
			>
				<template #placeholder>
					<div
						class="d-flex align-center justify-center fill-height bg-grey-lighten-3"
					>
						<v-progress-circular indeterminate color="primary" size="40" />
					</div>
				</template>
				<template #error>
					<div
						class="d-flex align-center justify-center fill-height country-emoji-fallback text-h2"
					>
						{{ country.emoji }}
					</div>
				</template>
			</v-img>
		</div>

		<v-tooltip v-if="showTooltip" location="top" :text="country.name">
			<template v-slot:activator="{ props }">
				<v-card-title
					ref="titleRef"
					v-bind="props"
					class="text-center pt-3 pb-2 px-2 text-h6 font-weight-bold"
				>
					{{ country.name }}
				</v-card-title>
			</template>
		</v-tooltip>
		<v-card-title
			v-else
			ref="titleRef"
			class="text-center pt-3 pb-2 px-2 text-h6 font-weight-bold"
		>
			{{ country.name }}
		</v-card-title>

		<v-card-text class="text-center py-2 px-2">
			<div class="d-flex align-center justify-center flex-wrap ga-2">
				<v-chip size="default" variant="tonal" color="secondary">
					<v-icon start size="default">mdi-map-marker</v-icon>
					{{ country.capital || "No capital" }}
				</v-chip>
				<v-chip
					v-if="country.currency"
					color="primary"
					variant="tonal"
					size="default"
				>
					<v-icon start size="default">mdi-currency-usd</v-icon>
					{{ country.currency }}
				</v-chip>
				<v-chip v-else color="grey" size="default" variant="outlined">
					No currency
				</v-chip>
			</div>
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
	import { computed, ref, onMounted, nextTick } from "vue";
	import type { ComponentPublicInstance } from "vue";
	import type { Country } from "@/types/graphql";

	interface Props {
		country: Country;
	}

	const props = defineProps<Props>();

	const emit = defineEmits<{
		select: [code: string];
	}>();

	const titleRef = ref<ComponentPublicInstance | null>(null);
	const showTooltip = ref(false);

	onMounted(async () => {
		await nextTick();
		if (titleRef.value) {
			const element = titleRef.value.$el || titleRef.value;
			showTooltip.value =
				element.scrollHeight > element.clientHeight ||
				element.scrollWidth > element.clientWidth;
		}
	});

	const flagUrl = computed(() => {
		if (!props.country?.code) {
			return "";
		}
		return `https://flagcdn.com/w160/${props.country.code.toLowerCase()}.png`;
	});

	function handleClick() {
		emit("select", props.country.code);
	}
</script>

<style scoped>
	.country-card {
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.country-card:hover {
		transform: translateY(-8px) scale(1.02);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
	}

	.country-card:active {
		transform: translateY(-4px) scale(1.01);
	}

	.flag-container {
		background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
	}

	.country-card .v-card-title {
		word-break: break-word;
		min-height: 48px;
	}
</style>
