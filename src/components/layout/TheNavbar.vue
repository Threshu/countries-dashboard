<template>
	<v-app-bar color="primary" elevation="4" prominent>
		<v-app-bar-title class="text-h5 font-weight-bold">
			<router-link
				:to="{ name: 'dashboard' }"
				class="text-decoration-none text-white d-flex align-center"
				style="cursor: pointer"
			>
				<v-icon icon="mdi-earth" size="large" class="mr-2" />
				Countries Dashboard
			</router-link>
		</v-app-bar-title>

		<v-spacer />

		<v-btn
			:to="{ name: 'dashboard' }"
			prepend-icon="mdi-view-dashboard"
			color="white"
			variant="text"
		>
			Dashboard
		</v-btn>

		<v-btn
			:to="{ name: 'countries' }"
			prepend-icon="mdi-earth"
			color="white"
			variant="text"
		>
			Countries
		</v-btn>

		<v-btn
			@click="preferences.toggleTheme()"
			:icon="themeIcon"
			:aria-label="themeLabel"
			color="white"
			variant="text"
		>
			<v-icon :icon="themeIcon" />
			<v-tooltip activator="parent" location="bottom">
				{{ themeLabel }}
			</v-tooltip>
		</v-btn>
	</v-app-bar>
</template>

<script setup lang="ts">
	import { computed } from "vue";
	import { useUserPreferences } from "@/stores/userPreferences";

	const preferences = useUserPreferences();

	const themeIcon = computed(() =>
		preferences.theme === "dark" ? "mdi-weather-night" : "mdi-weather-sunny"
	);

	const themeLabel = computed(() =>
		preferences.theme === "dark"
			? "Switch to light mode"
			: "Switch to dark mode"
	);
</script>
