<template>
	<v-row>
		<v-col cols="12">
			<BaseCard
				title="Overview"
				subtitle="Key statistics and metrics"
				icon="mdi-chart-box"
				icon-color="primary"
			>
				<v-row>
					<v-col
						v-for="stat in statsCards"
						:key="stat.title"
						cols="12"
						sm="6"
						md="3"
					>
						<StatCard
							:title="stat.title"
							:value="stat.value"
							:icon="stat.icon"
							:color="stat.color"
						/>
					</v-col>
				</v-row>
			</BaseCard>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
	import { computed } from "vue";
	import type { Country } from "@/types";
	import BaseCard from "@/components/common/BaseCard.vue";
	import StatCard from "@/components/common/StatCard.vue";

	interface Props {
		countries: Country[];
	}

	const props = defineProps<Props>();

	const stats = computed(() => {
		const continents = new Set<string>();
		const currencies = new Set<string>();
		const languages = new Set<string>();

		props.countries.forEach((country) => {
			if (country.continent?.code) {
				continents.add(country.continent.code);
			}

			if (country.currency) {
				currencies.add(country.currency);
			}
			country.currencies?.forEach((curr) => currencies.add(curr));

			country.languages?.forEach((lang) => {
				if (lang.code) {
					languages.add(lang.code);
				}
			});
		});

		return {
			totalCountries: props.countries.length,
			totalContinents: continents.size,
			uniqueCurrencies: currencies.size,
			totalLanguages: languages.size,
		};
	});

	const statsCards = computed(() => [
		{
			title: "Total Countries",
			value: stats.value.totalCountries,
			icon: "mdi-earth",
			color: "blue-darken-1",
		},
		{
			title: "Continents",
			value: stats.value.totalContinents,
			icon: "mdi-map",
			color: "light-green-darken-1",
		},
		{
			title: "Unique Currencies",
			value: stats.value.uniqueCurrencies,
			icon: "mdi-cash-multiple",
			color: "orange-darken-1",
		},
		{
			title: "Official Languages",
			value: stats.value.totalLanguages,
			icon: "mdi-translate",
			color: "deep-purple-darken-1",
		},
	]);
</script>
