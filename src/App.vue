<template>
	<v-app>
		<v-main>
			<BaseCard
				title="Countries"
				subtitle="Explore countries from around the world"
			>
				<LoadingState v-if="loading" message="Loading countries..." />
				<ErrorState v-else-if="error" :message="error.message" />
				<div v-else>
					<v-alert
						type="success"
						variant="tonal"
						class="mb-6"
						prominent
						icon="mdi-check-circle"
					>
						<strong>{{ countries.length }}</strong> countries loaded
						successfully!
					</v-alert>

					<v-virtual-scroll
						:items="countryRows"
						:height="650"
						:item-height="320"
						class="virtual-scroll-container rounded"
					>
						<template v-slot:default="{ item }">
							<v-row no-gutters class="px-1">
								<v-col
									v-for="country in item"
									:key="country.code"
									cols="12"
									sm="6"
									md="4"
									lg="2"
									class="pa-2"
								>
									<CountryCard
										:country="country"
										@select="handleCountrySelect"
									/>
								</v-col>
							</v-row>
						</template>
					</v-virtual-scroll>
				</div>
			</BaseCard>
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
	import { computed } from "vue";
	import { useCountries } from "@/composables/useCountries";
	import BaseCard from "@/components/common/BaseCard.vue";
	import LoadingState from "@/components/common/LoadingState.vue";
	import ErrorState from "@/components/common/ErrorState.vue";
	import CountryCard from "@/components/features/CountryCard.vue";

	const { countries, loading, error } = useCountries();

	const countryRows = computed(() => {
		const rows = [];
		const itemsPerRow = 6;

		for (let i = 0; i < countries.value.length; i += itemsPerRow) {
			rows.push(countries.value.slice(i, i + itemsPerRow));
		}

		return rows;
	});

	function handleCountrySelect(code: string) {
		console.log("Selected country: ", code);
	}
</script>
