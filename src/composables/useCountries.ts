import { computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_COUNTRIES } from '@/apollo/queries/countries';
import type { Country } from "@/types";

interface CountriesQueryResult {
  countries: Country[];
}

export function useCountries () {
  const { result, loading, error, refetch }=useQuery<CountriesQueryResult>(GET_COUNTRIES);

  const countries=computed(() => result.value?.countries??[]);

  return {
    countries,
    loading,
    error,
    refetch,
  };
}
