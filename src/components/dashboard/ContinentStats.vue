<template>
	<v-row>
		<v-col cols="12">
			<BaseCard
				title="Countries by Continent"
				subtitle="Distribution of countries across continents"
				icon="mdi-earth"
				icon-color="success"
			>
				<v-row>
					<v-col
						v-for="continent in continentStats"
						:key="continent.code"
						cols="12"
						sm="6"
						md="auto"
						class="flex-grow-1"
					>
						<StatCard
							:title="continent.name"
							:value="continent.count"
							icon="mdi-map-marker"
							:color="continent.color"
							:elevation="3"
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

	type ContinentCode = "AF" | "AN" | "AS" | "EU" | "NA" | "OC" | "SA";

	interface ContinentStat {
		name: string;
		code: ContinentCode;
		count: number;
		color: string;
	}

	const continentColors: Record<ContinentCode, string> = {
		AF: "orange-darken-1",
		AN: "blue-grey-lighten-1",
		AS: "red-darken-1",
		EU: "blue-darken-1",
		NA: "light-green-darken-1",
		OC: "deep-purple-darken-1",
		SA: "deep-orange-darken-1",
	};

	const isContinentCode = (code: string): code is ContinentCode => {
		return ["AF", "AN", "AS", "EU", "NA", "OC", "SA"].includes(code);
	};

	const continentStats = computed(() => {
		const stats = new Map<ContinentCode, ContinentStat>();

		props.countries.forEach((country) => {
			const continent = country.continent;
			if (!continent?.code || !isContinentCode(continent.code)) return;

			if (!stats.has(continent.code)) {
				stats.set(continent.code, {
					name: continent.name,
					code: continent.code,
					count: 0,
					color: continentColors[continent.code],
				});
			}

			const stat = stats.get(continent.code);
			if (stat) {
				stat.count++;
			}
		});

		return Array.from(stats.values()).sort((a, b) => b.count - a.count);
	});
</script>
