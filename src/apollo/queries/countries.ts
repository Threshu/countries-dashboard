import gql from "graphql-tag";

export const GET_COUNTRIES=gql`
	query GetCountries {
		countries {
			code
			name
			emoji
			capital
			currency
			continent {
				code
				name
			}
			languages {
				code
				name
			}
		}
	}
`;

export const GET_COUNTRY_DETAIL=gql`
	query GetCountryDetail($code: ID!) {
		country(code: $code) {
			code
			name
			native
			emoji
			capital
			currency
			phone
			continent {
				code
				name
			}
			languages {
				code
				name
			}
		}
	}
`;

export const GET_CONTINENTS=gql`
	query GetContinents {
		continents {
			code
			name
		}
	}
`;
