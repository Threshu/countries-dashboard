<template>
	<v-container fluid class="pa-4">
		<LoadingState v-if="loading" message="Loading dashboard..." />

		<ErrorState v-else-if="error" :message="error.message" :retry="refetch" />

		<div v-else>
			<DashboardStats :countries="countries" />
			<ContinentStats :countries="countries" />
			<FeaturedCountries :countries="countries" />
		</div>
	</v-container>
</template>

<script setup lang="ts">
	import { useCountries } from "@/composables/useCountries";
	import LoadingState from "@/components/common/LoadingState.vue";
	import ErrorState from "@/components/common/ErrorState.vue";
	import DashboardStats from "@/components/dashboard/DashboardStats.vue";
	import ContinentStats from "@/components/dashboard/ContinentStats.vue";
	import FeaturedCountries from "@/components/dashboard/FeaturedCountries.vue";

	const { countries, loading, error, refetch } = useCountries();
</script>
