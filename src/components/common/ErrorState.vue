<template>
	<div class="text-center" role="alert" aria-live="assertive">
		<v-alert type="error" variant="tonal">
			{{ message }}
		</v-alert>

		<v-btn
			v-if="retry"
			color="error"
			variant="outlined"
			class="mt-4"
			aria-label="Retry loading data"
			@click="handleRetry"
		>
			Try Again
		</v-btn>
	</div>
</template>

<script setup lang="ts">
	interface Props {
		message: string;
		retry?: () => void;
	}

	const props = defineProps<Props>();

	const emit = defineEmits<{
		retry: [];
	}>();

	const handleRetry = () => {
		if (props.retry) {
			props.retry();
		}
		emit("retry");
	};
</script>
