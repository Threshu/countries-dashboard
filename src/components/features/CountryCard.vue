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
			<v-btn
				:icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
				:aria-label="favoriteLabel"
				variant="flat"
				size="small"
				class="favorite-btn"
				@click.stop="toggleFavorite"
			>
				<v-icon
					:icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
					:color="isFavorite ? 'red' : 'grey'"
				/>
				<v-tooltip activator="parent" location="top">
					{{ favoriteLabel }}
				</v-tooltip>
			</v-btn>
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
					class="text-center pt-2 pb-1 px-2 text-h6 font-weight-bold"
				>
					{{ country.name }}
				</v-card-title>
			</template>
		</v-tooltip>
		<v-card-title
			v-else
			ref="titleRef"
			class="text-center pt-2 pb-1 px-2 text-h6 font-weight-bold"
		>
			{{ country.name }}
		</v-card-title>

		<v-card-text class="text-center py-1 px-2">
			<div class="d-flex align-center justify-center flex-wrap ga-1">
				<v-chip size="default" variant="tonal" color="secondary">
					<v-icon start size="small">mdi-map-marker</v-icon>
					{{ country.capital || "No capital" }}
				</v-chip>

				<v-badge
					v-if="additionalCurrenciesCount > 0"
					:content="`+${additionalCurrenciesCount}`"
					color="primary"
				>
					<v-tooltip location="top">
						<template v-slot:activator="{ props: tooltipProps }">
							<v-chip
								v-bind="tooltipProps"
								color="primary"
								variant="tonal"
								size="default"
							>
								<v-icon start size="small">mdi-currency-usd</v-icon>
								{{ primaryCurrency }}
							</v-chip>
						</template>
						<span>{{ allCurrencies }}</span>
					</v-tooltip>
				</v-badge>

				<v-chip
					v-else-if="primaryCurrency"
					color="primary"
					variant="tonal"
					size="default"
				>
					<v-icon start size="small">mdi-currency-usd</v-icon>
					{{ primaryCurrency }}
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
	import { useRouter } from "vue-router";
	import { useUserPreferences } from "@/stores/userPreferences";
	import type { ComponentPublicInstance } from "vue";
	import type { Country } from "@/types";

	interface Props {
		country: Country;
	}

	const props = defineProps<Props>();

	const router = useRouter();
	const preferences = useUserPreferences();

	const titleRef = ref<ComponentPublicInstance | null>(null);
	const showTooltip = ref(false);

	const isFavorite = computed(() => preferences.isFavorite(props.country.code));

	const favoriteLabel = computed(() =>
		isFavorite.value ? "Remove from favorites" : "Add to favorites"
	);

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

	const primaryCurrency = computed(() => {
		if (!props.country?.currency) return null;
		const parts = props.country.currency.split(",");
		return parts[0]?.trim() || null;
	});

	const additionalCurrenciesCount = computed(() => {
		if (!props.country?.currency) return 0;
		const currencies = props.country.currency.split(",");
		return currencies.length > 1 ? currencies.length - 1 : 0;
	});

	const allCurrencies = computed(() => {
		return props.country?.currency || "";
	});

	function handleClick() {
		router.push({
			name: "country-detail",
			params: { code: props.country.code },
		});
	}

	function toggleFavorite() {
		preferences.toggleFavorite(props.country.code);
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
		position: relative;
	}

	.favorite-btn {
		position: absolute;
		top: 8px;
		right: 8px;
		z-index: 2;
		background: rgba(255, 255, 255, 0.95) !important;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	}

	.favorite-btn:hover {
		background: rgba(255, 255, 255, 1) !important;
		transform: scale(1.1);
	}

	.country-card .v-card-title {
		word-break: break-word;
		min-height: 36px;
	}
</style>
