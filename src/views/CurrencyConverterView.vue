<template>
	<v-container fluid class="pa-4">
		<BaseCard
			title="Currency Converter"
			subtitle="Convert between different currencies"
			icon="mdi-cash-multiple"
			icon-color="success"
		>
			<LoadingState v-if="loading" message="Loading currencies..." />

			<ErrorState v-else-if="error" :message="error.message" />

			<div v-else>
				<CurrencyConverterForm
					:currencies="availableCurrencies"
					@convert="handleConvert"
				/>

				<v-divider class="my-6" />

				<div v-if="conversionResult" class="text-center">
					<v-card variant="tonal" color="primary" class="pa-6">
						<div class="text-h6 text-medium-emphasis mb-2">
							Converted Amount
						</div>
						<div class="text-h3 font-weight-bold mb-4">
							{{ conversionResult.convertedAmountFormatted }}
						</div>
						<div class="text-body-1 text-medium-emphasis">
							{{ conversionResult.originalAmountFormatted }} =
							{{ conversionResult.convertedAmountFormatted }}
						</div>
						<div class="text-caption mt-2">
							Exchange Rate: 1 {{ conversionResult.fromCurrency }} =
							{{ conversionResult.rate.toFixed(4) }}
							{{ conversionResult.toCurrency }}
						</div>
					</v-card>

					<v-alert type="info" variant="tonal" class="mt-4">
						<v-icon start>mdi-information</v-icon>
						Note: Exchange rates are mock values for demonstration purposes
						only.
					</v-alert>
				</div>

				<EmptyState
					v-else
					icon="mdi-currency-usd-off"
					message="Enter amount and select currencies to see the conversion result"
				/>
			</div>
		</BaseCard>
	</v-container>
</template>

<script setup lang="ts">
	import { computed, ref } from "vue";
	import { useCountries } from "@/composables/useCountries";
	import { formatCurrency } from "@/utils/formatters";
	import BaseCard from "@/components/common/BaseCard.vue";
	import LoadingState from "@/components/common/LoadingState.vue";
	import ErrorState from "@/components/common/ErrorState.vue";
	import EmptyState from "@/components/common/EmptyState.vue";
	import CurrencyConverterForm from "@/components/features/CurrencyConverterForm.vue";

	interface ConvertData {
		amount: number;
		fromCurrency: string;
		toCurrency: string;
	}

	interface ConversionResult {
		originalAmount: number;
		originalAmountFormatted: string;
		convertedAmount: number;
		convertedAmountFormatted: string;
		fromCurrency: string;
		toCurrency: string;
		rate: number;
	}

	const { countries, loading, error } = useCountries();

	const conversionResult = ref<ConversionResult | null>(null);

	const exchangeRates: Record<string, number> = {
		USD: 1.0,
		EUR: 0.85,
		GBP: 0.73,
		JPY: 110.0,
		PLN: 4.0,
		CHF: 0.92,
		CAD: 1.25,
		AUD: 1.35,
		CNY: 6.45,
		INR: 74.5,
		BRL: 5.25,
		RUB: 75.0,
		KRW: 1180.0,
		MXN: 20.0,
		ZAR: 15.0,
	};

	const availableCurrencies = computed(() => {
		const currenciesSet = new Set<string>();

		countries.value.forEach((country) => {
			if (country.currency) {
				const currencies = country.currency.split(",");
				currencies.forEach((currency) => {
					const trimmed = currency.trim();
					if (trimmed && exchangeRates[trimmed]) {
						currenciesSet.add(trimmed);
					}
				});
			}
		});

		return Array.from(currenciesSet).sort();
	});

	function handleConvert(data: ConvertData) {
		const fromRate = exchangeRates[data.fromCurrency] || 1;
		const toRate = exchangeRates[data.toCurrency] || 1;

		const amountInUSD = data.amount / fromRate;
		const convertedAmount = amountInUSD * toRate;
		const rate = toRate / fromRate;

		conversionResult.value = {
			originalAmount: data.amount,
			originalAmountFormatted: formatCurrency(data.amount, data.fromCurrency),
			convertedAmount,
			convertedAmountFormatted: formatCurrency(
				convertedAmount,
				data.toCurrency
			),
			fromCurrency: data.fromCurrency,
			toCurrency: data.toCurrency,
			rate,
		};
	}
</script>
