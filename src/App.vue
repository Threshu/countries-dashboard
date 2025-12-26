<template>
	<v-app>
		<v-main>
			<v-container>
				<v-row>
					<v-col cols="12">
						<BaseCard title="Countries" subtitle="data from API">
							<LoadingState v-if="loading" message="Loading countries..." />
							<ErrorState v-else-if="error" :message="error.message" />
							<div v-else>
								<h3 class="mb-4">{{ countries.length }} countries loaded!</h3>
								<div class="d-flex flex-wrap ga-2">
									<v-chip
										v-for="country in countries.slice(0, 25)"
										:key="country.code"
									>
										{{ country.emoji }} {{ country.name }}
									</v-chip>
								</div>
							</div>
						</BaseCard>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
	import { useCountries } from "@/composables/useCountries";
	import BaseCard from "@/components/common/BaseCard.vue";
	import LoadingState from "@/components/common/LoadingState.vue";
	import ErrorState from "@/components/common/ErrorState.vue";

	const { countries, loading, error } = useCountries();
</script>
