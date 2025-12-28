<template>
	<v-row>
		<v-col cols="12">
			<BaseCard
				title="Featured Countries"
				subtitle="A sample of countries from different continents"
				icon="mdi-star"
				icon-color="amber"
			>
				<div class="dashboard-grid">
					<div v-for="country in sampleCountries" :key="country.code">
						<CountryCard :country="country" />
					</div>
				</div>
			</BaseCard>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
	import { computed } from "vue";
	import type { Country } from "@/types";
	import BaseCard from "@/components/common/BaseCard.vue";
	import CountryCard from "@/components/features/CountryCard.vue";

	interface Props {
		countries: Country[];
	}

	const props = defineProps<Props>();

	const MAX_FEATURED_COUNTRIES = 7;

	const sampleCountries = computed(() => {
		const shuffled = [...props.countries].sort(() => Math.random() - 0.5);
		const samples: Country[] = [];
		const seenContinents = new Set<string>();

		for (const country of shuffled) {
			const continentCode = country.continent?.code;
			if (!continentCode) continue;

			if (!seenContinents.has(continentCode)) {
				samples.push(country);
				seenContinents.add(continentCode);
				if (samples.length >= MAX_FEATURED_COUNTRIES) break;
			}
		}

		return samples;
	});
</script>

<style scoped>
	@import "@/styles/dashboard-grid.css";
</style>
