<template>
	<v-app>
		<TheNavbar />

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
	import TheNavbar from "@/components/layout/TheNavbar.vue";
</script>
