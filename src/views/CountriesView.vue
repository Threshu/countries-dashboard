<template>
	<div class="d-flex flex-column h-100 pa-4 ga-4">
		<BaseCard
			title="Search Countries"
			subtitle="Find countries by name, code, capital, or continent"
		>
			<CountryFilters
				v-model:search="searchQuery"
				v-model:continent="selectedContinent"
			/>
		</BaseCard>

		<LoadingState
			v-if="loading && !countries.length"
			message="Loading countries..."
		/>

		<ErrorState v-else-if="error" :message="error.message" :retry="refetch" />

		<EmptyState
			v-else-if="!filteredCountries.length"
			message="No countries found matching your filters"
			icon="mdi-map-search"
		/>

		<div v-else class="countries-list-container d-flex flex-column ga-4">
			<div class="scroll-wrapper position-relative">
				<v-virtual-scroll
					:items="groupedCountries"
					:item-height="320"
					class="countries-scroll"
				>
					<template v-slot:default="{ item }">
						<v-row dense>
							<v-col
								v-for="country in item"
								:key="country.code"
								cols="12"
								sm="6"
								md="4"
								lg="2"
							>
								<CountryCard :country="country" />
							</v-col>
						</v-row>
					</template>
				</v-virtual-scroll>
			</div>

			<v-alert
				v-if="filteredCountries.length < countries.length"
				type="info"
				variant="tonal"
				class="mt-4"
			>
				Showing {{ filteredCountries.length }} of
				{{ countries.length }} countries
			</v-alert>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from "vue";
	import { useCountries } from "@/composables/useCountries";
	import BaseCard from "@/components/common/BaseCard.vue";
	import CountryFilters from "@/components/features/CountryFilters.vue";
	import CountryCard from "@/components/features/CountryCard.vue";
	import LoadingState from "@/components/common/LoadingState.vue";
	import ErrorState from "@/components/common/ErrorState.vue";
	import EmptyState from "@/components/common/EmptyState.vue";
	import type { Country } from "@/types";

	const { countries, loading, error, refetch } = useCountries();

	const searchQuery = ref("");
	const selectedContinent = ref("");

	const ITEMS_PER_ROW = 6;

	const filteredCountries = computed(() => {
		let result = countries.value;

		if (searchQuery.value) {
			const query = searchQuery.value.toLowerCase();
			result = result.filter(
				(country) =>
					country.name.toLowerCase().includes(query) ||
					country.code.toLowerCase().includes(query) ||
					country.capital?.toLowerCase().includes(query)
			);
		}

		if (selectedContinent.value) {
			result = result.filter(
				(country) => country.continent?.code === selectedContinent.value
			);
		}

		return result;
	});

	const groupedCountries = computed(() => {
		const groups: Country[][] = [];
		for (let i = 0; i < filteredCountries.value.length; i += ITEMS_PER_ROW) {
			groups.push(filteredCountries.value.slice(i, i + ITEMS_PER_ROW));
		}
		return groups;
	});
</script>

<style scoped>
	.countries-list-container {
		flex: 1;
		min-height: 0;
	}

	.scroll-wrapper {
		flex: 1;
		min-height: 0;
	}

	.countries-scroll {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-x: hidden;
	}
</style>
