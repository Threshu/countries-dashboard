<template>
	<v-container fluid class="pa-4">
		<LoadingState v-if="loading" message="Loading country details..." />

		<ErrorState v-else-if="error" :message="error.message" :retry="refetch" />

		<EmptyState
			v-else-if="!country"
			message="Country not found"
			icon="mdi-map-marker-question"
		/>

		<div v-else>
			<v-row>
				<v-col cols="12" md="4">
					<v-card elevation="3">
						<v-img
							:src="`https://flagcdn.com/w640/${country.code.toLowerCase()}.png`"
							aspect-ratio="1.6"
							cover
							class="rounded"
						/>
					</v-card>
				</v-col>

				<v-col cols="12" md="8" class="d-flex">
					<BaseCard
						title="General Information"
						subtitle="Basic country details"
						class="flex-fill"
					>
						<v-row>
							<v-col cols="12" md="6">
								<v-list lines="two" density="compact">
									<v-list-item>
										<template v-slot:prepend>
											<v-icon icon="mdi-flag" color="primary" size="large" />
										</template>
										<v-list-item-title class="text-subtitle-2"
											>Country Name</v-list-item-title
										>
										<v-list-item-subtitle class="text-body-1">
											{{ country.emoji }} {{ country.name }}
										</v-list-item-subtitle>
									</v-list-item>

									<v-list-item>
										<template v-slot:prepend>
											<v-icon
												icon="mdi-translate"
												color="primary"
												size="large"
											/>
										</template>
										<v-list-item-title class="text-subtitle-2"
											>Native Name</v-list-item-title
										>
										<v-list-item-subtitle class="text-body-1">
											{{ country.native }}
										</v-list-item-subtitle>
									</v-list-item>

									<v-list-item>
										<template v-slot:prepend>
											<v-icon
												icon="mdi-identifier"
												color="primary"
												size="large"
											/>
										</template>
										<v-list-item-title class="text-subtitle-2"
											>Country Code</v-list-item-title
										>
										<v-list-item-subtitle class="text-body-1">{{
											country.code
										}}</v-list-item-subtitle>
									</v-list-item>

									<v-list-item>
										<template v-slot:prepend>
											<v-icon icon="mdi-earth" color="primary" size="large" />
										</template>
										<v-list-item-title class="text-subtitle-2"
											>Continent</v-list-item-title
										>
										<v-list-item-subtitle class="text-body-1">
											{{ country.continent.name }}
										</v-list-item-subtitle>
									</v-list-item>
								</v-list>
							</v-col>

							<v-col cols="12" md="6">
								<v-list lines="two" density="compact">
									<v-list-item>
										<template v-slot:prepend>
											<v-icon icon="mdi-city" color="primary" size="large" />
										</template>
										<v-list-item-title class="text-subtitle-2"
											>Capital</v-list-item-title
										>
										<v-list-item-subtitle class="text-body-1">
											{{ country.capital || "N/A" }}
										</v-list-item-subtitle>
									</v-list-item>

									<v-list-item v-if="country.awsRegion">
										<template v-slot:prepend>
											<v-icon icon="mdi-cloud" color="primary" size="large" />
										</template>
										<v-list-item-title class="text-subtitle-2"
											>AWS Region</v-list-item-title
										>
										<v-list-item-subtitle class="text-body-1">{{
											country.awsRegion
										}}</v-list-item-subtitle>
									</v-list-item>

									<v-list-item>
										<template v-slot:prepend>
											<v-icon icon="mdi-phone" color="primary" size="large" />
										</template>
										<v-list-item-title class="text-subtitle-2"
											>Phone Codes</v-list-item-title
										>
										<v-list-item-subtitle class="text-body-1">
											<v-chip-group
												v-if="country.phones?.length > 0"
												class="ga-2"
											>
												<v-chip
													v-for="phone in country.phones"
													:key="phone"
													color="primary"
													variant="outlined"
													size="small"
												>
													+{{ phone }}
												</v-chip>
											</v-chip-group>
											<span v-else>N/A</span>
										</v-list-item-subtitle>
									</v-list-item>

									<v-list-item>
										<template v-slot:prepend>
											<v-icon
												icon="mdi-cash-multiple"
												color="primary"
												size="large"
											/>
										</template>
										<v-list-item-title class="text-subtitle-2"
											>Currencies</v-list-item-title
										>
										<v-list-item-subtitle class="text-body-1">
											<v-chip-group
												v-if="country.currencies?.length > 0"
												class="ga-2"
											>
												<v-chip
													v-for="currency in country.currencies"
													:key="currency"
													color="success"
													variant="outlined"
													size="small"
												>
													{{ currency }}
												</v-chip>
											</v-chip-group>
											<span v-else>N/A</span>
										</v-list-item-subtitle>
									</v-list-item>
								</v-list>
							</v-col>
						</v-row>
					</BaseCard>
				</v-col>
			</v-row>

			<v-row class="flex-fill">
				<v-col cols="12" class="d-flex">
					<BaseCard
						title="Languages"
						:subtitle="`${country.languages.length} official ${
							country.languages.length === 1 ? 'language' : 'languages'
						}`"
						class="flex-fill"
					>
						<v-chip-group class="ga-3">
							<v-chip
								v-for="language in country.languages"
								:key="language.code"
								color="primary"
								variant="flat"
								size="large"
							>
								<v-icon start icon="mdi-translate" />
								<div class="d-flex flex-column align-start">
									<span class="font-weight-bold"
										>{{ language.name }} ({{ language.code }})</span
									>
									<span class="text-caption">{{ language.native }}</span>
								</div>
								<v-chip
									v-if="language.rtl"
									color="info"
									variant="flat"
									size="x-small"
									class="ml-2"
								>
									RTL
								</v-chip>
							</v-chip>
						</v-chip-group>
					</BaseCard>
				</v-col>
			</v-row>

			<v-row v-if="country.states?.length > 0">
				<v-col cols="12">
					<BaseCard
						title="Administrative Divisions"
						:subtitle="`${country.states.length} states/provinces`"
					>
						<v-chip-group class="ga-2">
							<v-chip
								v-for="state in country.states"
								:key="state.code"
								variant="outlined"
								size="default"
							>
								{{ state.name }}
							</v-chip>
						</v-chip-group>
					</BaseCard>
				</v-col>
			</v-row>
		</div>
	</v-container>
</template>

<script setup lang="ts">
	import { computed } from "vue";
	import { useRoute } from "vue-router";
	import { useCountryDetail } from "@/composables/useCountryDetail";
	import BaseCard from "@/components/common/BaseCard.vue";
	import LoadingState from "@/components/common/LoadingState.vue";
	import ErrorState from "@/components/common/ErrorState.vue";
	import EmptyState from "@/components/common/EmptyState.vue";

	const route = useRoute();

	const countryCode = computed(() => route.params.code as string);

	const { country, loading, error, refetch } = useCountryDetail(countryCode);
</script>
