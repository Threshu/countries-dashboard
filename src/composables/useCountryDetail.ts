import { computed, type Ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_COUNTRY_DETAIL } from "@/apollo/queries/countries";
import type { Country, Continent, Language } from "@/types";

interface CountryDetailQueryResult {
  country: Country&{
    native: string;
    phone: string;
    continent: Continent;
    languages: Language[];
  };
}

/**
 * Composable for fetching detailed information about a specific country
 * Uses Apollo Client with reactive country code parameter
 * 
 * @param code - Reactive reference to the country code (e.g., "PL", "US", "FR")
 * @returns Object containing country details, loading state, error, and refetch function
 * 
 * @example
 * const countryCode = ref('PL');
 * const { country, loading, error, refetch } = useCountryDetail(countryCode);
 */
export function useCountryDetail (code: Ref<string>) {
  const { result, loading, error, refetch }=useQuery<CountryDetailQueryResult>(
    GET_COUNTRY_DETAIL,
    () => ({
      code: code.value,
    }),
    () => ({
      enabled: !!code.value,
    })
  );

  const country=computed(() => result.value?.country??null);

  return {
    country,
    loading,
    error,
    refetch,
  };
}
