<template>
	<v-row>
		<v-col cols="12">
			<BaseCard
				title="Your Favorite Countries"
				subtitle="Countries you've marked as favorites"
				icon="mdi-heart"
				icon-color="red"
			>
				<EmptyState
					v-if="countries.length === 0"
					icon="mdi-heart-outline"
					message="No favorite countries yet. Click the heart icon on any country card to add it to your favorites!"
				/>

				<div v-else class="dashboard-grid">
					<div v-for="country in countries" :key="country.code">
						<CountryCard :country="country" />
					</div>
				</div>
			</BaseCard>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
	import type { Country } from "@/types";
	import BaseCard from "@/components/common/BaseCard.vue";
	import CountryCard from "@/components/features/CountryCard.vue";
	import EmptyState from "@/components/common/EmptyState.vue";

	interface Props {
		countries: Country[];
	}

	defineProps<Props>();
</script>

<style scoped>
	@import "@/styles/dashboard-grid.css";
</style>
