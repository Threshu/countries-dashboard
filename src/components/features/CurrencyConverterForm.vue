<template>
	<v-form ref="formRef" @submit.prevent="handleSubmit">
		<v-row>
			<v-col cols="12">
				<v-text-field
					v-model.number="formData.amount"
					label="Amount"
					type="number"
					variant="outlined"
					:rules="[rules.required, rules.minValue(0.01)]"
					hint="Enter the amount to convert"
					persistent-hint
					prepend-inner-icon="mdi-cash"
				/>
			</v-col>

			<v-col cols="12" md="6">
				<v-select
					v-model="formData.fromCurrency"
					:items="currencies"
					label="From Currency"
					variant="outlined"
					:rules="[rules.required]"
					prepend-inner-icon="mdi-currency-usd"
				/>
			</v-col>

			<v-col cols="12" md="6">
				<v-select
					v-model="formData.toCurrency"
					:items="currencies"
					label="To Currency"
					variant="outlined"
					:rules="[rules.required]"
					prepend-inner-icon="mdi-currency-eur"
				/>
			</v-col>

			<v-col cols="12">
				<v-btn
					type="submit"
					color="primary"
					size="large"
					block
					prepend-icon="mdi-swap-horizontal"
				>
					Convert Currency
				</v-btn>
			</v-col>
		</v-row>
	</v-form>
</template>

<script setup lang="ts">
	import { ref, reactive } from "vue";
	import { useValidation } from "@/composables/useValidation";
	import type { VForm } from "vuetify/components";

	interface Props {
		currencies: string[];
	}

	interface ConvertData {
		amount: number;
		fromCurrency: string;
		toCurrency: string;
	}

	defineProps<Props>();

	const emit = defineEmits<{
		convert: [data: ConvertData];
	}>();

	const { rules } = useValidation();

	const formRef = ref<VForm | null>(null);

	const formData = reactive({
		amount: 100,
		fromCurrency: "",
		toCurrency: "",
	});

	async function handleSubmit() {
		if (!formRef.value) return;

		const { valid } = await formRef.value.validate();

		if (valid) {
			emit("convert", {
				amount: formData.amount,
				fromCurrency: formData.fromCurrency,
				toCurrency: formData.toCurrency,
			});
		}
	}
</script>
