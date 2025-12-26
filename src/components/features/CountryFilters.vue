<template>
	<v-row>
		<v-col cols="12" md="6">
			<v-text-field
				:model-value="search"
				@update:model-value="handleSearchInput"
				label="Search countries"
				placeholder="Type country name..."
				prepend-inner-icon="mdi-magnify"
				variant="outlined"
				density="comfortable"
				clearable
				hide-details
			/>
		</v-col>

		<v-col cols="12" md="6">
			<v-select
				:model-value="continent"
				@update:model-value="emit('update:continent', $event)"
				:items="continentItems"
				label="Filter by continent"
				placeholder="All continents"
				prepend-inner-icon="mdi-earth"
				variant="outlined"
				density="comfortable"
				clearable
				hide-details
				:loading="loading"
				:error="!!error"
				:error-messages="error ? 'Failed to load continents' : undefined"
			/>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
	import { computed, onBeforeUnmount } from "vue";
	import { useQuery } from "@vue/apollo-composable";
	import { GET_CONTINENTS } from "@/apollo/queries/countries";
	import type { Continent } from "@/types";

	interface Props {
		search?: string;
		continent?: string;
	}

	defineProps<Props>();

	const emit = defineEmits<{
		"update:search": [value: string];
		"update:continent": [value: string];
	}>();

	let searchTimeout: ReturnType<typeof setTimeout> | null = null;

	function handleSearchInput(value: string) {
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}

		searchTimeout = setTimeout(() => {
			emit("update:search", value);
		}, 300);
	}

	onBeforeUnmount(() => {
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}
	});

	interface ContinentsQueryResult {
		continents: Continent[];
	}

	const { result, loading, error } =
		useQuery<ContinentsQueryResult>(GET_CONTINENTS);

	const continentItems = computed(() => {
		if (!result.value?.continents) return [];

		return result.value.continents.map((continent) => ({
			title: continent.name,
			value: continent.code,
		}));
	});
</script>
