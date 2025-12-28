<template>
	<v-container fluid class="pa-4">
		<LoadingState v-if="loading" message="Loading dashboard..." />

		<ErrorState v-else-if="error" :message="error.message" :retry="refetch" />

		<div v-else>
			<DashboardStats :countries="countries" />
			<FavoriteCountries :countries="favoriteCountries" />
			<ContinentStats :countries="countries" />
			<FeaturedCountries :countries="countries" />
		</div>
	</v-container>
</template>

<script setup lang="ts">
	import { computed } from "vue";
	import { useCountries } from "@/composables/useCountries";
	import { useUserPreferences } from "@/stores/userPreferences";
	import LoadingState from "@/components/common/LoadingState.vue";
	import ErrorState from "@/components/common/ErrorState.vue";
	import DashboardStats from "@/components/dashboard/DashboardStats.vue";
	import ContinentStats from "@/components/dashboard/ContinentStats.vue";
	import FeaturedCountries from "@/components/dashboard/FeaturedCountries.vue";
	import FavoriteCountries from "@/components/dashboard/FavoriteCountries.vue";

	const { countries, loading, error, refetch } = useCountries();
	const preferences = useUserPreferences();

	const favoriteCountries = computed(() =>
		countries.value.filter((country) => preferences.isFavorite(country.code))
	);
</script>
