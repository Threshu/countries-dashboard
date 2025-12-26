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
