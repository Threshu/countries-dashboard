import { defineStore } from 'pinia';
import { STORE_IDS, STORAGE_KEYS } from '@/constants/stores';

export type ThemeName='light'|'dark';

interface UserPreferencesState {
  theme: ThemeName;
  favoriteCountries: string[];
}

export const useUserPreferences=defineStore(STORE_IDS.USER_PREFERENCES, {
  state: (): UserPreferencesState => ({
    theme: 'light',
    favoriteCountries: [],
  }),

  getters: {
    isFavorite: (state) => {
      return (countryCode: string): boolean => {
        return state.favoriteCountries.includes(countryCode);
      };
    },

    favoritesCount: (state): number => {
      return state.favoriteCountries.length;
    },
  },

  actions: {
    setTheme (theme: ThemeName) {
      this.theme=theme;
    },

    toggleTheme () {
      this.theme=this.theme==='light'? 'dark':'light';
    },

    addFavoriteCountry (countryCode: string) {
      if(!this.favoriteCountries.includes(countryCode)) {
        this.favoriteCountries.push(countryCode);
      }
    },

    removeFavoriteCountry (countryCode: string) {
      const index=this.favoriteCountries.indexOf(countryCode);
      if(index>-1) {
        this.favoriteCountries.splice(index, 1);
      }
    },

    toggleFavorite (countryCode: string) {
      if(this.isFavorite(countryCode)) {
        this.removeFavoriteCountry(countryCode);
      } else {
        this.addFavoriteCountry(countryCode);
      }
    },
  },

  persist: {
    key: STORAGE_KEYS.USER_PREFERENCES,
    storage: localStorage,
  },
});
