import { computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_COUNTRIES } from '@/apollo/queries/countries';
import type { Country } from "@/types";

interface CountriesQueryResult {
  countries: Country[];
}

/**
 * Composable for fetching and managing the list of all countries
 * Uses Apollo Client to query the Countries GraphQL API
 * 
 * @returns Object containing countries array, loading state, error, and refetch function
 * 
 * @example
 * const { countries, loading, error, refetch } = useCountries();
 */
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
