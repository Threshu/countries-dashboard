<template>
	<v-app>
		<v-main>
			<v-container>
				<v-row>
					<v-col cols="12">
						<v-card>
							<v-card-title>Countries test</v-card-title>
							<v-card-text>
								<div v-if="loading">Loading countries...</div>
								<div v-else-if="error">Error: {{ error.message }}</div>
								<div v-else>
									<h3>✅ {{ result?.countries.length }} countries loaded!</h3>
									<div
										v-for="country in result?.countries.slice(0, 25)"
										:key="country.code"
									>
										{{ country.emoji }} {{ country.name }}
									</div>
								</div>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>
<script setup lang="ts">
	import { useQuery } from "@vue/apollo-composable";
	import { GET_COUNTRIES } from "./apollo/queries/countries";
	const { result, loading, error } = useQuery(GET_COUNTRIES);
</script>
