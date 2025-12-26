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
	</v-app-bar>
</template>

<script setup lang="ts"></script>
